const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const secretKey = 'your-secret-key';

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint for user authentication
app.post('/login', (req, res) => {
  // Here, you should perform user authentication and validation

  // If authentication is successful, generate a JWT token
  const user = { id: 1, username: 'example' };
  const token = jwt.sign(user, secretKey);

  // Return the token as the response
  res.json({ token });
});

// API endpoint for accessing protected profile
app.get('/profile', authenticateToken, (req, res) => {
  // Access the user's profile data or perform any protected operations

  // Return the profile data as the response
  res.json({ message: 'Accessed protected profile', user: req.user });
});

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // If no token is provided, return an unauthorized error
    return res.sendStatus(401);
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      // If the token is invalid, return a forbidden error
      return res.sendStatus(403);
    }

    // Set the authenticated user on the request object
    req.user = user;

    // Continue with the next middleware or route handler
    next();
  });
}

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
