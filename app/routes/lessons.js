// news.js
const express = require('express');
const db = require('../models/index.js');
const Lessons = db.lesson;
const Subjects = db.subject;
const Teacher = db.teacher;
const Classname = db.class;
const Classroom = db.classroom;
const router = express.Router();

function groupByDayOfWeek(array) {
  let result = {
    Понедельник: [],
    Вторник: [],
    Среда: [],
    Четверг: [],
    Пятница: [],
    Суббота: [],
  };

  array.forEach((obj) => {
    if (obj.dataValues.hasOwnProperty('dayOfWeek')) {
      const dayOfWeek = obj.dataValues['dayOfWeek'];
      if (dayOfWeek in result) {
        result[dayOfWeek].push(obj.dataValues);
      }
    }
  });
  return result;
}

router.get('/', function (req, res) {
  try {
    if (req.isAuthenticated()) {
      const teacher = req.query.teacher;
      const classname = req.query.classname;

      let searchConditions = {};

      if (teacher) {
        searchConditions.teacherId = teacher.value;
      }

      if (classname && classname.value != -1) {
        searchConditions.classId = classname.value;
      }

      Lessons.findAll({
        where: searchConditions,
        order: [
          ['dayOfWeek', 'DESC'],
          ['lessonNumber', 'ASC'],
        ],
        include: [
          {
            model: Subjects,
            attributes: ['name'],
          },
          {
            model: Teacher,
            attributes: ['name'],
          },
          {
            model: Classname,
            attributes: ['number'],
          },
          {
            model: Classroom,
            attributes: ['number'],
          },
        ],
        attributes: {
          exclude: ['subjectId', 'teacherId', 'classId', 'classroomId'], // Исключаем поле subjectId из результата
        },
      }).then(function (lessons) {
        const groupedData = groupByDayOfWeek(lessons);
        res.send(groupedData);
      });
    } else {
      res.send('Вы не имеете доступа к этой информации.');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
