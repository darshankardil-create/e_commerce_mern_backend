# 🛒 E-Commerce Backend (MERN)

## 🌐 Live Demo

> *(https://darshankardil-create.github.io/E_commerce_fro_mern/)*

---

### 🔗 Project Repositories

**Frontend:**  
👉 https://github.com/darshankardil-create/E_commerce_fro_mern  

---

A **production-ready Node.js + Express backend** powering a full-stack E-commerce application.  
Designed with **security, scalability, and clean API architecture** in mind.

This backend handles **authentication, authorization, product management, cart operations, orders, and rate-limiting**, while staying frontend-agnostic.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (JSON Web Tokens)**
- **bcrypt**
- **Upstash Redis (Rate Limiting)**
- **REST APIs**
- **Middleware-based architecture**

---

## 🔐 Authentication & Account Security

- Password hashing using **bcrypt**
- **JWT-based authentication**
- Secure token generation & verification
- Middleware-protected routes
- Role-based access readiness
- No forced logout — session stays valid until token expiry

### Security Flow
1. User signs up → password hashed
2. User logs in → JWT issued
3. JWT sent in headers for protected routes
4. Middleware validates token before granting access

---

## 🧠 Middleware Architecture

- Centralized **auth middleware**
- Route-level protection
- Clean separation of concerns
- Request validation & error handling
- Scalable structure for adding future policies

---

## 🚦 Rate Limiting (Upstash)

- Integrated **Upstash Redis rate-limiting**
- Prevents abuse & brute-force attacks
- Applied on sensitive routes (auth, APIs)
- Distributed & serverless-friendly

---

## 📦 Core Backend Features

### 🧑 User Management
- User registration
- Secure login
- Account deletion
- Token-based session handling

### 🛍️ Product APIs
- Fetch products
- Product details by ID
- Scalable schema for categories, pricing & stock

### 🛒 Cart APIs
- Add product to cart
- Update product quantity with `pull` and `push`
- Remove product from cart


### 📦 Order Handling

- Order creation for the currently authenticated user
- JWT-based identification:
  - User signs in or logs in to receive a JSON Web Token
  - User ID is extracted from the JWT payload on the backend
- User-specific data handling:
  - Backend uses the extracted user ID to manage data per user
  - Enables separate MongoDB documents per user
- Supports user-scoped operations such as:
  - Adding products
  - Removing products
  - Updating order-related data

  




## ⚙️ API Design Principles

- REST-compliant endpoints
- Predictable JSON responses
- Clear status codes
- Modular controllers & routes
- Easy to extend without breaking existing APIs

---

## 🧩 Developer-Focused Design

- Clean folder structure
- Reusable middleware
- Scalable MongoDB schemas
- Environment-based configuration
- Easy local & cloud deployment



## 📌 Why This Backend Stands Out

- Production-grade authentication
- Secure by default
- Rate-limited APIs
- Built for real-world scaling
- Clean, readable, new developer-friendly codebase
- The backend exposes REST APIs that handle business logic, database, validation, and security, return pure JSON, and remain completely independent of any frontend UI or framework

---

## 📄 License

MIT License
