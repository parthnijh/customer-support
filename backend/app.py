from pymongo import MongoClient
from flask import Flask,jsonify,request
from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from dotenv import load_dotenv
from flask_cors import CORS
import os

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
    doc=collection.find_one({"user_id":user_id})
    if(doc):
        chat_history=doc["messages"]
        
    else:
        collection.insert_one({"user_id":user_id,"messages":chat_history,"ticket_id":ticket_id})

    return jsonify({"messages":chat_history})

@app.route("/api/ask",methods=["POST"])
def ask():

    data=request.get_json()
    chat_history=data.get("chat_history")
    query=data.get("query")

@app.route("/api/users",methods=["GET"])
def get_users():
    users=list(collection.find({}, {"_id": 0}))

    return jsonify(users)


if __name__ == '__main__':
    app.run(port=5000, debug=True)