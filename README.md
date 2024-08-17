# 🌟 Starlo - Hotel Room Booking App

Welcome to **Starlo**! This project is a comprehensive Hotel Room Booking App built using the MERN stack, Redux, and MVC architecture. It provides a feature-rich platform for managing hotel room bookings, including user management, room booking, advanced search, and reviews.

## 🚀 Key Features

### General Features

- **🔐 User Management:** Secure login, signup, password management, and two-factor authentication.
- **🛏️ Room Booking:** Browse, book, and manage room selections seamlessly.
- **🔍 Advanced Search:** Infinite sorting and filtering options to find the perfect room.
- **⭐ Room Ratings & Reviews:** Rate rooms with stars, write reviews, and see updated average ratings in real-time.
- **🛠️ Admin Tools:** Access to statistics, room management, user/admin handling, and more.

### For Administrators

- **📊 Statistics & Insights:** Comprehensive view of statistics for informed decision-making.
- **🏨 Room & User Management:** Easily update, delete, and manage rooms and users.

## 🛠️ Technologies Used

- **MERN Stack:** MongoDB, Express.js, React, Node.js
- **Redux:** For centralized state management
- **MVC Architecture:** Ensuring a well-organized and maintainable codebase

## 🛠️ Installation and Usage

#### Backend

1. Navigate to the `backend` directory.
2. Install dependencies

```bash
npm install

Start the server:
    For development:
      npm run start:dev

    For production:
      npm run start:prod
```

In backend create a **config.env** and add:

```
DB=your-mongodb-url
JWT_SECRET=a-hash-for-jwt-token
JWT_EXPIRES_IN=expiration-time-for-jwt-tokens(Ex: 3d which means 3-days)
```

#### Frontend

Navigate to the `frontend` directory.
install dependencies and start the development server:

    npm install
    npm run dev

#### 📚 API Documentation

The backend API provides various endpoints for managing rooms, users, reviews, and more. Here's a brief overview:
Rooms

    Get All Rooms: GET /api/v1/rooms/
    Create Room: POST /api/v1/rooms/ (Admin only)
    Room Info: GET /api/v1/rooms/room-info (Admin only)

Authentication

    Signup: POST /api/v1/users/signup
    Login: POST /api/v1/users/login
    Update Password: PATCH /api/v1/users/updateMyPassword
    Update Information: PATCH /api/v1/users/updateMe

Reviews

    Create Review: POST /api/v1/reviews (User only)
    Get Review: GET /api/v1/reviews/{reviewId} (Admin only)
    Delete Review: DELETE /api/v1/reviews/{reviewId} (Admin only)
    Update Review: PATCH /api/v1/reviews/{reviewId} (Admin only)
    Get All Reviews: GET /api/v1/reviews/ (Admin only)
    Get Room Reviews: GET /api/v1/rooms/{roomId}/reviews/ (Admin only)

For detailed API documentation, visit the respective sections in the backend README.md.
🤝 Contributing

Feel free to fork this repository and make your own contributions. Any improvements or bug fixes are welcome.
📜 License

This project is licensed under the MIT License.

Enjoy using Starlo! If you have any questions or need further assistance, feel free to reach out.
