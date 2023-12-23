# Task Management

## Description

A simple Task Managment website using React/Laravel. The Employer creates, edits, and delete tasks. The Employee can only view the tasks created by the Employer

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- PHP installed
- Composer installed
- Node.js and npm installed

### Installing

1. **Backend:**
   - Navigate to the backend directory: `cd backend`
   - Run migrations to set up the database: `php artisan migrate`  


2. **Frontend:**
   - Navigate to the frontend directory: `cd frontend`
   - Install dependencies: `npm install`

PS: PLease validate usertype table contains id:1 Employer id:2 Employee
## Running the Project

1. **Backend:**
   - Start the Laravel development server: `php artisan serve`
   - The backend will be accessible at [http://localhost:8000](http://localhost:8000)

2. **Frontend:**
   - Start the React development server: `npm start`

### Additional Notes

- You might need to configure your database connection in the `.env` file in the backend directory.
- Make sure both backend and frontend servers are running simultaneously.

## Built With

- Laravel - [https://laravel.com/](https://laravel.com/)
- React - [https://reactjs.org/](https://reactjs.org/)
