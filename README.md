# Smart Offer Slot Booking System

A full-stack web application where businesses can create limited-time offer slots and customers can reserve those offers through a public booking page.

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend
- .NET 8 Web API
- Swagger / OpenAPI

## Features

### Admin
- Admin login page
- Dashboard
- Create offers
- Manage bookings
- View customer bookings

### Customer
- View active offers
- Book offer slots
- Booking confirmation page

## API Endpoints

### Offers
- GET `/api/Offers`
- POST `/api/Offers`

### Bookings
- GET `/api/Bookings`
- POST `/api/Bookings`

## Setup Instructions

### Backend

```bash
cd backend
dotnet run
```

Swagger:

```txt
http://localhost:5103/swagger
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

---

## Screenshots

Screenshots are available in the `screenshots/` folder.

---

## Future Improvements

- Persistent database integration
- Customer login system
- Admin booking approval workflow
- Slot capacity validation
- Email/SMS notifications
- Contact form between customer and admin
- QR code booking confirmation
