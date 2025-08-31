# Assignment Buddy - Online Group Study Platform

## Project Overview
Assignment Buddy is an interactive online platform designed for collaborative group study, built using the MERN (MongoDB, Express.js, React, Node.js) stack. It enables users to create, manage, submit, and grade assignments in a seamless and secure environment. The platform features dynamic routing, smooth animations, and role-based access, providing an intuitive experience for students and educators. With Firebase for authentication and MongoDB for data storage, Assignment Buddy ensures a robust and responsive solution for academic collaboration.

## Key Features
- **Assignment Management**: Users can create, update, delete, and mark assignments with detailed parameters (title, thumbnail, due date, difficulty, marks, description).
- **Secure Authentication**: Firebase-powered email/password authentication with JWT token verification, including cookie-based session management cleared on logout.
- **Dynamic Routing**: Implements private and dynamic routes for assignment creation, submission, and grading, ensuring a tailored user experience.
- **Smooth Animations**: Utilizes Framer Motion for fluid and engaging UI transitions.
- **Conditional Rendering**: Enhances user interface by dynamically displaying content based on user actions and roles.
- **Submission and Grading**: Users can submit assignments and grade others’ submissions, with feedback and marks stored in the database.
- **Difficulty-Based Filtering**: Assignments can be filtered by difficulty level for easier navigation.
- **Responsive Design**: Optimized for desktops, tablets, and mobiles, ensuring accessibility across devices.

## Technologies Used
- **Frontend**:
  - React.js
  - React Router (for dynamic and private routes)
  - Framer Motion (for animations)
  - Firebase (for authentication)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with MongoDB Atlas for cloud storage)
  - JSON Web Tokens (JWT) for secure authorization
  - Cookie-parser for managing authentication cookies
- **Deployment**:
  - Frontend: Surge ([assignment-buddy.surge.sh](https://assignment-buddy.surge.sh/))
  - Backend: Vercel ([assignment-11-server-azure-beta.vercel.app](https://assignment-11-server-azure-beta.vercel.app/))

## Backend Architecture
The backend is powered by Express.js and MongoDB, providing a robust API for managing assignments and submissions. Key components include:

- **MongoDB Collections**:
  - `allassignment`: Stores assignment details, including title, thumbnail URL, due date, difficulty, marks, description, and creator.
  - `submittedAssignment`: Manages submitted assignments with fields for marks, feedback, and status.
- **Middleware**:
  - `cors`: Enables cross-origin requests for frontend-backend communication, supporting local and deployed environments.
  - `cookieParser`: Handles JWT cookies for secure session management.
  - `verifyToken`: Validates JWT tokens to secure protected routes.
- **Key Endpoints**:
  - `/jwt`: Generates JWT tokens for authentication (1-hour expiry).
  - `/logout`: Clears authentication cookies on logout.
  - `/allAssignment`: Retrieves assignments with pagination and optional difficulty filtering.
  - `/allAssignment/user`: Fetches assignments created by a specific user (via email).
  - `/assignment/:id`: Retrieves a single assignment by ID.
  - `/assignment/submitted/:id`: Fetches a single submitted assignment by ID.
  - `/submittedAssignment`: Retrieves all submissions, optionally filtered by user email.
  - `/assignment-count`: Returns the total number of assignments.
  - `/addAssignment`: Creates a new assignment (protected route).
  - `/submittedAssignment`: Submits an assignment (protected route).
  - `/addAssignment/update/:id`: Updates an existing assignment.
  - `/markAssignment/:id`: Updates a submitted assignment with marks, feedback, and status (protected route).
  - `/deleteAssignment/:id`: Deletes an assignment.
  - `/deleteMysubmission/:id`: Deletes a user’s submitted assignment.

## Deployment
- **Frontend**: Hosted on Surge ([assignment-buddy.surge.sh](https://assignment-buddy.surge.sh/)).
- **Backend**: Deployed on Vercel ([assignment-11-server-azure-beta.vercel.app](https://assignment-11-server-azure-beta.vercel.app/)). Note: The server may require a visit to the server link and multiple reloads (3-4 times) after logout/login to ensure data loading due to occasional latency.

## Challenges and Solutions
- **Challenge**: Ensuring secure access to assignment creation and grading features.
  - **Solution**: Implemented JWT-based authentication with `verifyToken` middleware and cookie management, ensuring only authorized users access protected routes.
- **Challenge**: Providing a smooth and engaging user experience.
  - **Solution**: Integrated Framer Motion for animations and React Router for dynamic and private routes, enhancing navigation and interaction.
- **Challenge**: Managing large datasets of assignments with efficient filtering.
  - **Solution**: Used MongoDB queries with pagination and difficulty-based filtering to optimize data retrieval and display.

## Future Enhancements
- Add real-time collaboration features, such as live group discussions or chat.
- Implement notifications for assignment deadlines and grading updates.
- Enhance accessibility with ARIA support and keyboard navigation.
- Introduce advanced filtering options (e.g., by due date or creator).
- Optimize server performance to reduce latency on Vercel deployment.

## Live Demo
Explore the live application at [assignment-buddy.surge.sh](https://assignment-buddy.surge.sh/).  
For backend access, visit [assignment-11-server-azure-beta.vercel.app](https://assignment-11-server-azure-beta.vercel.app/) to ensure the server is active, then reload the frontend 3-4 times after logging in/out if data fails to load.