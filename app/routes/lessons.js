// news.js
const express = require('express');
const db = require('../models');
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
    // console.log('obj', obj.dataValues);
    if (obj.dataValues.hasOwnProperty('dayOfWeek')) {
      const dayOfWeek = obj.dataValues['dayOfWeek'];
      console.log(dayOfWeek);
      if (dayOfWeek in result) {
        result[dayOfWeek].push(obj.dataValues);
      }
    }
  });
  // console.log(result);
  return result;
}

router.get('/', function (req, res) {
  console.log('get checkauth');
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    const teacher = req.query.teacher;
    const classname = req.query.classname;

    let searchConditions = {};
    console.log('t', req.query.teacher);
    console.log('c', req.query.classname);

    if (teacher) {
      searchConditions.teacherId = teacher.value;
    }

    if (classname && classname.value != -1) {
      searchConditions.classId = classname.value;
    }

    console.log('запрос', searchConditions);
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
});

module.exports = router;
