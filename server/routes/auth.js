// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/Admin');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();
// require('dotenv').config();

// // Register User
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log(req.body);
  
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }
//     user = new User({ name, email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();
//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Login User
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }
//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Get User
// router.get('/user', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();


// Register
router.post('/signup', async (req, res) => {
  const { center, email, password } = req.body;
  console.log(req.body)
  try {
      const userExists = await Admin.findOne({ email });
      console.log(userExists)
      if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
      }

      const admin = new Admin({
          center,
          email,
          password
      });

      const res = await admin.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1h'
      });
      console.log(token)
      res.status(201).json({ "message":"saved"});
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});

// login
router.post('/signin', async (req, res) => {
  const { option, email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      admin: {
        id: admin.id,
        center: admin.center,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Error during sign-in:', error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
