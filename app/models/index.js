const config = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.news = require('../models/news.model.js')(sequelize, Sequelize);

const lessonsModelObj = require('../models/lessons.model.js')(sequelize, Sequelize);
db.subject = lessonsModelObj.Subject;
db.teacher = lessonsModelObj.Teacher;
db.class = lessonsModelObj.Class;
db.classroom = lessonsModelObj.Classroom;
db.lesson = lessonsModelObj.Lesson;

module.exports = db;
