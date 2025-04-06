# 📝 Blogify API

A RESTful API built with **Express.js** and **PostgreSQL** for a simple blog platform. Handles user authentication, blog CRUD operations, and user interactions like commenting.

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **JWT** – Secure authentication
- **bcrypt** – Password hashing
- **dotenv** – Environment config

## 📁 Project Structure

📦 blogify-api ├── 📂 controllers ├── 📂 middlewares ├── 📂 models ├── 📂 routes ├── 📂 utils ├── .env ├── app.js ├── package.json └── README.md

## 🛠️ Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
Set up environment variables

Create a .env file in the root:

env
PORT=5000
JWT_SECRET=yourSecretKey
DATABASE_URL=yourPostgresConnectionString



Run the server
npm start
🔐 API Endpoints
🔸 User Accounts
POST /account/create – Create a new account

POST /account/login – Login and receive JWT

🔹 Blogs (Requires JWT)
POST /blog/create – Create a blog post

PATCH /blog/edit/:blogId – Edit a blog

DELETE /blog/delete/:blogId – Delete a blog

GET /user/blog – Get user info + all their blogs

POST /blog/comment/:blogId – Add a comment to a blog

⚠️ Notes
Auth Required: All protected routes need a Bearer <token> in the Authorization header.

Security: Passwords are hashed using bcrypt before storing in DB.

DB: PostgreSQL connection managed via DATABASE_URL.

👤 Author
Abhishek a.k.a Cap’n Code
The guy who:

Wakes up early ☀️

Codes like a beast 👨‍💻

Eats like a champ 🍛

Dreams of changing the world 🌍

💡 Future Features
✅ Pagination for blog list

✅ Like/Dislike functionality

✅ User profile with bio and profile pic

❗ Admin dashboard

❗ Tags & Categories


```
