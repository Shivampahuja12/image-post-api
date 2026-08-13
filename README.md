# 📸 Image Post API

> A full-stack **MERN** app for creating and browsing image posts with captions.

Built with the **MERN** stack (**M**ongoDB · **E**xpress · **R**eact · **N**ode.js), this monorepo contains both the **backend** REST API and the **frontend** React SPA. Users can upload images with captions through a simple form; images are stored on **ImageKit** cloud, metadata is persisted in **MongoDB**, and everything is presented in a clean feed UI.

---

## 🚀 Features

- **Image Upload** — Upload images via a React form; files are sent as `multipart/form-data`, processed by Multer (in-memory), and stored on ImageKit cloud
- **Post Creation** — Each uploaded image is paired with a caption and saved to MongoDB
- **Feed View** — Browse all posts in a responsive card-based feed
- **Client-Side Routing** — SPA navigation between the Feed and Create Post pages using React Router
- **CORS Enabled** — Backend allows cross-origin requests out of the box

---

## 🛠️ Tech Stack

### Backend

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

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19.x | UI library |
| [React DOM](https://react.dev/) | 19.x | DOM renderer for React |
| [React Router DOM](https://reactrouter.com/) | 7.x | Client-side routing |
| [Axios](https://axios-http.com/) | 1.x | HTTP client for API calls |
| [Vite](https://vite.dev/) | 7.x | Dev server & build tool |

---

## 📁 Project Structure

```
image-post-api/
├── README.md
│
├── backend/
│   ├── server.js                  # Entry point — connects to DB & starts Express on port 3000
│   ├── package.json
│   ├── .env                       # Environment variables (not committed)
│   └── src/
│       ├── app.js                 # Express app — CORS, JSON parsing, Multer config & route handlers
│       ├── db/
│       │   └── db.js              # MongoDB connection via Mongoose
│       ├── models/
│       │   └── post.model.js      # Post schema (image URL, caption)
│       └── services/
│           └── storage.service.js # ImageKit file upload (buffer → base64) via @imagekit/nodejs SDK
│
└── frontend/
    ├── index.html                 # HTML shell for the SPA
    ├── vite.config.js             # Vite configuration with React plugin
    ├── package.json
    └── src/
        ├── main.jsx               # React entry point — renders <App /> into #root
        ├── App.jsx                # Router setup — routes for /feed and /create-post
        ├── index.css              # Global styles
        └── pages/
            ├── Feed.jsx           # Fetches & displays all posts as image cards
            └── CreatePost.jsx     # Form to upload an image + caption; posts to the backend API
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- [ImageKit](https://imagekit.io/) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/Shivampahuja12/image-post-api.git
cd image-post-api
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the backend dev server:

```bash
npm run dev
```

The API will be available at **http://localhost:3000**

### 3. Set up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will start the frontend dev server (typically at **http://localhost:5173**).

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
3. The returned ImageKit URL and the caption are saved as a new Post document in MongoDB

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

## 🖥️ Frontend Pages

| Route | Component | Description |
|---|---|---|
| `/feed` | `Feed` | Fetches all posts from `GET /posts` on mount and renders them as image cards. This is the default page — `/` and any unknown routes redirect here. |
| `/create-post` | `CreatePost` | Displays a form with a file input and caption field. On submit, sends a `POST /create-posts` request with `FormData` via Axios and navigates to the feed on success. |

---

## 🧩 How It All Fits Together

```
┌─────────────────────────────┐         ┌─────────────────────────────┐
│       React Frontend        │         │      Express Backend        │
│  (Vite · localhost:5173)    │         │     (localhost:3000)         │
│                             │         │                             │
│  Feed page ──GET /posts────►│────────►│  Mongoose ──► MongoDB       │
│                             │◄────────│◄──── JSON response          │
│                             │         │                             │
│  CreatePost ─POST /create──►│────────►│  Multer ──► ImageKit        │
│  (FormData)   posts         │         │          ──► MongoDB        │
│                             │◄────────│◄──── JSON response          │
└─────────────────────────────┘  CORS   └─────────────────────────────┘
```

---
