# Blog App

This is a blog application built with Node.js, Express, SQLite3, and React. It supports user registration, login, and CRUD operations for posts and comments. The application allows users to create, read, update, and delete posts and comments, and it includes features for user authentication and authorization.


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Technology Stack](#technologies-stack)
- [Usage](#usage)
- [Deployment](#deployment)
- [Testing](#testing)
- [Resources](#resources)

## Features

- User registration and authentication
- Create, read, update, and delete blog posts
- Comment on posts with user identification
- Responsive and user-friendly interface

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

### Backend Setup

1. Clone the repository:

   ```
    https://github.com/sulemanshaik109/Blog-App.git

   cd blog-app
   ```

2. Install backend dependencies:

    ```
    npm install
    ```

3. Create and configure the database:

    The database schema will be created automatically. Ensure you have SQLite3 installed.

4. Start the server:
    ```
    node server.js
    ```

    The backend server will run on http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:

    ```
    cd client
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Start the frontend application:

    ```
    npm start
    ```

    The frontend application will run on http://localhost:3000.

## API Endpoints

### Authentication

- POST /register: Register a new user
- POST /login: Authenticate a user and receive a JWT token

### Posts

- GET /posts: Retrieve all posts
- POST /posts: Create a new post
- GET /posts/:id: Retrieve a specific post by ID
- PUT /posts/:id: Update a post by ID
- DELETE /posts/:id: Delete a post by ID

### Comments

- GET /posts/:id/comments: Retrieve all comments for a specific post
- POST /posts/:id/comments: Create a new comment for a specific post
- DELETE posts/:id/comments/:id: Delete a comment by ID

## Technology Stack

- **Frontend**: React, JavaScript, CSS
- **Backend**: Node.js, Express
- **Database**: SQLite3

## Usage

- Register and log in to the application to create and manage posts.
- Create new posts and comment on posts using the provided forms.
- Manage your posts and comments from the user interface.

## Deployment

### Backend Deployment on Render

1. Create a Render Account:
    - Sign up for a free account at Render.

2. Create a New Web Service:
    - In the Render dashboard, click on "New" and then "Web Service".
    - Connect your GitHub repository and select the notes-app repository.

3. Configure Build and Start Commands:
    - Root Directory:

        ```
        server
        ```

    - Build Command:

        ```
        npm install & npm run build
        ```

    - Start Command:

        ```
        node index.js
        ```

4. Set Environment Variables:

    - In the Render service settings, add any necessary environment variables.

5. Deploy:

    - Trigger a new deploy by pushing changes to your GitHub repository or clicking the "Deploy" button in Render.

6. Access the Application:

    - Once the deployment is successful, you can access the backend at the URL provided by Render.

### Frontend Deployment on Netlify

1. Create a Netlify Account:

    - Sign up for a free account at Netlify.

2. Create a New Site:

    - In the Netlify dashboard, click on "Add new site" and connect your GitHub repository.
3. Configure Build and Publish Settings:

    - Build Command:

        ```
        npm install
        ```
    - Publish Directory:
        
        ```
        client
        ```

4. Deploy:

    - Trigger a new deploy by pushing changes to your GitHub repository or clicking the "Deploy site" button in Netlify.
5. Access the Application:

    - Once the deployment is successful, you can access the frontend at the URL provided by Netlify.

## Testing

### Using Postman

1. Add New Request:

    - Create a new request in Postman or Insomnia.
    - Set the request method to GET, POST, PUT, or DELETE depending on the endpoint you want to test.

2. Set URL:

    - Use the URL provided by Render for the backend. For example:

        ```
        https://suleman-notes-app.onrender.com/api/notes
        ```

3. Send Request:

    - Send the request and check the response.

## Resources

<details>
<summary>Colors</summary>
<br/>

<div style="background-color: #f1f1f1; width: 150px; padding: 10px; color: black">Hex: #f1f1f1</div>
<div style="background-color: #bd9100; width: 150px; padding: 10px; color: white">Hex: #bd9100</div>
<div style="background-color: #f0e3aa; width: 150px; padding: 10px; color: white">Hex: #f0e3aa</div>
<div style="background-color: #ffffff; width: 150px; padding: 10px; color: black">Hex: #ffffff</div>
<div style="background-color: #c88500; width: 150px; padding: 10px; color: black">Hex: #c88500</div>
<div style="background-color: #d5bf5d; width: 150px; padding: 10px; color: black">Hex: #d5bf5d</div>
<div style="background-color: #fff8d8; width: 150px; padding: 10px; color: black">Hex: #fff8d8</div>
<div style="background-color: #000000; width: 150px; padding: 10px; color: black">Hex: #000000</div>
<div style="background-color: #363636; width: 150px; padding: 10px; color: black">Hex: #363636</div>

</details>
<br/>

# Show Your Support

Give a ⭐️ if you like this project!
