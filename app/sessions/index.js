const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

//session
const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'test_teacher',
};

const sessionStore = new MySQLStore(options);

const setSession = () => {
  return session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, //неделя куков
  });
};

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
module.exports = { setSession };
