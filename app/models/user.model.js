module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
    hash: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
