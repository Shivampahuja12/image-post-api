# 📸 image-post-api

> ### A small **MERN stack** app — this is the backend API that powers image post creation and retrieval.

A RESTful backend API for creating and fetching image posts with captions. Built with the **MERN** stack (**M**ongoDB · **E**xpress · **R**eact · **N**ode.js). This repository contains the **backend** — a Node.js + Express server that handles image uploads via **ImageKit** cloud storage and persists posts to **MongoDB**.

> 💡 *Designed as a small, focused MERN project to demonstrate a clean REST API with cloud image storage, CORS-enabled for seamless integration with any React (or other) frontend.*

---

## 🚀 Features

- **Image Upload** — Upload images via multipart form-data using Multer v2 (in-memory storage), then stored on ImageKit cloud
- **Post Creation** — Create posts with an image URL and caption, saved to MongoDB
- **Fetch Posts** — Retrieve all posts from the database
- **CORS Enabled** — Cross-Origin Resource Sharing enabled out of the box, ready to connect with any frontend client

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | — | JavaScript runtime |
| [Express](https://expressjs.com/) | 5.x | Web framework |
| [MongoDB](https://www.mongodb.com/) | — | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | 9.x | MongoDB ODM |
| [Multer](https://github.com/expressjs/multer) | 2.x | File upload middleware (memory storage) |
| [@imagekit/nodejs](https://imagekit.io/) | 7.x | Cloud image storage SDK |
| [cors](https://github.com/expressjs/cors) | 2.x | Cross-Origin Resource Sharing middleware |
| [dotenv](https://github.com/motdotla/dotenv) | 17.x | Environment variable management |
| [nodemon](https://nodemon.io/) | 3.x | Auto-restart dev server (dev dependency) |

---

## 📁 Project Structure

```
image-post-api/
├── server.js                  # Entry point — connects to DB & starts server on port 3000
├── package.json
├── .env                       # Environment variables (not committed)
└── src/
    ├── app.js                 # Express app, CORS, Multer config & route handlers
    ├── db/
    │   └── db.js              # MongoDB connection via Mongoose
    ├── models/
    │   └── post.model.js      # Post schema (image, caption)
    └── services/
        └── storage.service.js # ImageKit file upload (base64) using @imagekit/nodejs SDK
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [ImageKit](https://imagekit.io/) account

### 1. Clone the repository

```bash
git clone https://github.com/Shivampahuja12/image-post-api.git
cd image-post-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with:

```env
MONGODB_URI=your_mongodb_connection_string
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### 4. Start the development server

```bash
npm run dev
```

The server will start at **http://localhost:3000**

---

## 📡 API Endpoints

### Create a Post

```
POST /create-posts
Content-Type: multipart/form-data
```

| Field | Type | Description |
|---|---|---|
| `image` | `file` | The image file to upload |
| `caption` | `text` | Caption for the post |

**How it works:**
1. Multer reads the uploaded file into memory (memory storage)
2. The file buffer is converted to base64 and uploaded to ImageKit via the `@imagekit/nodejs` SDK
3. The returned ImageKit URL and the caption are saved as a new post in MongoDB

**Response** `201 Created`

```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "...",
    "image": "https://ik.imagekit.io/.../image.jpg",
    "caption": "your caption here",
    "__v": 0
  }
}
```

---

### Get All Posts

```
GET /posts
```

**Response** `200 OK`

```json
{
  "message": "Posts fetched successfully",
  "posts": [
    {
      "_id": "...",
      "image": "https://ik.imagekit.io/.../image.jpg",
      "caption": "your caption here",
      "__v": 0
    }
  ]
}
```

---

## 🔗 Connecting a React Frontend

Since CORS is enabled, you can connect any React (or other) frontend to this API:

```javascript
// Example: Fetch all posts from a React app
const response = await fetch('http://localhost:3000/posts');
const data = await response.json();
console.log(data.posts);
```

---
