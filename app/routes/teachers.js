// news.js
const express = require('express');
const db = require('../models');
const Teacher = db.teacher;
const Class = db.class;

const router = express.Router();

router.get('/', function (req, res) {
  try {
    if (req.isAuthenticated()) {
     
      let sad = {};
      try {
        Teacher.findAll({
          order: [['name']],
        }).then(function (teacher) {
          sad['teacher'] = teacher;
          Class.findAll({
            order: [['number']],
          }).then(function (classname) {
            sad['class'] = classname;
            res.send(sad);
          });
        });
      } catch (error) {
        res.send({ error });
      }
    } else {
      res.send('Вы не имеете доступа к этой информации.');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
