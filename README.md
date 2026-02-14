# 🚗 Smart Vehicle Service Booking System

A modern, full-stack MERN web application for vehicle service booking, tracking, and management.

## 📁 Project Structure

```
SYstem/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication & user management
│   │   ├── bookingController.js  # Booking CRUD & dashboard stats
│   │   ├── feedbackController.js # Feedback & ratings
│   │   ├── paymentController.js  # Stripe payment integration
│   │   ├── serviceCenterController.js # Service center management
│   │   └── vehicleController.js  # Vehicle CRUD
│   ├── middleware/
│   │   ├── auth.js               # JWT protect & role authorize
│   │   ├── errorHandler.js       # Global error handler
│   │   └── validate.js           # Express-validator middleware
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Feedback.js
│   │   ├── Payment.js
│   │   ├── ServiceCenter.js
│   │   ├── User.js
│   │   └── Vehicle.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── feedbackRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── serviceCenterRoutes.js
│   │   └── vehicleRoutes.js
│   ├── .env
│   ├── package.json
│   ├── seed.js                   # Database seeder
│   └── server.js                 # Express server entry
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminBookings.jsx
│   │   │   │   ├── AdminCenter.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminFeedbacks.jsx
│   │   │   │   └── AdminLayout.jsx
│   │   │   ├── customer/
│   │   │   │   ├── BookService.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Feedback.jsx
│   │   │   │   ├── MyBookings.jsx
│   │   │   │   └── Vehicles.jsx
│   │   │   ├── superadmin/
│   │   │   │   ├── ManageCenters.jsx
│   │   │   │   └── ManageUsers.jsx
│   │   │   ├── Centers.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Services.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Axios, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens) |
| State | Context API |
| Charts | Chart.js + react-chartjs-2 |
| Icons | Lucide React |
| Payments | Stripe (demo mode) |
| Design | Glassmorphism, Modern Dark Theme |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running on `mongodb://localhost:27017`

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Seed Database
```bash
npm run seed
```

### 3. Start Backend
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## 🔐 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@vehicleservice.com | admin123 |
| Admin 1 | admin1@vehicleservice.com | admin123 |
| Admin 2 | admin2@vehicleservice.com | admin123 |
| Customer 1 | customer1@test.com | password123 |
| Customer 2 | customer2@test.com | password123 |
| Customer 3 | customer3@test.com | password123 |

## 📡 API Routes

### Authentication
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | /api/auth/register | Register user | Public |
| POST | /api/auth/login | Login | Public |
| GET | /api/auth/me | Get profile | Protected |
| PUT | /api/auth/profile | Update profile | Protected |
| GET | /api/auth/users | List users | Super Admin |
| PUT | /api/auth/users/:id | Update user | Super Admin |
| DELETE | /api/auth/users/:id | Delete user | Super Admin |

### Vehicles
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | /api/vehicles | Get my vehicles | Customer |
| POST | /api/vehicles | Add vehicle | Customer |
| PUT | /api/vehicles/:id | Update vehicle | Customer |
| DELETE | /api/vehicles/:id | Delete vehicle | Customer |

### Service Centers
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | /api/service-centers | List centers | Public |
| GET | /api/service-centers/:id | Get center | Public |
| POST | /api/service-centers | Create center | Super Admin |
| PUT | /api/service-centers/:id | Update center | Admin |
| DELETE | /api/service-centers/:id | Delete center | Super Admin |

### Bookings
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | /api/bookings | Create booking | Customer |
| GET | /api/bookings/my | My bookings | Customer |
| GET | /api/bookings | All bookings | Admin |
| PUT | /api/bookings/:id/status | Update status | Admin |
| PUT | /api/bookings/:id/cancel | Cancel booking | Customer |
| GET | /api/bookings/stats/dashboard | Dashboard stats | Admin |

### Payments
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | /api/payments/create-intent | Create intent | Customer |
| POST | /api/payments/confirm | Confirm payment | Customer |
| GET | /api/payments/my | My payments | Customer |
| GET | /api/payments | All payments | Admin |

### Feedbacks
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | /api/feedbacks | Submit feedback | Customer |
| GET | /api/feedbacks/my | My feedbacks | Customer |
| GET | /api/feedbacks | All feedbacks | Admin |
| PUT | /api/feedbacks/:id/respond | Respond | Admin |

## 📊 Database Collections

- **Users** — name, email, password, phone, role, serviceCenterId
- **Vehicles** — owner, type, brand, model, year, registrationNumber, fuelType
- **ServiceCenters** — name, address, phone, servicesOffered, rating, admin
- **Bookings** — customer, vehicle, serviceCenter, serviceType, status, cost
- **Payments** — booking, customer, amount, stripePaymentIntentId, status
- **Feedbacks** — booking, customer, serviceCenter, rating, review

## 🏗 System Flow

```
User Register → Add Vehicle → Select Center → Choose Service →
Book Appointment → Admin Confirms → Service In Progress →
Service Complete → Customer Pays → Gives Feedback
```

## 🌐 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy with `npm start`

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set `VITE_API_URL` env variable

### Environment Variables
```
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/vehicle_service
JWT_SECRET=your_strong_secret_key
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_xxx
NODE_ENV=production
```

## 📝 License
MIT
