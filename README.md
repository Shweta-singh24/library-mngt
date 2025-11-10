# 📚Library Management System (Backend)

A complete backend for managing a library system built with Node.js, Express, and MongoDB.
Supports Admin and Student roles with JWT authentication, role-based access control, and book borrowing management.

# 🚀 Features
👤 Authentication

Signup & Login using JWT (Access + Refresh Tokens)

Secure password hashing with bcrypt

Token refresh & logout endpoints

Role-based user system (admin, student)

# 📘 Books Management (Admin Only)

Add new books

Edit book details

Delete books

View all books

Track available vs. total copies

# 📗 Borrow / Return System

Students can borrow books

Return borrowed books

Check book availability

Auto fine calculation for late returns

# ⚙️ Roles
Role	Permissions
Admin	Manage all books, view borrow history
Student	Borrow & return books, view available books

# 4️⃣ Run the server
npm run dev
or
node server.js

# 🧩 API Endpoints
🔑 Auth Routes (/api/auth)
Method	|| Endpoint ||	Description

POST	/signup	Register new user

POST	/login	Login user

POST	/refresh	Get new access token

POST	/logout	Logout user

# 📘 Book Routes (/api/books)
Method ||	Endpoint ||	Role ||	Description

GET	/	Admin & Student	Get all books

GET	/:id	Admin & Student	Get single book

POST	/	Admin	Add new book

PUT	/:id	Admin	Update book

DELETE	/:id	Admin	Delete book

# 📗 Borrow Routes (/api/borrow)
Method	|| Endpoint ||	Role ||	Description

POST	/:bookId	Student	Borrow a book

PUT	/:bookId/return	Student	Return a borrowed book

GET	/my	Student	View user’s borrowed books

GET	/all	Admin	View all borrow records

# 🛡️ Middleware

authMiddleware → Verifies JWT access token and attaches user to request.

roleMiddleware('admin' or 'student') → Restricts route access based on user role.

# 🧠 Technologies Used

Node.js + Express.js — backend framework

MongoDB + Mongoose — database

JWT (jsonwebtoken) — authentication

bcrypt — password hashing

dotenv — environment configuration

morgan + cors — logging & cross-origin support

# 🧾 Future Improvements

Email verification system

Fine calculation automation (cron job)

Pagination for book listings

Admin dashboard (frontend)

# 👨‍💻 Author

Shweta singh

📧email: shwetasingh02415@gmail.com

💻 GitHub: @Shweta-singh24
