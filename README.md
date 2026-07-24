# 🌱 HabitFlow - Habit Tracker Website

HabitFlow is a full-stack Habit Tracker web application that helps users build and maintain daily habits. Users can register, log in securely, manage habits, track progress, view analytics, and monitor their daily streaks through a clean and responsive interface.

---

## 🚀 Features

### 👤 User Authentication
- User Registration
- Secure Login
- JWT Authentication
- Password Encryption (bcrypt)

### ✅ Habit Management
- Add New Habits
- Edit Habits
- Delete Habits
- Mark Habits as Completed
- Search Habits
- Filter (All / Completed / Pending)

### 📊 Dashboard
- Total Habits
- Completed Habits
- Current Streak
- Progress Percentage

### 📈 Analytics
- Progress Chart
- Habit Statistics
- Achievement Badges

### 📅 Calendar
- Monthly Calendar View
- Current Date Highlight
- Habit Tracking by Date

### 👤 Profile
- User Information
- Habit Statistics
- Streak Information

### ⚙️ Settings
- Dark / Light Theme
- Change Password
- Logout

---

# 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3
- JavaScript (ES6)
- Chart.js

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- JWT (JSON Web Token)
- bcryptjs

---

# 📂 Project Structure

```
HabitFlow/
│
├── backend/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── analytics.html
│   ├── calendar.html
│   ├── myhabits.html
│   ├── profile.html
│   ├── settings.html
│   ├── login.html
│   ├── register.html
│   ├── *.css
│   └── *.js
│
├── react-ui/
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/HabitFlow.git
```

Go to project folder

```bash
cd HabitFlow
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Start the server

```bash
npm start
```

or

```bash
npm run dev
```

---

## Frontend

Open the `frontend` folder and run it using **Live Server** in VS Code.

---

# 📸 Screenshots

Add screenshots of:

- Home Page
- Dashboard
- Analytics
- Calendar
- My Habits
- Profile
- Settings

---

# 📌 Future Improvements

- Email Verification
- Password Reset
- Habit Reminders
- Notifications
- Mobile Responsive Design
- React Frontend Integration
- Progressive Web App (PWA)

---

# 👨‍💻 Author

**Daksh Sharma**

BCA Student | Full Stack Web Developer

---

# ⭐ Support

If you like this project, don't forget to ⭐ star the repository.
