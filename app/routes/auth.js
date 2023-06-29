// auth.js
const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const User = db.user;

const router = express.Router();

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

router.post(
  '/signin',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
  }),
  (err, req, res, next) => {
    if (err) next(err);
  },
);

router.post('/signup', (req, res, next) => {
  try {
    if (req.user.role === 'superadmin') {
      const saltHash = genPassword(req.body.password);

      const salt = saltHash.salt;
      const hash = saltHash.hash;
      User.create({
        username: req.body.username,
        role: req.body.role,
        hash: hash,
        salt: salt,
      });
      res.send('autho ok');
    } else {
      res.send('У вас нет прав');
    }
  } catch (error) {
    console.log(error);
  }
});
router.post('/editpassword', function (req, res) {
  try {
    if (req.user.role === 'superadmin') {
      const userId = req.body.userId;
      const newPassword = req.body.newPassword;
      const currentPassword = req.body.currentPassword;

      User.findOne({
        where: {
          id: userId,
        },
      })
        .then((user) => {
          if (!user) {
            res.send('Пользователь не найден.');
          } else {
            const isValid = validPassword(currentPassword, user.hash, user.salt);
            if (isValid) {
              const saltHash = genPassword(newPassword);

              const salt = saltHash.salt;
              const hash = saltHash.hash;

              user
                .update({
                  hash: hash,
                  salt: salt,
                })
                .then(() => {
                  res.send('Пароль успешно изменен.');
                })
                .catch((err) => {
                  console.log(err);
                  res.send('Ошибка при изменении пароля.');
                });
            } else {
              res.send('Неверный текущий пароль.');
            }
          }
        })
        .catch((err) => {
          console.log(err);
          res.send('Ошибка при поиске пользователя.');
        });
    } else {
      res.send('У вас нет прав.');
    }
  } catch (error) {
    console.log(error);
  }
});
router.get('/logout', (req, res, next) => {
  try {
    req.logOut();
    res.send('was logout');
  } catch (error) {
    console.log(error);
  }
});
router.get('/checkAuth', function (req, res) {
  try {
    if (req.isAuthenticated()) {
      res.send({ authenticated: true, user: req.user.username, role: req.user.role });
    } else {
      res.send({ authenticated: false });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { router, passport };
