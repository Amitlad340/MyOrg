
# MyOrg

A personal productivity web application that helps users manage daily tasks, notes, appointments, and a time-block planner — all through a clean, responsive interface. It uses a Node.js/Express backend with SQLite for persistent storage and vanilla HTML/CSS/JS on the frontend.

---

## ✨ Features

- ✅ **To-Do List** — Create, complete, and delete tasks with status tracking
- 🧠 **Notes** — Add and view text notes with auto-resizing textarea
- 📅 **Appointments** — Log upcoming events with title, date, time, and description
- ⏰ **Planner** — Hourly time-block planner with color-coded time slots (past, present, future)
- 📌 **Persistent storage** using SQLite (via SQL `CREATE`, `INSERT`, `UPDATE`, `DELETE`)
- 🌐 **Responsive frontend** using vanilla JavaScript, HTML, and CSS
- 🧠 **No frameworks** — Just Express, SQLite3, and native DOM manipulation

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/myorg.git
cd myorg

npm install

rm db/myorg.db
node server.js

You should see this in your terminal: 

Connected to SQLite database.
Server running at http://localhost:3000

---

## 📄 License

You are free to use, modify, and distribute this project for personal or commercial use. Attribution is appreciated but not required.

© 2025 Amit Lad