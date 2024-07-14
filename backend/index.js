// app.js or index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/user_router'); // Adjust path as necessary
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: 'https://navi-frontend.onrender.com', // Replace with your frontend URL
  credentials: true, // Allow cookies and authentication headers
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/', userRouter); // Mount router without '/api' prefix

// Database connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
