const express = require('express');
const Login = require('../models/login.model');
const sha256 = require('crypto-js/sha256');

const router = express.Router();

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post('/login', async (req, res) => {
  try {
    const targetLogin = await Login.findOne({ email: req.body.email });
    if (!req.body || !req.body.email || !req.body.password || !targetLogin) {
      res.status(401).json({ success: false, error: 'Bad login information' });
      return;
    }
    else if(sha256(req.body.password) !== targetLogin.password){
      res.status(403).json({ success: false, error: 'Invalid credentials' });
      return;
    }
    res.status(200).json({ success: true, email: req.body.email, token: '12345luggage' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unknown error' });
  }
})

router.post('/register', async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(400).json({ success: false, error: 'Invalid registration data' });
      return;
    }

    const emailValidationPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidationPattern.test(req.body.email)) {
      res.status(400).json({ success: false, error: 'Invalid email' });
      return;
    }

    const emailExistsCheck = await Login.findOne({ email: req.body.email });
    if (emailExistsCheck) {
      res.status(400).json({ success: false, error: 'Email already exists' });
      return;
    }
    
    const loginObj = new Login({
      email: req.body.email,
      password: sha256(req.body.password),
    });
  
    const dbResponse = await loginObj.save();
    if (dbResponse && dbResponse._id) {
      res.status(200).json({ success: true, insertedId: dbResponse._id });
    } else {
      res.status(400).json({ success: false, error: 'Database Error' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unknown error' });
  }
})

module.exports = router;