const config = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  timezone: config.timezone,
 
});
sequelize
  .query('SELECT @@session.time_zone')
  .then((result) => {
    const timeZone = result[0][0]['@@session.time_zone'];
    console.log('Часовой пояс Sequelize:', timeZone);
  })
  .catch((error) => {
    console.error('Ошибка при получении часового пояса Sequelize:', error);
  });
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.news = require('./news.model.js')(sequelize, Sequelize);
db.subject = require('./subject.model.js')(sequelize, Sequelize);
db.teacher = require('./teacher.model.js')(sequelize, Sequelize);
db.class = require('./class.model.js')(sequelize, Sequelize);
db.classroom = require('./classroom.model.js')(sequelize, Sequelize);
db.lesson = require('./lesson.model.js')(sequelize, Sequelize);
db.swaps = require('./swaps.model.js')(sequelize, Sequelize);
db.pdf = require('./pdf.model.js')(sequelize, Sequelize);

module.exports = db;
