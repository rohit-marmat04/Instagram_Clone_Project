# 📸 Instagram Clone (MERN Stack)

A full-stack social media application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a robust authentication system, image posting, social interactions (likes, comments, follow system), and a user profile management system.

**🚀 Live Demo Mode:** This project currently runs with an **In-Memory Mock Database**, meaning you can clone and run it immediately without setting up a local MongoDB instance!

## ✨ Features

-   **User Authentication**: Secure Login and Signup using JWT (JSON Web Tokens).
-   **Create Posts**: Upload posts with image URLs and captions.
-   **Home Feed**: View posts from all users.
-   **Social Interactions**:
    -   ❤️ Like / Unlike posts.
    -   💬 Comment on posts.
    -   👤 Follow / Unfollow users.
-   **User Profiles**: Dynamic profile pages showing stats (posts, followers, following) and user's posts.
-   **Responsive Design**: Clean and modern UI inspired by Instagram.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), CSS3, Axios, React Router.
-   **Backend**: Node.js, Express.js.
-   **Database**: In-Memory JavaScript Store (Mock DB) for zero-config setup. *Easily switchable to MongoDB.*
-   **Authentication**: JWT, Bcrypt.js.

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

-   Node.js (v16 or higher)
-   npm (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rohit-marmat04/Instagram_Clone_Project.git
    cd Instagram_Clone_Project
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the App

You need to run both the backend and frontend servers.

1.  **Start the Backend Server:**
    In the `backend` directory:
    ```bash
    npm run dev
    ```
    *Server runs on port 5000.*

2.  **Start the Frontend Server:**
    In the `frontend` directory:
    ```bash
    npm run dev
    ```
    *App runs on http://localhost:5173.*

3.  **Open in Browser:**
    Navigate to `http://localhost:5173` to see the app!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
