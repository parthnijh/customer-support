from pymongo import MongoClient
from flask import Flask,jsonify,request
from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder,PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader
from dotenv import load_dotenv
from flask_cors import CORS
import os
import requests
from datetime import datetime,timezone
client = MongoClient("mongodb+srv://parthnijhawan777_db_user:UBcgLTzibbfxGGEe@cluster0.wrbolal.mongodb.net/?appName=Cluster0")

# Database and collection
db = client["user_db"]              # create/use a database
collection = db["user_data"]
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

app=Flask(__name__)
CORS(app)
@app.route("/api/messsages",methods=["POST"])
def get_messages():
    data=request.get_json()
    user_id=data.get("user_id")
    print(user_id[:4])
    ticket_id=""
    ticket_id="T"+user_id[:8]
    chat_history=[]
    now = datetime.now(timezone.utc)
    doc=collection.find_one({"user_id":user_id})
    if(doc):
        chat_history=doc["messages"]
        print(chat_history)
        
    else:
        collection.insert_one({"user_id":user_id,"messages":chat_history,"ticket_id":ticket_id,"createdAt":now})

    return jsonify({"messages":chat_history})

def get_store():
    vectorstore=Chroma(
        persist_directory="chroma",
        collection_name="customer-support",
        embedding_function=GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=os.getenv("GOOGLE_API_KEY")
        )
    )
    return vectorstore
@app.route("/admin/upload",methods=["POST"])
def upload():
    vector=get_store()
    data=request.get_json()
    
    url=data.get("url")
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    
    
    if(not os.path.exists("upload")):
        os.makedirs("upload")
    response=requests.get(url)
    filename = url.split("/")[-1]
    
    file_path=os.path.join("upload" ,filename)
    file=open(file_path,"wb")
    file.write(response.content)
    file.close()
    loader=PyPDFLoader(file_path=file_path)
    document=loader.load()
    chunks=[]
    splitter=RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200)
    for item in document:
        chunks.extend(splitter.split_text(item.page_content))
    vector.add_texts(chunks)
    return jsonify({"message":"uploaded successfuly"})
def convert(messages):
    chat_history=[]
    for item in messages:
        if(item["sender"]=="user"):
            chat_history.append({"role":"user","content":item["text"]})
        else:
            chat_history.append({"role":"assistant","content":item["text"]})
    return chat_history
@app.route("/api/ask",methods=["POST"])
def ask():
    now = datetime.now(timezone.utc)
    data=request.get_json()
    messages=data.get("chat_history")
    user_id=data.get("user_id")
   
    print(messages)
    chat_history=convert(messages=messages)
    query=data.get("query")
    model=ChatGoogleGenerativeAI(model="gemini-2.5-flash",api_key=os.getenv("GOOGLE_API_KEY"))
    prompt=ChatPromptTemplate(
    messages=[
        (
            "system",
            """You are a **Customer Grievance Resolution Assistant** for a company.
You are designed to help customers resolve issues, explain company policies,
and guide them through complaint or claim procedures.

You have access to the company’s official policy documents, represented in the following context:
{context}

Your goals:
- Understand the user’s concern or question clearly.
- Use the policy documents and your reasoning to provide correct, concise, and empathetic answers.
- Maintain a warm, professional, and human-like tone.
- If the document doesn’t clearly cover the question, say:
  "I don’t know based on the provided context, but I can suggest reaching out to support for clarification."

Guidelines:
1. Always use the policy document (context) as your main source of truth.
2. Use basic common sense and conversational awareness (for example, greetings, empathy, polite closure).
3. Keep responses customer-friendly and jargon-free.
4. If the user expresses frustration or confusion, respond calmly and reassure them that you’ll try your best.

Example Interactions:

user: Hi  
assistant: Hello there! I’m your grievance assistant. How can I help you today?

user: My refund hasn’t arrived yet.  
assistant: I’m sorry to hear that. According to the policy document, refunds are typically processed within X days after approval. Could you tell me when you submitted your refund request?

user: What’s the company policy on renewable energy investments?  
assistant: Based on the policy document, here’s what it says about renewable energy investments: (insert from context)

user: Tell me something not in the document.  
assistant: I don’t know based on the provided context, but I can try to guide you based on general policy logic.

user: Thanks!  
assistant: You’re very welcome! I’m glad I could help."""
        ),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{query}")
    ]
)

    vector=get_store()
    ret=vector.as_retriever(search_type="similarity",search_kwargs={"k":6})
    context=ret.invoke(query)
    parser=StrOutputParser()
    chain=prompt | model | parser
    answer=chain.invoke({
        "context":context,
        "query":query,
        "chat_history":chat_history
    })
    collection.update_one(
    {"user_id": user_id},
    {"$push": {"messages": {"$each": [
        {"sender": "user", "text": messages[-1]["text"]},
        {"sender": "bot", "text": answer}
    ]}}
    },
    {"$set": {"updatedAt": now}}
    
)
    return jsonify({"answer":answer})


@app.route("/api/users",methods=["GET"])
def get_users():
    users=list(collection.find({}, {"_id": 0}))

    return jsonify(users)

@app.route("/api/summary",methods=["POST"])
def get_summary():
    data=request.get_json()
    messages=data.get("messages")
    chat_history=convert(messages=messages)
    model=ChatGoogleGenerativeAI(model="gemini-2.5-flash",api_key=os.getenv("GOOGLE_API_KEY"))
    prompt = PromptTemplate(
    template='''
                You are an assistant summarizing customer support interactions.

                Given the following chat history between a *customer* and a *RAG-powered support agent*:
                {chat_history}

                Write a clear, concise summary for the **company admin** that includes:
                - The customer’s main question, issue, or request.
                - The key points discussed or steps taken by the agent.
                - Any resolution provided or pending action items.
                - The overall tone or sentiment of the customer (if evident).

                Keep the tone professional, factual, and easy to skim.
            ''',
             input_variables=["chat_history"]
            )
    parser=StrOutputParser()
    chain=prompt | model | parser
    result=chain.invoke({"chat_history":chat_history})
    return jsonify({"result":result})

if __name__ == '__main__':
    app.run(port=5000, debug=True)