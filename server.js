require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('./app/routes/auth');
const newsRoutes = require('./app/routes/news');
const lessonsRoutes = require('./app/routes/lessons');
const teachersRoutes = require('./app/routes/teachers');
const swapsRoutes = require('./app/routes/swaps');
const pdfsRoutes = require('./app/routes/pdfs');
const usersRoutes = require('./app/routes/users');
//import sessions
const { setSession } = require('./app/sessions');

const PORT = process.env.HOST;

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

//db
const db = require('./app/models');

db.sequelize.sync();

app.use(setSession());
app.use(authRoutes.passport.initialize());
app.use(authRoutes.passport.session());

// Import and use routes
app.use('/api/auth', authRoutes.router);
app.use('/api/news', newsRoutes);
app.use('/api/shedule', lessonsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/swaps', swapsRoutes);
app.use('/api/docs', pdfsRoutes);
app.use('/api/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
