# todo-list-project
 
Project Title: To-do-List
 
-------------------
 
**Description:* The To-Do List Application is a simple, full-stack web application that allows users to manage tasks in an organized manner. It consists of a Svelte frontend and an Express.js backend with a MariaDB database for persistent data storage. The application is designed to provide an intuitive interface where users can create, update, mark as completed, and delete to-do items.
 
Key Features:
Add To-Do Items: Users can quickly add tasks to their to-do list by typing into a text field and clicking "Add".
Mark as Completed: Each task can be marked as completed by clicking the checkbox next to it, with a visual indicator (strikethrough) showing it is done.
Edit Tasks: Users can edit the text of existing tasks to update details or correct mistakes.
Delete Tasks: Unwanted or completed tasks can be removed from the list entirely by clicking the delete button.
Persistent Storage: All tasks are saved in a MariaDB database, ensuring data persistence across sessions.
Technical Overview:
Frontend: Built with Svelte, the frontend provides a lightweight and reactive user interface. It communicates with the backend via RESTful API requests to manage to-do items.
Backend: Powered by Express.js, the backend handles API requests to interact with the database. It supports creating, reading, updating, and deleting (CRUD) tasks.
Database: The application uses MariaDB for storing the tasks persistently. Each to-do item is saved with details such as its text, completion status, and unique ID.
 
-------------------
 
**Interfaces:* The To-Do List Application provides a set of RESTful API interfaces that allow interaction with the backend for managing to-do items. These APIs follow standard HTTP methods such as GET, POST, PUT, and DELETE to perform operations on the to-do list.
 
1. API Endpoints
 
a. GET /todos
Description: Fetches all to-do items from the database.
 
b. POST /todos
Description: Adds a new to-do item to the list.
 
c. PUT /todos/
Description: Updates an existing to-do item.
 
d. DELETE /todos/
Description: Deletes a to-do item from the list.
 
 
The to-do item data structure used in the application is simple and consists of the following properties:
 
Property    Type           Description
id          Integer        Unique identifier for each to-do item.
text        String         The description of the to-do item.
done        Boolean        The status of the to-do item (true for done).
 
 
In case of an error, the API responds with an appropriate HTTP status code and an error message.
 
Status Code Description
400 Bad Request – Missing or invalid parameters.
404 Not Found – To-do item with the given ID was not found.
500 Internal Server Error – An error occurred on the server.
 
 
-------------------
 
**Installation:*  This project was implemented using the following technologies and dependencies:
 
Node.js: A JavaScript runtime environment used to run the backend server powered by Express.js.
 
Express.js: A minimalist web framework for Node.js, used to build the backend server and define the API endpoints.
 
MariaDB: A relational database management system used to store the to-do list data. MySQL could also be used as an alternative.
 
Svelte: A modern JavaScript framework used to develop the frontend of the application, providing an interactive user interface for the to-do list.
 
Vite: A fast build tool and development server for modern web projects, used for developing and building the Svelte frontend.
 
npm (Node Package Manager): Used to install and manage all necessary dependencies for both the backend and frontend.
 
node-fetch: A package used in the backend to handle HTTP requests.
 
CORS (Cross-Origin Resource Sharing): A middleware package for Express.js used to allow requests from the frontend to the backend, even if they run on different hosts.
 
Jest: A testing framework for Node.js used to test the API endpoints and ensure the backend logic works correctly.
 
-------------------
 
**Configs:* The following configurations were made to ensure the smooth operation of both the backend and frontend of the project:
 
Backend (Express.js)
Database Connection: The backend has been configured to connect to a MariaDB database. The connection parameters, such as the database host, user, password, and database name, are managed through environment variables.
Server Port: The backend server runs on port 3000, which is set via environment variables to ensure flexibility for different environments.
CORS: Cross-Origin Resource Sharing (CORS) has been enabled on the server to allow the frontend (running on a different port) to make API requests to the backend.
 
Frontend (Svelte)
API Base URL: The frontend is configured to interact with the backend through the API URL, which points to http://localhost:3000. This allows the frontend to communicate with the Express.js backend for managing the to-do list data.
Development Server: The frontend is set up to run on port 5173 using Vite, which can be customized if needed.
 
-------------------
 
**Usage:* This section explains how to set up the project, how to ineract with the to-do-list, and what features are available for the end user.
This section explains how to set up the project, how to interact with the to-do list, and what features are available for end-users.
 
Features of the To-Do List
Add new to-do items: Users can add new tasks to their to-do list by typing in a text input field and clicking "Add".
Mark tasks as completed: Once a task is done, users can check a box to mark it as completed. Completed tasks will be visually indicated (e.g., strikethrough or color change).
Edit task text: Users can edit the text of an existing to-do item.
Delete tasks: Users can remove tasks from the list.
 
-------------------
 
**License:* -
 
-------------------
 
**Authors:* Jerome Elsasser and Oguz Duras