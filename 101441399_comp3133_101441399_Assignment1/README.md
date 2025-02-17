# Employee Management System Backend

This is a backend application for an Employee Management System built with NodeJS, Express, GraphQL, and MongoDB.

## Setup and Installation

1. Clone the repository.
2. Run `npm install` to install the necessary dependencies.
3. Start MongoDB locally or use MongoDB Atlas.
4. Run `npm start` to start the server.

## GraphQL Endpoints

- `POST /graphql` - Access GraphQL queries and mutations.
  
## Queries

1. **Login**
   - Query to log in a user with email and password.

2. **Get All Employees**
   - Retrieve a list of all employees.

3. **Search Employee by EID**
   - Retrieve an employee by their ID.

4. **Search Employee by Designation or Department**
   - Retrieve employees by designation or department.

## Mutations

1. **Signup**
   - Create a new user account.

2. **Add New Employee**
   - Add a new employee to the system.

3. **Update Employee by EID**
   - Update an existing employee's information.

4. **Delete Employee by EID**
   - Delete an employee by their ID.
