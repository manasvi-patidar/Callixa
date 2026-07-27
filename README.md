# Callixa

Callixa is a full-stack video conferencing web application that enables users to securely register, log in, create meetings, join meetings, communicate through real-time video and audio, and exchange messages instantly.

## Live Demo

🌐 Frontend: https://callixa-liard.vercel.app

⚙️ Backend API: https://callixa-api.onrender.com

## Features

- User Authentication (JWT)
- Create & Join Meetings
- Real-time Video Calling (WebRTC)
- Real-time Chat (Socket.IO)
- Real-time Toast Notifications
- Mute / Unmute Microphone
- Camera On / Off
- Copy Meeting ID
- Responsive User Interface
- MongoDB Database Integration

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client
- WebRTC

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- Bcrypt

## Folder Structure

```text
Callixa
├── backend
└── frontend
```

## Installation

### Clone Repository

```bash
git clone https://github.com/manasvi-patidar/Callixa.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

## Author

**Manasvi Patidar**

GitHub: https://github.com/manasvi-patidar

---

Built with ❤️ using React, Node.js, Express.js, MongoDB, Socket.IO, and WebRTC.
