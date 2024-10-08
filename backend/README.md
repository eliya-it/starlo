# Starlo

Welcome to Starlo API! This API, built with Node.js, Express, and MongoDB, offers a complete solution for managing hotel room bookings. Utilizing MVC architecture, it provides an extensive set of features:

## Key Features:

- User Management: Includes login, signup, password management, and two-factor authentication for added security.
- Room Booking: Users can seamlessly choose, book, delete, and add rooms on the bookings page.
- Advanced Search: Empowers users with infinite filtering and sorting options for finding the perfect room.
- Room Reviews: Users can rate rooms with stars, write reviews, and see updated average ratings in real-time.
- Admin Tools: Admins have access to statistics, room management, user/admin handling, and more.

This API simplifies room selection, booking, and administration, providing a robust and user-friendly experience.

## Installation and Usage:

1. Clone the repository
2. Install dependencies: Run:

```bash
npm install
```

3. Start the server:

   For development use:

```bash
npm run start:dev
```

For production use:

```bash
npm run start:prod
```

```bash
npm start
```

Once you are done, you need to fill config.env 4. Explore the API endpoints

---

## Documentation:

In this documnetation:

- [Rooms](https://github.com/eliyait/starlo-api#rooms) (CRUD operations and much more)
- [APIFeatures](https://github.com/eliyait/starlo-api#apifeatures)
- [Authentication](https://github.com/eliyait/starlo-api#authentication)
- [Reviews](https://github.com/eliyait/starlo-api#reviews) (CRUD)
- [Room/Review/User](https://github.com/eliyait/starlo-api#roomreviewuser)

## <!-- Room Collection -->

## Rooms

A special route for rooms, you can get all rooms, create,update and delete rooms and also get rooms statistics.

### getAllRooms

Submit a **GET** request to get all avilable rooms in:

```
https://api.starlo.eliyait.com/api/v1/rooms/
```

### createRoom

Submiting a **POST** request to:

```
https://api.starlo.eliyait.com/api/v1/rooms/
```

will create room, **This action for admin only!**
| Body | Description |
| ---------- | ------------------------------------------------------------- |
| name | for room name |
| categories | for room categories |
| bedsCount | number of avilable beds in the current room |
| bedsCount | number of extra beds of the current room |
| meals | number of meals in the current room |
| isOccupied | by default it would be false which means the room is avilable |
| price | for room price |
| rating | room ratings average from 1 to 5 |
| summary | room summary |

the request body should be like

```json
{
  "name": "roomName",
  "categories": "category",
  "bedsCount": 1,
  "extraBeds": 2,
  "meals": 1,
  "isOccupied": false,
  "price": 200,
  "rating": 4,
  "summary": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum itaque,quaerat praesentium nostrum. Itaque quae exercitationem dolor suscipit. A ipsam perspiciatis veniam, inventore optio magnam."
}
```

## roomInfo

This route will give you a good statistics about all rooms, it will get all rooms that have the same beds number, **This route for admin only!**

Submit a **GET** request to:

```
https://api.starlo.eliyait.com/api/v1/rooms/room-info
```

The response should be like:

```json
{
  "status": "success",
  "length": 2,
  "data": {
    "stats": [
      {
        "_id": 2,
        "roomsNumber": 4,
        "roomsRatingsQuantity": 137.5,
        "roomRatingsAverage": 4.6
      },
      {
        "_id": 1,
        "roomsNumber": 3,
        "roomsRatingsQuantity": 170,
        "roomRatingsAverage": 4.9
      }
    ]
  }
}
```

| Name                 | Description                                             |
| -------------------- | ------------------------------------------------------- |
| \_id                 | this means get all rooms that have the same beds number |
| roomsNumber          | number of the matched rooms                             |
| roomsRatingsQuantity | number of ratings for all the matched rooms             |
| roomRatingsAverage   | ratings average for all matched rooms                   |

---

## APIFeatures

Submit a **GET** request to:

```
https://api.starlo.eliyait.com/api/v1/rooms?price[gt]=100&page=1&fields=name,price&limit=5
```

| Paramter  | description                                           |
| --------- | ----------------------------------------------------- |
| price[gt] | Sort by price it supports gt,lt,gte and lte operators |
| page      | number of the page to get the result from             |
| fields    | get rooms and parse the result by desired fields      |
| limit     | number of the result per page                         |

---

## Authentication

A route for user actions like signup, login, update password and update information

## Signup

This route for users who wants to have an acount on **[Starlo](https://api.starlo.eliyait.com/)**
Submit a **POST** request to:

```
https://api.starlo.eliyait.com/api/v1/users/signup
```

The request body should be somthing like:

```json
{
  "name": "Markov",
  "email": "user@eliyait.com",
  "password": "yourPassword",
  "confirmPassword": "confirmYourPassword"
}
```

Once you send a request, the response will be like:

```json
{
  "status": "success",

  "data": {
    "newUser": {
      "photo": "user.jpg",
      "role": "user",
      "joined": "2023-02-05T03:47:41.335Z",
      "isVefied": false,
      "_id": "63df2772d46be207e8b55444",
      "name": "Markov",
      "email": "user@eliyait.com"
    }
  }
}
```

| Key      | Description                                                     |
| -------- | --------------------------------------------------------------- |
| photo    | photo of user, by default it will set to "user.jpg"             |
| role     | current user role, by default it will be user                   |
| joined   | date of which time you have joined                              |
| isVefied | by default it will be set to false until you confirm your email |
| \_id     | this will be your id                                            |
| name     | your name                                                       |
| email    | your email                                                      |

## login

This route is for users who already have an account on **[Starlo](https://api.starlo.eliyait.com/)**,
submit a **POST** request to:

```
https://api.starlo.eliyait.com/api/v1/users/login
```

Your request body should be like:

```json
{
  "email": "{yourEmail}",
  "password": "{yourPassword}"
}
```

Once you send request with correct email & password your response will be like:

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGYyNzcyZDQ2YmUyMDdlOGI1NTQ0NCIsImlhdCI6MTY3NTU2OTgyMCwiZXhwIjoxNjc1ODI5MDIwfQ.7hGeYf_ie9mO5Om6Q18r9LxPE_2Y2OHcaQVMwpD4g8g", // JWT Token
    "data": {
        "user": { // Information of the current logged in user
            "photo": "user.jpg",
            "role": "user",
            "joined": "2023-02-05T03:47:41.335Z",
            "isVefied": false,
            "_id": "63df2772d46be207e8b55444",
            "name": "Markov",
            "email": "user@eliyait.com",

        }
    }
```

### updatePassword

A route for users who frogot thier password,
Submit a **PATCH** request to:

```
https://api.starlo.eliyait.com/api/v1/users/updateMyPassword
```

Tour request body should be somthing like:

```json
{
  "currentPassword": "{yourCurrentPassword}",
  "newPassword": "{newPassword}",
  "newConfirmPassword": "{confirmYOurNewPassword}"
}
```

Your response will be:

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGYyNzcyZDQ2YmUyMDdlOGI1NTQ0NCIsImlhdCI6MTY3NTU2OTgyMCwiZXhwIjoxNjc1ODI5MDIwfQ.7hGeYf_ie9mO5Om6Q18r9LxPE_2Y2OHcaQVMwpD4g8g", // JWT Token
    "data": {
        "user": { // Information of the current logged in user
            "photo": "user.jpg",
            "role": "user",
            "joined": "2023-02-05T03:47:41.335Z",
            "isVefied": false,
            "_id": "63df2772d46be207e8b55444",
            "name": "Markov",
            "email": "user@eliyait.com",

        }
    }
```

with a status code of **200**

### updateInformation

This route for updating user information only (email,name),
Submit a **PATCH** request to:

```
https://api.starlo.eliyait.com/api/v1/users/updateMe
```

Your request should be like, if you want to update your name only:

```json
{
  "name": "{yourName}"
}
```

Your request should be like, if you want to update your email only:

```json
{
  "email": "{your-email@example.com}"
}
```

Or both:

```json
{
  "name": "{yourName}",
  "email": "{your-email@example.com}"
}
```

---

## Reviews

A route for creat review, get a review , delete a review and update a review, Please note **This action is for users only!**

### createReview

Submit a **POST** request to:

```
https://api.starlo.eliyait.com/api/v1/reviews
```

Your request sholud be like:

```json
{
  "review": "It was AWesome", // Your review
  "room": "63c69ee82602192bf8bc4a2c", // Room that you want to write a review to
  "user": "63dfbf1fe2938f3d507976b6", // your ID you can get it from /api/v1/users/me
  "rating": 4 // your rating, MAX rating is 5.0
}
```

Your response will be somthing like:

```json
{
  "status": "success",
  "message": "Document created successfully!",
  "data": {
    "doc": {
      "_id": "63dfbf80e2938f3d507976bc", // review ID
      "review": "It was AWesome",
      "room": "63c69ee82602192bf8bc4a2c", // room ID
      "user": "63dfbf1fe2938f3d507976b6", // user who put a review ID
      "rating": 4, // user rating
      "createdAt": "2023-02-05T14:38:56.602Z" // the time of created document
    }
  }
}
```

### getReview

A route to get one specific review,Please note **This action is for admin only!**

Submit a **GET** request to:

```
https://api.starlo.eliyait.com/api/v1/reviews/{reviewId}
```

Your response will be somthing like:

```json
{
  "status": "success",
  "data": {
    "doc": {
      "_id": "63dfbf80e2938f3d507976bc",
      "review": "It was AWesome",
      "room": "63c69ee82602192bf8bc4a2c",
      "user": {
        // user who made review information
        "photo": "user.jpg",
        "_id": "63dfbf1fe2938f3d507976b6",
        "name": "Markov"
      },
      "rating": 4,
      "createdAt": "2023-02-05T14:38:56.602Z",
      "__v": 0,
      "id": "63dfbf80e2938f3d507976bc"
    }
  }
}
```

### deleteReview

This route will delete a review
Submit a **DELETE** request to:

```
https://api.starlo.eliyait.com/api/v1/reviews/{reviewId}
```

You will get response with status code of **204** for NO CONTENT

### updateReview

Submit a **PATCH** request to:

```
https://api.starlo.eliyait.com/api/v1/reviews/{reviewId}
```

Your request should be like:

```json
{
  "review": "Awesome"
}
```

Your response will be like:

```json
{
  "status": "success",
  "data": {
    "data": {
      "_id": "63dfbf80e2938f3d507976bc",
      "review": "Awesome",
      "room": "63c69ee82602192bf8bc4a2c",
      "user": {
        "photo": "user.jpg",
        "_id": "63dfbf1fe2938f3d507976b6",
        "name": "Markov"
      },
      "rating": 4,
      "createdAt": "2023-02-05T14:38:56.602Z",
      "__v": 0,
      "id": "63dfbf80e2938f3d507976bc"
    }
  }
}
```

### getAllReviews

A route for admin to get all reviews ,Please note **This action is for admin only!**,
Submit a **GET** request to :

```
https://api.starlo.eliyait.com/api/v1/reviews/
```

You will get response with status code of **200**, contains all reviews for all rooms

```json
{
  "status": "success",
  "results": 2,
  "data": {
    "reviews": [
      {
        "_id": "63dfbf80e2938f3d507976bc",
        "review": "Awesome",
        "room": "63c69ee82602192bf8bc4a2c",
        "user": {
          "photo": "user.jpg",
          "_id": "63dfbf1fe2938f3d507976b6",
          "name": "Markov"
        },
        "rating": 4,
        "createdAt": "2023-02-05T14:38:56.602Z",
        "id": "63dfbf80e2938f3d507976bc"
      },
      {
        "_id": "63ba294a3640fa30749d60fc",
        "review": "It was AWesome",
        "room": "63b8e83bdbc1713958074250",
        "user": {
          "photo": "user.jpg",
          "_id": "63ba200b16d8bf010406a84a",
          "name": "Admin"
        },
        "rating": 4,
        "createdAt": "2023-01-08T02:24:10.384Z",
        "id": "63ba294a3640fa30749d60fc"
      }
    ]
  }
}
```

---

## Room/Review/User

A route for getting all reviews on one room,Please note **This action is for admin only!**

Submit a **GET** request to :

```
https://api.starlo.eliyait.com/api/v1/rooms/{roomId}/reviews/
```

The comming response will be:

```json
{
  "status": "success",
  "results": 1,
  "data": {
    "reviews": [
      {
        "_id": "63dfbf80e2938f3d507976bc",
        "review": "Awesome",
        "room": "63c69ee82602192bf8bc4a2c",
        "user": {
          "photo": "user.jpg",
          "_id": "63dfbf1fe2938f3d507976b6",
          "name": "Markov"
        },
        "rating": 4,
        "createdAt": "2023-02-05T14:38:56.602Z",
        "id": "63dfbf80e2938f3d507976bc"
      },
      {
        "_id": "63df12425938f3d507976bc",
        "review": "It was bad",
        "room": "63c69ee82602192bf8bc4a2c",
        "user": {
          "photo": "user.jpg",
          "_id": "63dfbf1fe2938f3d507976b6",
          "name": "Markov"
        },
        "rating": 4,
        "createdAt": "2023-03-05T14:38:56.602Z",
        "id": "63dfbf80e2938f3d507976bc"
      }
    ]
  }
}
```
