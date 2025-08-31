# ByteCanvas - Technology-Themed E-Commerce Website

## Project Overview
ByteCanvas is a modern, technology-themed e-commerce platform built using the MERN (MongoDB, Express.js, React, Node.js) stack. It offers a seamless and visually appealing shopping experience with a focus on tech products from leading brands like Apple, Samsung, Google, Sony, Huawei, and Xiaomi. The website features a clean and intuitive interface, responsive design, and robust functionality, including product management, cart operations, and secure authentication. With dynamic routing, theme toggling, and error handling, ByteCanvas ensures an engaging user experience across devices.

## Key Features
- **Responsive Design**: Optimized for desktops, tablets, and mobiles, ensuring a consistent experience across devices.
- **Dynamic Navigation**: A clean navbar with sections for Brand Names, Advertisements, and Products, built with React Router for seamless page transitions.
- **Product Management**: Users can add, view, update, and delete product details dynamically, stored in MongoDB collections per brand.
- **Cart Functionality**: A dedicated "My Cart" page allows users to view and manage products added to their cart.
- **Authentication**: Secure email/password authentication with Firebase, supplemented by additional login options and JWT-based authorization.
- **Theme Toggle**: Dark/light theme switch on the homepage for enhanced user customization.
- **Error Handling**: Includes a custom 404 page and error displays for invalid inputs or routes.
- **Dynamic Data Rendering**: Product details and brand pages are dynamically updated, with conditional rendering for a tailored user experience.

## Technologies Used
- **Frontend**:
  - React.js
  - React Router (for dynamic routing)
  - Firebase (for authentication)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with MongoDB Atlas for cloud storage)
  - JSON Web Tokens (JWT) for secure authorization
  - Cookie-parser for handling JWT cookies
- **Deployment**:
  - Frontend: Surge ([bytecanvas.surge.sh](https://bytecanvas.surge.sh/)) and Netlify ([bytecanvas.netlify.app](https://bytecanvas.netlify.app/))
  - Backend: Custom server (configurable port, default 5000)

## Backend Architecture
The backend is powered by Express.js and MongoDB, providing a scalable API for managing products and cart operations. Key components include:

- **MongoDB Collections**:
  - `apple`, `samsung`, `google`, `sony`, `huawei`, `xiaomi`: Separate collections for each brand’s products, storing details like product name, image, type, rating, description, price, and brand.
  - `cardProducts`: Stores cart items for user sessions.
- **Middleware**:
  - `cors`: Enables cross-origin requests for frontend-backend communication.
  - `cookieParser`: Manages JWT cookies for secure authentication.
- **Key Endpoints**:
  - `/jwt`: Generates JWT tokens for user authentication (1-hour expiry).
  - `/[brand]`: POST endpoints to add products for each brand (e.g., `/apple`, `/samsung`).
  - `/[brand]`: GET endpoints to retrieve all products for a specific brand.
  - `/[brand]/:id`: GET endpoints to fetch individual product details by ID.
  - `/[brand]/:id`: PUT endpoints to update product details for a specific brand.
  - `/cart`: POST endpoint to add products to the cart.
  - `/cart`: GET endpoint to retrieve all cart items.
  - `/cart/:id`: DELETE endpoint to remove a product from the cart.

## Deployment
- **Frontend**:
  - Surge: [bytecanvas.surge.sh](https://bytecanvas.surge.sh/)
  - Netlify: [bytecanvas.netlify.app](https://bytecanvas.netlify.app/)
- **Backend**: Deployed on a custom server, running on a configurable port (default 5000).

## Challenges and Solutions
- **Challenge**: Managing separate product collections for multiple brands.
  - **Solution**: Created dedicated MongoDB collections for each brand (e.g., `appleCollection`, `samsungCollection`) to organize data efficiently and simplify API routes.
- **Challenge**: Ensuring secure user authentication across sessions.
  - **Solution**: Implemented Firebase for email/password authentication and JWT tokens with cookie-based storage for secure, time-limited access.
- **Challenge**: Providing a smooth, dynamic user experience.
  - **Solution**: Leveraged React Router for client-side routing and conditional rendering to display brand-specific pages and product details dynamically.

## Future Enhancements
- Add search functionality to filter products by name, type, or brand.
- Implement user profiles to save cart items and preferences across sessions.
- Introduce payment integration (e.g., Stripe) for checkout functionality.
- Enhance accessibility with ARIA labels and keyboard navigation support.
- Add product sorting and filtering options (e.g., by price or rating).

## Live Demo
Explore the live application at:
- Surge: [bytecanvas.surge.sh](https://bytecanvas.surge.sh/)
- Netlify: [bytecanvas.netlify.app](https://bytecanvas.netlify.app/)