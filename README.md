# Course Selling App

A comprehensive course-selling platform built using the MERN (MongoDB, Express, React, Node.js) stack. This app enables students to browse and purchase courses, while instructors can create and manage their course listings. It features JWT-based authentication, shopping cart functionality, and user roles (Instructor, Student). Tailwind CSS is used for a responsive and visually appealing UI.

## Features

- **User Roles**: Separate roles for Instructors and Students.
- **JWT Authentication**: Secure login for both students and instructors.
- **Cart Functionality**: Students can add courses to their cart and proceed to purchase.
- **Course Management**: Instructors can create, edit, and manage their courses.
- **Profile Management**: Users can manage their profile and view enrolled courses.
- **Responsive UI**: Styled with Tailwind CSS for consistency across devices.
- **Chatbot**: Users can chat with bot to know about courses.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Recoil (for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Chatbot**: Python

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/aryan-garg0729/Course-App.git
    ```

2. **Backend Setup**:
    - Navigate to the backend folder:
      ```bash
      cd backend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Set up environment variables for database and JWT (see `config.js`).
    - Start the backend server:
      ```bash
      nodemon index.js
      ```

3. **Frontend Setup**:
    - Navigate to the frontend folder:
      ```bash
      cd frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the React app:
      ```bash
      npm run dev
      ```

4. **Tailwind CSS**:
   - Tailwind CSS is already configured. To customize, edit the `tailwind.config.js` file.

## Usage

1. **Sign Up/Login**: Users can sign up as either an Instructor or Student.
2. **Browse Courses**: Students can view available courses.
3. **Add to Cart**: Students can add courses to their cart and complete the purchase.
4. **Manage Courses**: Instructors can create and manage courses.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
