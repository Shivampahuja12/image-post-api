# image-post-api

A RESTful backend API for creating and fetching image posts with captions. Built with **Node.js**, **Express**, **MongoDB**, and **ImageKit** for cloud image storage.

---

## 🚀 Features

- **Image Upload** — Upload images via multipart form-data using Multer (in-memory storage), then stored on ImageKit cloud
- **Post Creation** — Create posts with an image URL and caption, saved to MongoDB
- **Fetch Posts** — Retrieve all posts from the database

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express 5](https://expressjs.com/) | Web framework |
| [MongoDB](https://www.mongodb.com/) | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM |
| [Multer](https://github.com/expressjs/multer) | File upload middleware (memory storage) |
| [ImageKit](https://imagekit.io/) | Cloud image storage |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [nodemon](https://nodemon.io/) | Auto-restart dev server (dev dependency) |

---

## 📁 Project Structure

```
image-post-api/
├── server.js                  # Entry point — connects to DB & starts server on port 3000
├── package.json
├── .env                       # Environment variables (not committed)
└── src/
    ├── app.js                 # Express app, Multer config & route handlers
    ├── db/
    │   └── db.js              # MongoDB connection via Mongoose
    ├── models/
    │   └── post.model.js      # Post schema (image, caption)
    └── services/
        └── storage.service.js # ImageKit file upload (base64)
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
1. Multer reads the uploaded file into memory
2. The file buffer is converted to base64 and uploaded to ImageKit
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

## 📝 License

ISC

---

<p align="center">Made with ❤️ by Shivam</p>
