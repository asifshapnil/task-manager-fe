# task-manager-fe

React Task Manager App
This project is a task manager application built with React.js, utilizing features such as category and ticket management, HTML5 drag and drop for task movement, JWT authentication, protected routes, and generic components.

NB: Not need to wory about .env added that to git. 

Features
----------------------------------------------------------------------------------------------
Category Management:
Create categories.
Ticket Management:
Add tickets to categories.
Update and move tickets using HTML5 drag and drop.
Authentication:
JWT token-based authentication with login and logout functionality.
Protected Routes:
Higher-order components for creating protected routes.
Generic Components:
Form builder for dynamic form generation.
Skeleton loader for loading states.
Modal component for interactive dialogs.
Form Validation:
Use Yup for schema-based form validation.
Technologies Used
React.js: A JavaScript library for building user interfaces.
React Router: Declarative routing for React applications.
JWT: JSON Web Tokens for secure authentication.
HTML5 Drag and Drop: API for handling drag and drop interactions.
Yup: JavaScript schema builder for value parsing and validation.
Bootstrap CSS framework for styling components.

------------------------------------------------------------------------------------
Getting Started
------------------------------------------------------------------------------------

Prerequisites
-----------------------------------------------------------------------------------------
Node.js installed on your local machine.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/asifshapnil/task-manager-fe.git
cd repository-name

Install dependencies:
----------------------------------------------------------------------------------------------
npm install
Usage
Running the App
To start the development server:

npm start
The application will open in your default web browser at http://localhost:3001.


Components
Form Builder: Dynamic form generator based on JSON configuration.
Skeleton Loader: Placeholder UI for loading states.
Modal: Reusable component for interactive dialogs.
Routing
React Router is used for client-side routing. Protected routes are implemented using higher-order components (PrivateRoute) to restrict access based on authentication status.

Authentication
Login: Authenticate users with JWT tokens.
Logout: Clear JWT token from local storage.
Form Validation
Yup: Schema-based validation for forms to ensure data integrity.
Deployment
Deploy your React application to your preferred hosting platform.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request.


Acknowledgements
Mention any resources or individuals that helped or inspired you during the development of this project.
Contact
For questions or support, contact [Md Asif Adham] at asifshapnil@gmail.com.