// news.js
const express = require('express');
const db = require('../models');
const News = db.news;

const router = express.Router();

router.get('/', function (req, res) {
  console.log('get checkauth');
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    News.findAll({
      order: [['id', 'DESC']],
    }).then(function (news) {
      res.send({ news });
    });
  } else {
    res.send('Вы не имеете доступа к этой информации.');
  }
});

router.post('/add', (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      newNews = {
        authorFirstName: req.body.firstname,
        authorLastName: req.body.lastname,
        authorPatronymic: req.body.patrotymic,
        text: req.body.text,
      };
      News.create(newNews);
      res.send(newMews);
    } else {
      res.send('Вы не можете добавлять новости.');
    }
  } catch (error) {
    res.send('Какая-то ошибка.');
  }
});

router.post('/delete', (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      News.destroy({
        where: {
          id: req.body.id,
        },
      });
      res.send({ message: 'успех', dltId: req.body.id });
    } else {
      res.send('Вы не можете удалять новости.');
    }
  } catch (error) {
    res.send('Какая-то ошибка.');
  }
});

module.exports = router;
