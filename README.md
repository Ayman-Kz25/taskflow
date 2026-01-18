# 📝 TaskFlow

A modern, responsive task management application built with **React** and **Vite**.  
This app helps you organize tasks by category, status, priority, and due date, with support for editing, deleting, and calendar-based viewing.

Designed with clean architecture, reusable components, and scalable state management.

---

## ✨ Features

- ✅ Create, edit, and delete tasks
- 🗂️ Categorize tasks (Work, Personal, Study)
- 🔍 Filter tasks by:
  - Status (Todo, In Progress, Completed)
  - Priority (Low, Medium, High)
  - Due Date (Overdue, Today, Upcoming)
- 📆 Calendar view for task deadlines
- 🧭 Category-specific pages
- 🪟 Edit & confirm delete modals
- ⚡ Optimized filtering using `useMemo`
- 🎨 Clean, responsive UI

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router
- **State Management:** Context API
- **Date Handling:** date-fns
- **Styling:** CSS / Utility classes
- **Data Source:** Firebase-compatible structure (supports Firestore timestamps)

---

## 📁 Project Structure

```txt
src/
├── components/
│   ├── layout/
│   ├── task/
│   │   ├── TaskList.jsx
│   │   ├── AddTaskModal.jsx
│   │   ├── EditTaskModal.jsx
│   │   └── ConfirmDeleteModal.jsx
│   ├── filters/
│   │   └── FilterBar.jsx
│   └── ui/
│       └── EmptyState.jsx
│
├── context/
│   └── TaskContext.jsx
│
├── pages/
│   ├── DashboardPage.jsx
│   ├── CategoryPage.jsx
│   ├── InProgressPage.jsx
│   ├── CompletedPage.jsx
│   └── CalendarPage.jsx
│
├── App.jsx
└── main.jsx

```


---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!  
Feel free to fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for personal or commercial purposes, with proper attribution.

---

## 👨‍💻 Author

Built with ❤️ by **Ayman Kz**
