# 💬 AI-Powered Customer Support Dashboard

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask-black?logo=flask)
![Node.js](https://img.shields.io/badge/API-Node.js-43853D?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Server-Express-000000?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-white?logo=socket.io)
![LangChain](https://img.shields.io/badge/AI-LangChain-purple)
![Clerk](https://img.shields.io/badge/Auth-Clerk-blue?logo=clerk)
![UploadThing](https://img.shields.io/badge/Uploads-UploadThing-ffb703)

---

## 🚀 Overview

The **AI-Powered Customer Support Dashboard** is a full-stack application that integrates **real-time ticket management**, **AI chat summarization**, and **automated customer support**.

It connects an **AI chatbot (via LangChain)** with a **React-based admin dashboard** and uses **Socket.IO** for instant communication between users and admins.  
Admins can see new tickets, monitor live user–bot conversations, and summarize entire chat histories with one click.

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| 🖥️ Frontend | **React + Tailwind CSS** | Interactive UI and real-time dashboard |
| 🔧 Backend (Core) | **Flask** | Handles AI chatbot logic and Socket.IO events |
| ⚡ Realtime Layer | **Socket.IO** | Pushes live ticket and message updates |
| 🌐 File Upload(Backend) | **Node.js + Express** | Template Backend For Uploadthing|
| 🧠 AI Layer | **LangChain + Google Generative AI** | RAG-powered responses and summaries |
| 🗄️ Database | **MongoDB (Mongoose)** | Stores tickets, users, and chat history |
| 🔐 Authentication | **Clerk** | Handles secure login for users and admins |
| 📁 File Handling | **UploadThing** | Allows CSV/document uploads for context or logs |

---

## ✨ Key Features

### 💡 User Chat System
- Interact with an **RAG AI assistant** using the companies policies as a knowledge base.
- Each conversation automatically generates a **support ticket**.
- Persistent chat history stored in MongoDB.

### 📊 Admin Dashboard
- **Real-time updates** when new tickets or messages arrive.
- View complete user–bot chat history for any ticket.
- **Summarize chats** using AI-generated overviews.
- **File uploads** with UploadThing (for user data, logs, or attachments).


### 🔁 Realtime Functionality
- Uses **Socket.IO** to sync messages instantly.
- No refresh needed for new tickets or updates.
- Automatically updates chat popovers when messages arrive.

### 🧾 AI Summarization
- Flask backend integrates **LangChain** to summarize conversations.
- Generates short, actionable insights for admins.

---

## 🧠 How It Works

1. A user starts chatting with the AI chatbot.  
2. Flask processes the message → uses RAG Chatbot to respond.  
3. The backend saves the chat to MongoDB and emits a **Socket.IO event**.  
4. The **React dashboard** instantly receives the update without reloading.  
5. Admins can open any ticket to view the conversation live.  
6. “Summarize” button triggers Flask + LangChain to summarize chat history.  
7. UploadThing supports document uploads for contextual assistance.

