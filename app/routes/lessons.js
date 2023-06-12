// news.js
const express = require('express');
const db = require('../models');
const Lessons = db.lesson;

const router = express.Router();

router.get('/', function (req, res) {
  //   console.log('get checkauth');
  //   console.log(req.isAuthenticated());
  //   if (req.isAuthenticated()) {
  //     Lessons.findAll({
  //       order: [['id', 'DESC']],
  //     }).then(function (news) {
  //       res.send({ news });
  //     });
  //   } else {
  //     res.send('Вы не имеете доступа к этой информации.');
  //   }
  console.log('лессон');
  console.log(req.query);
  res.send(req.query);
});

module.exports = router;
