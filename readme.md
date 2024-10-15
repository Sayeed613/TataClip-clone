# TataClip Clone

This project consists of a full-stack e-commerce admin dashboard for managing products, orders, users, and carts. The backend is built using Node.js with Express, MongoDB for database management, and authentication middleware. The frontend is built using React with Tailwind CSS for styling, and it includes features like adding products, listing products, tracking orders, and updating delivery details.

## ADMINURL : https://tata-clip-clone-admin.vercel.app
## FRONTEND : https://tata-clip-clone-frontend.vercel.app
##BACKEND : https://tata-clip-clone-backend.vercel.app

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
  - [Backend](#backend-project-structure)
  - [Frontend](#frontend-project-structure)
- [How to Use](#how-to-use)

## Features

### Admin Backend

- Add, list, and manage products.
- Track and manage customer orders, including updating delivery details.
- Middleware for authentication (admin/user) and image upload (using multer).
- Integration with Cloudinary for product image storage.
- Secure user authentication using JWT and password hashing with bcrypt.

### User Frontend

- Responsive design with Tailwind CSS.
- User authentication (Login, Register, Logout).
- Product listing, filtering, and sorting features.
- Cart and Checkout functionality with Stripe integration for payments.
- Order tracking system.
- Slick carousel for product displays.
- Toast notifications for feedback (e.g., success/failure messages).

## Technologies

### Backend

- Node.js & Express for building RESTful APIs.
- MongoDB & Mongoose for database management.
- Cloudinary for image storage.
- JWT for user authentication.
- Multer for handling image uploads.

#### Backend Libraries

- bcrypt
- jsonwebtoken
- mongoose
- multer
- dotenv
- express
- nodemon
- validator
- cloudinary
- cors

### Frontend

- React with Vite for faster development.
- Tailwind CSS for styling.
- React Router for page navigation.
- Axios for making API requests.
- React Toastify for toast notifications.
- React Slick for the product carousel.

#### Frontend Libraries

- axios
- react-router-dom
- react-slick
- react-toastify
- tailwindcss
- vite

## Installation

### Backend Setup

1. Clone the repository.
   ```bash
   git clone https://github.com/your/repository.git
   cd backend
   ```

Install dependencies.


npm start

Frontend Setup
Navigate to the frontend directory.

cd frontend
Install dependencies.

npm install
Start the development server.

npm run dev

Backend Setup
Navigate to the Backend directory.

cd Backend
Install dependencies.

npm install
Start the development server.

npm run server

admin Setup
Navigate to the admin directory.

cd admin
Install dependencies.

npm install
Start the development server.

npm run dev
