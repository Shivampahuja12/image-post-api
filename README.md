# 📸 Postify API

A RESTful backend API for creating and fetching image posts with captions. Built with **Node.js**, **Express**, **MongoDB**, and **ImageKit** for cloud image storage.

---

## 🚀 Features

- **Image Upload** — Upload images via multipart form-data, stored on ImageKit cloud
- **Post Creation** — Create posts with an image and caption
- **Fetch Posts** — Retrieve all posts from the database
- **Cloud Storage** — Images are hosted on ImageKit CDN for fast delivery

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express 5](https://expressjs.com/) | Web framework |
| [MongoDB](https://www.mongodb.com/) | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM |
| [Multer](https://github.com/expressjs/multer) | File upload middleware |
| [ImageKit](https://imagekit.io/) | Cloud image storage & CDN |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |

---

## 📁 Project Structure

```
postify-api/
├── server.js                  # Entry point — starts the server
├── package.json               # Dependencies & scripts
├── .env                       # Environment variables (not committed)
└── src/
    ├── app.js                 # Express app setup & routes
    ├── db/
    │   └── db.js              # MongoDB connection
    ├── models/
    │   └── post.model.js      # Mongoose schema for posts
    └── services/
        └── storage.service.js # ImageKit upload logic
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [ImageKit](https://imagekit.io/) account (free tier available)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/postify-api.git
cd postify-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

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
```

| Parameter | Type | Location | Description |
|---|---|---|---|
| `image` | `file` | form-data | The image file to upload |
| `caption` | `string` | form-data | Caption for the post |

**Example Response** `201 Created`

```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
    "image": "https://ik.imagekit.io/your_id/image.jpg",
    "caption": "A beautiful sunset 🌅",
    "__v": 0
  }
}
```

---

### Get All Posts

```
GET /posts
```

**Example Response** `200 OK`

```json
{
  "message": "Posts fetched successfully",
  "posts": [
    {
      "_id": "64a1b2c3d4e5f6a7b8c9d0e1",
      "image": "https://ik.imagekit.io/your_id/image.jpg",
      "caption": "A beautiful sunset 🌅",
      "__v": 0
    }
  ]
}
```

---

## 🧪 Testing with Postman

1. Open [Postman](https://www.postman.com/)
2. Create a **POST** request to `http://localhost:3000/create-posts`
3. Go to **Body** → select **form-data**
4. Add key `image` (type: **File**) and select an image
5. Add key `caption` (type: **Text**) and enter your caption
6. Hit **Send**

---

## 📝 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

<p align="center">Made with ❤️ by Shivam</p>
