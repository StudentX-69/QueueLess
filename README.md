# QueueLess

QueueLess is a MERN-stack real-time queue management system. Customers can join a queue, receive a token, monitor their position, and hear an alert when their token is called. Staff can manage the live queue from a dashboard.

## Features

For Customers
• Live Queue Tracking: See exactly who is currently being served and how many people are ahead in the queue.

• Remote Join: Join a queue virtually without having to be physically present at the venue.

• Real-time Alerts: Receive notifications (e.g., "🔔 Your turn is approaching") when it's almost time to be served.

For Staff & Businesses
• Staff Dashboard: A dedicated operations hub to manage businesses and queues.

• Multi-Business Support: Create and manage multiple businesses (e.g., City Care Clinic, Momoland) from a single account.

• Queue Generation: Create specific queues (e.g., "General Queue") under each business and manually or automatically move customers through it in real-time.

📸 Screenshots
1. Landing Page
  ![Landing Page](<Screenshot 2026-07-31 230844-1.png>)

2. Live Customer Queue
  ![Live Customer Queue](<Screenshot 2026-07-31 231059.png>)

3. Staff Dashboard
   ![Staff Dashboard](<Screenshot 2026-07-31 231121.png>)
## Project structure

```text
queueless/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── ...
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── sockets/
│   │   └── utils/
│   └── ...
├── package.json
└── README.md
```

## Tech stack

### Frontend
- React
- Vite
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token
- bcryptjs
- Socket.IO
- Helmet
- CORS
- Morgan

## Local setup

### 1. Requirements

- Node.js 20+
- MongoDB running locally or a MongoDB Atlas connection string

### 2. Install dependencies

From the project root:

```bash
npm install
npm run install:all
```

### 3. Configure server environment

Copy `server/.env.example` to `server/.env` and update values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/queueless
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

### 4. Start development servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Demo flow

1. Register an account as `owner`.
2. Open the staff dashboard and create a business.
3. Create a queue for the business.
4. Register a second account as `customer` in another browser/incognito window.
5. Join the queue.
6. On the staff dashboard, click **Call next**.
7. The customer screen receives a real-time event, plays a beep, and shows a visual alert.

## Browser notification note

Browsers may require permission before showing system notifications. QueueLess treats the beep and in-app visual alert as the primary notification, with browser notifications as an optional enhancement.

## API overview

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/businesses
POST   /api/businesses
GET    /api/businesses/mine

GET    /api/queues/business/:businessId
POST   /api/queues
GET    /api/queues/:queueId
POST   /api/queues/:queueId/join
POST   /api/queues/:queueId/next
POST   /api/queues/:queueId/complete
POST   /api/queues/:queueId/skip
POST   /api/queues/:queueId/leave
```

## Socket.IO events

### Client to server

- `user:join`
- `queue:join`
- `queue:leave`

### Server to client

- `queue:updated`
- `token:called`
- `queue:error`

## Important architecture decision

Queue state is persisted in MongoDB, while Socket.IO is used only for real-time delivery. This means refreshing the page does not lose queue state.

## Production improvements

For a production deployment, consider adding Redis for horizontal Socket.IO scaling, a job queue for notifications, rate limiting, audit logs, stricter validation, HTTPS, and automated tests.

### Tab-specific login sessions
QueueLess stores auth in `sessionStorage` instead of `localStorage`, so each browser tab can keep its own login while still surviving refresh. This makes it easier to test customer and staff flows side by side.

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.

📝 License
This project is MIT licensed.
