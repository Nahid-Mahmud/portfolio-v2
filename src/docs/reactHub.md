# ReactHub - MERN Stack Forum Website

## Project Overview
ReactHub is a dynamic forum website built using the MERN (MongoDB, Express.js, React, Node.js) stack. It offers a responsive and user-friendly platform for online discussions, catering to users across desktops, tablets, and mobiles. With intuitive navigation, advanced search capabilities, and role-specific dashboards, ReactHub provides a seamless experience for both users and administrators. The platform supports premium memberships for enhanced features and leverages Firebase for authentication and Stripe for payment processing.

## Key Features
- **Responsive Design**: Optimized for seamless use on desktops, tablets, and mobile devices.
- **Intuitive Navigation**: Features a user-friendly navbar and footer built with Material UI for a polished interface.
- **Advanced Search**: Server-side search functionality using tags for efficient post filtering.
- **Post Sorting**: Posts can be sorted by date or popularity (based on upvote/downvote difference).
- **User Dashboard**: Allows users to manage their posts, view statistics, and access premium features like a Gold badge and increased post limits.
- **Admin Dashboard**: Dedicated interface for admins to manage users, posts, comments, and announcements.
- **Authentication**: Secure user authentication powered by Firebase and JWT tokens.
- **Role-Based Access**: Separate admin and private routes for enhanced security and functionality.
- **Payment Integration**: Stripe integration for premium membership purchases.
- **Social Sharing**: Integrated React Share for easy sharing of posts across social platforms.
- **SEO Optimization**: Utilizes React Helmet Async for improved search engine visibility.

## Technologies Used
- **Frontend**:
  - React.js
  - Material UI (for navbar, footer, and admin profile)
  - React Share
  - React Helmet Async
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with MongoDB Atlas for cloud storage)
  - JSON Web Tokens (JWT) for authentication
  - Stripe for payment processing
- **Authentication**: Firebase
- **Deployment**: Surge (Frontend), Custom server (Backend)

## Backend Architecture
The backend is built with Express.js and MongoDB, providing a robust API for handling user management, posts, comments, tags, and announcements. Key components include:

- **MongoDB Collections**:
  - `users`: Stores user data, including roles (admin/user) and premium membership details.
  - `posts`: Manages post data with sorting by date or popularity.
  - `comments`: Handles user comments with reporting functionality.
  - `tags`: Stores tags for post categorization and search.
  - `announcements`: Manages admin-created announcements.
- **Middleware**:
  - `verifyToken`: Validates JWT tokens for secure API access.
  - `verifyAdmin`: Restricts admin-specific routes to authorized users.
- **Key Endpoints**:
  - `/jwt`: Generates JWT tokens for authenticated users.
  - `/users`: Manages user creation, retrieval, and role updates.
  - `/posts`: Handles post creation, retrieval, voting, and deletion.
  - `/comments`: Manages comment creation, retrieval, reporting, and deletion.
  - `/tags`: Allows admins to create and retrieve tags.
  - `/announcements`: Enables admins to post and retrieve announcements.
  - `/create-payment-intent`: Initiates Stripe payment for premium memberships.
  - `/statistics`: Provides usage statistics (e.g., total users, posts, comments).

## Deployment
- **Frontend**: Hosted on Surge ([react-hub-nahid.surge.sh](https://react-hub-nahid.surge.sh/)).
- **Backend**: Deployed on a custom server, running on port 5000 (configurable via environment variables).

## Challenges and Solutions
- **Challenge**: Implementing efficient post sorting and search functionality.
  - **Solution**: Used MongoDB aggregation pipelines to calculate post popularity (upvotes - downvotes) and sort dynamically based on user input.
- **Challenge**: Ensuring secure role-based access.
  - **Solution**: Implemented JWT-based authentication with middleware to verify tokens and admin roles before granting access to sensitive routes.
- **Challenge**: Handling reported comments for admin review.
  - **Solution**: Added a `report` field to comments and created an endpoint to fetch reported comments with pagination for efficient admin management.

## Future Enhancements
- Add real-time notifications for new comments and announcements.
- Implement advanced analytics for user engagement tracking.
- Enhance accessibility features for broader usability.
- Introduce post categorization beyond tags for better content organization.

## Live Demo
Explore the live application at [react-hub-nahid.surge.sh](https://react-hub-nahid.surge.sh/).