require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var crypto = require('crypto');
var LocalStrategy = require('passport-local').Strategy;
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

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString(process.env.cryptoWord);
  return hash === hashVerify;
}
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString(process.env.cryptoWord);
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString(process.env.cryptoWord);

  return {
    salt: salt,
    hash: genHash,
  };
}

passport.use(
  new LocalStrategy(function (username, password, cb) {
    console.log('loc strateg');
    User.findOne({
      where: {
        username: username,
      },
    })
      .then((user) => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect name' });
        }

        // Function defined at bottom of app.js
        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: 'Incorrect password' });
        }
      })
      .catch((err) => {
        cb(err);
      });
  }),
);
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(function (user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

//session
const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'test_teacher',
};

const sessionStore = new MySQLStore(options);
app.use(
  session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, //неделя куков
  }),
);
sessionStore
  .onReady()
  .then(() => {
    // MySQL session store ready for use.
    console.log('MySQLStore ready');
  })
  .catch((error) => {
    // Something went wrong.
    console.error(error);
  });
// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

//
app.use(passport.initialize());
app.use(passport.session());

//проверка аутентификации
app.get('/api/auth/checkAuth', function (req, res) {
  console.log('get checkauth');
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.send({ authenticated: true, user: req.user.username, role: req.user.role });
  } else {
    res.send({ authenticated: false });
  }
});
//авторизация
app.post(
  '/api/auth/signin',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
  }),
  (err, req, res, next) => {
    if (err) next(err);
  },
);
//регистрация(роль учитель)
app.post('/api/auth/signup', (req, res, next) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  User.create({
    username: req.body.username,
    role: 'teacher',
    hash: hash,
    salt: salt,
  });
  //   const newUser = new User({
  //     username: req.body.username,
  //     hash: hash,
  //     salt: salt,
  //   });
  //   newUser.save().then((user) => {
  //     console.log(user);
  //   });
  console.log('user created');
  //   res.redirect('/login');
  res.send('autho ok');
});
//выход из аккаунта
app.get('/api/auth/logout', (req, res, next) => {
  console.log('was logout');
  req.logOut();
  res.send('was logout');
});
//получение новостей
app.get('/api/news', function (req, res) {
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
//добавление новости (админ)
app.post('/api/news/add', (req, res, next) => {
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
//удаление новости
app.post('/api/news/delete', (req, res, next) => {
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
