# 📺 YouTube Clone - MERN Stack Capstone Project

This is a full-stack YouTube Clone built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The project allows users to browse, upload, view, and interact with videos.

---

---

## 📂 Project Structure

📂 youtube-clone/
├── controllers/
├── models/
├── routes/
├── middlewares/
└── index.js

📂 UserInterface/
├── public/
│   └── thumbnails/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Video.jsx
│   ├── App.jsx
│   └── vite.config.js

---

## 🚀 Features

### ✅ Frontend (React)

- Home page with video thumbnails
- Dynamic video detail page with video player
- User authentication (Sign In / Register)
- Upload video (title, description, thumbnail, file)
- Add/view comments
- Search videos by title
- Filter videos by category
- Fully responsive layout

### ✅ Backend (Node.js + Express)

- JWT-based user authentication
- MongoDB models for users, videos, comments, channels
- Secure video & comment routes
- Cloudinary integration for video and thumbnail upload
- API endpoints for CRUD operations

---

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ChamomileLOL/youtube-clone-by-Xavier-Moorkattil.git
cd youtube-clone
```

### 2️⃣ Setup Backend

```bash

C:\Users\Acer\YouTube_Clone> 
npm install
npm install express mongoose dotenv cloudinary multer jsonwebtoken bcrypt cors
npm run backend

# Create .env file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

### 3️⃣ Setup Frontend

```bash
cd /UserInterface
npm install
npm install lucide-react
npm run dev
```

### 4. If this error occur

Error: listen EADDRINUSE: address already in use :::5000

What does it mean?
Your port 5000 is already being used — probably by a previous instance of your app or another process.

Solution:

1) Open PowerShell or CMD and run:
netstat -ano | findstr :5000

You'll see something like:
TCP    [::]:5000       [::]:0       LISTENING       12345

Then, Copy the PID (e.g., 12345) and kill it:

taskkill /PID 12345 /F

---

## 🧠 Tech Stack

- **Frontend**: React, Axios, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Cloud Storage**: Cloudinary
- **Database**: MongoDB Atlas (or local)
- **Version Control**: Git + GitHub

---

## 📸 Screenshots

![alt text](<public/assetGitHub/vr9.png>)

![alt text](<public/assetGitHub/mongosh.png>)

![alt text](<public/assetGitHub/qwe1.png>)

![alt text](<public/assetGitHub/qwe2.png>)

![alt text](<public/assetGitHub/qwe3.png>)

![alt text](<public/assetGitHub/qwe4.png>)

![alt text](<public/assetGitHub/qwe5.png>)

![alt text](<public/assetGitHub/qwe6.png>)

![alt text](<public/assetGitHub/qwe7.png>)

![alt text](<public/assetGitHub/qwe8.png>)

![alt text](<public/assetGitHub/qwe9.png>)

![alt text](<public/assetGitHub/qwe10.png>)

![alt text](<public/assetGitHub/qwe11.png>)

![alt text](<public/assetGitHub/qwe12.png>)

---

---

## Note: After signing In, enter the details on Login Page (once signed in/created account, no need to sign in with the same details... just login) and make sure you connected with the MongoDB Atlas / Mongoshell using the entire local host of dotenv file without string

## 🙌 Acknowledgements

- Inspired and Guided by Internshala Full Stack Development PGC
  
---

## 📧 Contact

Created by **Xavier Moorkattil** — feel free to connect!
