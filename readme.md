Backend Developer Internship Task - RELOOMATE
This repository contains a backend API built for the Reloomate internship task. It includes essential features like user authentication, protected profiles, and onboarding content APIs.

Repository: https://github.com/SanthoshKumar49451/reloomate-backend

Tech Stack
Node.js

Express.js

MongoDB (via Mongoose)

JWT for Authentication

Bcrypt for Password Hashing

CORS for frontend compatibility (React / React Native)


Setup Instructions
1. Clone this repository
bash
Copy
Edit
git clone https://github.com/SanthoshKumar49451/reloomate-backend.git
cd relooomate-backend
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure Environment Variables
Create a .env file at the root level:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRETKEY=your_secret_key
FRONTEND_URL=http://localhost:3000
4. Start the server
bash
Copy
Edit
npm start
The server will start on:
http://localhost:5000

API Endpoints
Method	Endpoint	Description	Authentication
POST	/api/register	Register a new user	No
POST	/api/login	User login, returns JWT	No
GET	/api/profile	Fetch user profile	Yes (JWT Token)
GET	/api/getonboard	Get onboarding content	No

Postman Testing
All endpoints have been successfully tested with Postman. You can test them using the following flow:

Register a user (/api/register)

Login to get the JWT token (/api/login)

Access profile with token (/api/profile)

Get onboarding steps (/api/getonboard)

Features
Secure password hashing

JWT protected routes

Centralized error handling

CORS configured for frontend integration

Modular project structure
