# Angular-JWT-Authentication

This is an Angular application that demonstrates user authentication using JWT (JSON Web Tokens) and Postman for testing. It includes a server implemented in Node.js with Express to handle user login and JWT token generation.

## Features

- User authentication using JWT tokens.
- Angular application with login and profile components.
- Authentication guard to protect routes.
- HTTP interceptor to add JWT token to requests.
- Example server for handling authentication and token generation.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Server (server.js)

1. Open the `server.js` file in the root directory.
2. Update the `secretKey` variable with your own secret key.

```javascript
const secretKey = 'your-secret-key';
```

3. Install dependencies by running:

```javascript
npm install
```

4. Start the server:

```javascript
npm start
```

## Angular Application

1. Navigate to the 'angular-jwt-authentication' directory.
2. Install Angular CLI globally (if not already installed):

```javascript
npm install -g @angular/cli
```

3. Install Angular app dependencies:

```javascript
npm install
```

4. Start the Angular app:

```javascript
ng serve
```

## Endpoints

`/login`: Endpoint to authenticate users and generate JWT tokens.

`/profile`: Protected endpoint to access the user's profile information.

## Usage

1. Access the Angular app at `http://localhost:4200/`.
2. Use the provided login form to log in.
3. Upon successful login, you'll be redirected to the profile page.
4. Protected routes are guarded by the `AuthGuard`, ensuring only authenticated users can access them.














