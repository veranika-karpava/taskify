# 🌸 Taskify App - Personal Task List
Taskfy is a fully responsive, full-stack web application designed to help users efficiently manage their tasks. The application supports CRUD operations, status-based filtering, theme toggling, and secure user authentication using JWT. It features a modern UI and is optimized for both desktop and mobile users.

# 🚀 Project Features:
* Theme Toggle: switch between light and dark modes for enhancing accessibility and   reducing visual fatigue;
* User Authentication: user registration and login using JWT tokens. Authenticated routes are protected through middleware;
* Task Management: create new tasks, mark tasks as completed or active, delete individual or all completed tasks;
* Task Filtering: view tasks filtered by status: All, Active, Completed;
* User Logout: clear authentication token and log the user out securely.

# 📂 Project Structure
* `/`: entry point for login and registration;
* `/tasks`: the main task dashboard with CRUD operations.

# 🔧 Enviroment Variables
* Set up the environment variables by configuring the client and server using `.env.sample` files provided in each directory.

# 🛠️ Tech Stack
* React
* Redux Toolkit / RTK Query
* React Router
* Sass (SCSS)
* Node.js
* Express.js
* MongoDB / Mongoose
* JWT Authentication
* ESLint / Prettier

# 📜 Running the Project
1. Clone or Download the Repository: clone the repository to your local machine;
2. Start the Server:
   * **`cd server`**: navigate to the server directory;
   * **`npm install`**: install necessary dependencies;
   * **`npm run dev`**: start the server
3. Start the client:
   * **`cd client`**: navigate to the client directory;
   * **`npm install`**: install necessary dependencies;
   * **`npm start`** - launch the app in your browser;

# 🌐 Link to the demo