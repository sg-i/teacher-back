// news.js
const express = require('express');
const db = require('../models');
const User = db.user;

const router = express.Router();

router.get('/all', function (req, res) {
  try {
    if (req.user.role === 'superadmin') {
      User.findAll().then(function (users) {
        res.send(users);
      });
    } else {
      res.send('Вы не можете просматривать пользователей.');
    }
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
