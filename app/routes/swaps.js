// swaps.js
const express = require('express');
const db = require('../models');
const { Op } = require('sequelize');
const Swaps = db.swaps;
const Teachers = db.teacher;

const router = express.Router();

router.get('/', function (req, res) {
  try {

    if (req.isAuthenticated()) {
      const teacher = req.query.teacher;

      let searchConditions = {};

      if (teacher && teacher.value != -1) {
        searchConditions = {
          [Op.or]: [
            { newPeople: { [Op.eq]: Number(teacher.value) } },
            { oldPeople: { [Op.eq]: Number(teacher.value) } },
          ],
        };
      }

      Swaps.findAll({
        where: searchConditions,
        order: [['dateForSwap', 'DESC']],
        include: [
          { model: Teachers, as: 'oldTeacher', attributes: ['id', 'name'] },
          { model: Teachers, as: 'newTeacher', attributes: ['id', 'name'] },
        ],

        attributes: {
          exclude: ['newPeople', 'oldPeople'], // Исключаем поле subjectId из результата
        },
      }).then(function (swaps) {
        function groupByDate(teachersArray) {
          const groupedTeachers = {};

          teachersArray.forEach((teacher) => {
            const date = new Date(teacher.dateForSwap).toLocaleDateString();
            if (!groupedTeachers[date]) {
              groupedTeachers[date] = [];
            }
            groupedTeachers[date].push(teacher);
          });

          return Object.entries(groupedTeachers).map(([date, swaps]) => ({
            date,
            swaps,
          }));
        }

        const groupedByDate = groupByDate(swaps);
        res.send(groupedByDate);
      });
    } else {
      res.send('Вы не имеете доступа к этой информации.');
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/add', (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      newSwap = {
        dateForSwap: req.body.date,
        dayOfWeek: req.body.dayOfWeek,
        oldPeople: req.body.oldPeople.value,
        newPeople: req.body.newPeople.value,
      };
      Swaps.create(newSwap);
      res.send(newSwap);
    } else {
      res.send('Вы не можете добавлять замены.');
    }
  } catch (error) {
    res.send('Какая-то ошибка.');
  }
});

router.post('/delete', (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      Swaps.destroy({
        where: {
          id: req.body.id,
        },
      });
      res.send({ message: 'успех', dltId: req.body.id });
    } else {
      res.send('Вы не можете удалять замены.');
    }
  } catch (error) {
    res.send('Какая-то ошибка.');
  }
});

module.exports = router;
