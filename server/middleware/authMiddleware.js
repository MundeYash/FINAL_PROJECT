const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  // This route is protected, the user's information is available in req.user
  res.json({ message: 'This is a protected route' });
});

module.exports = router;