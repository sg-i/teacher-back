require('dotenv').config();

const express = require('express');
const cors = require('cors');
// Import routes
const authRoutes = require('./app/routes/auth');
const newsRoutes = require('./app/routes/news');
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

db.sequelize.sync();
const newsInitial = require('./initialNews.js');

// тесты для news
// console.log('new', newsInitial);
// News.create(newsInitial.News[0]);
// News.create(newsInitial.News[1]);
// News.create(newsInitial.News[2]);

app.use(setSession());
app.use(authRoutes.passport.initialize());
app.use(authRoutes.passport.session());

// Import and use routes
app.use('/api/auth', authRoutes.router);
app.use('/api/news', newsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
