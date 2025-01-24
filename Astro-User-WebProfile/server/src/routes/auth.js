const express = require('express');
const expressJwt = require('express-jwt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const routeHandler = express.Router();

require('dotenv').config();

const { signup, login, logout, reqSignin } = require('../controllers/auth');
const { signUpVal } = require('../middlewares/miware');
const { JwtSecret } = require('../config/config');

routeHandler.post('/signup', signUpVal, signup);
routeHandler.post('/login', login);
routeHandler.get('/logout', logout);

exports.logout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Logging out successful' });
};

exports.requireSignin = expressJwt ({ secret: JwtSecret, userProperty: 'auth' });

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied'
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Access denied'
    });
  } next();
};

routeHandler.get('/apod', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/apod'); // Assuming services/server.js is running on port 3001
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

routeHandler.get('/rockets', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/rockets'); 
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching rockets data:', error);
    res.status(500).json({ error: 'Failed to fetch rockets data' });
  }
});

routeHandler.get('/capsules', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/capsules'); 
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching capsules data:', error);
    res.status(500).json({ error: 'Failed to fetch capsules data' });
  }
});

// module.exports = routeHandler;
