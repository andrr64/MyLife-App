# **MyLife App**

**MyLife** is an all-in-one personal management platform designed to help users organize, track, and optimize every aspect of their daily life.
The main goal of this project is to **simplify life through centralized management**, providing a single application that handles multiple essential needs.

---

## 🚀 **Purpose**

The purpose of MyLife App is to serve as a **life management companion**, helping users:

* Manage their finances
* Track tasks and personal activities
* Store notes and important information
* Monitor health and daily habits
* Improve productivity and overall lifestyle

In short: **One app for everything.**

---

## ✨ **Core Features**

### 📊 **Financial Management**

* Track income, expenses, transfers, and balances
* Multi-account support (cash, e-wallet, bank, investment, etc.)
* Categories and analytics
* Transaction history and insights

### ✔️ **Task Management**

* Create, schedule, and track tasks
* Daily, weekly, and monthly planning
* Productivity optimization

### 📝 **Notes & Personal Documentation**

* Quick notes
* Secure personal documentation
* Organized folder/category structure

### ❤️ **Health & Lifestyle Tracking**

* Habit tracking
* Health logs
* Progress monitoring

### 🔔 **Notifications & Automation**

* Automatic reminders
* Event-driven updates using message queues

---

## 🏗️ **Tech Stack**

### **Backend**

* **Spring Boot** (Java) — Main service framework
* **PostgreSQL** — Primary database
* **Redis** — Caching and session acceleration
* **RabbitMQ** — Event/message queue for asynchronous operations
* **Spring Security** — Authentication and authorization
* **Docker** (optional) — Containerized development

### **Frontend**

* **React** with **Next.js** — Modern, fast, server-side rendering capable frontend
* **TypeScript**
* **TailwindCSS** (optional) for styling

---

## 📐 **Architecture Overview**

MyLife follows a modular architecture with multiple services including:

* **User Service**
* **Finance Service**
* **Task Service**
* **Notification Service**
* Shared authentication & utilities

Communication between services uses **RabbitMQ** for event-driven flows, while caching (Redis) accelerates frequent operations.

---

## 📦 **Key Highlights**

* Scalable microservice-friendly backend
* Clean domain structure
* Strong type-safety on frontend
* Real-time capability using WebSockets / event queues
* Designed for future expansion (health, notes, automation features, etc.)

---

## 🛠️ **Setup (Development)**

### Backend

```bash
# Start PostgreSQL, Redis, RabbitMQ (Docker recommended)
docker-compose up -d

# Run Spring Boot service
./mvnw spring-boot:run
```

### Frontend

```bash
cd my-life-app
npm install
npm run dev
```

---

## 🤝 **Contributing**

Contributions are welcome!
Feel free to open issues, submit pull requests, or propose new features.

---

## 📄 **License**

This project is licensed under the Apache License 2.0. 

---
© 2025 Derza Andreas