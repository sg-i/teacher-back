require('dotenv').config();

const express = require('express');
const cors = require('cors');
// Import routes
const authRoutes = require('./app/routes/auth');
const newsRoutes = require('./app/routes/news');
const lessonsRoutes = require('./app/routes/lessons');
const teachersRoutes = require('./app/routes/teachers');
//import sessions
const { setSession } = require('./app/sessions');

const PORT = process.env.HOST;

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

//db
const db = require('./app/models');
const User = db.user;
const News = db.news;
// для расписания
const Teachers = db.teacher;
const Subject = db.subject;
const Classrooms = db.classroom;
const Classes = db.class;
const Lessons = db.lesson;

db.sequelize.sync();
const newsInitial = require('./initialNews.js');
const testShedule = require('./testShedule.js');
// тесты для news
// console.log('new', newsInitial);
// News.create(newsInitial.News[0]);
// News.create(newsInitial.News[1]);
// News.create(newsInitial.News[2]);

// тесты для shedule
// testShedule.teachers.forEach((element) => {
//   Teachers.create(element);
// });
// testShedule.subjects.forEach((element) => {
// Subject.create(element);
// });
// for (let i = 1; i < 100; i++) {
//   Classrooms.create({ number: i });
// }
// testShedule.classes.forEach((element) => {
//   Classes.create(element);
// });
// testShedule.lessons.forEach((element) => {
//   Lessons.create(element);
// });

app.use(setSession());
app.use(authRoutes.passport.initialize());
app.use(authRoutes.passport.session());

// Import and use routes
app.use('/api/auth', authRoutes.router);
app.use('/api/news', newsRoutes);
app.use('/api/shedule', lessonsRoutes);
app.use('/api/teachers', teachersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
