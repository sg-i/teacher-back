module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define('news', {
    authorFirstName: {
      type: Sequelize.STRING,
    },
    authorLastName: {
      type: Sequelize.STRING,
    },
    authorPatronymic: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.TEXT,
    },
  });

  return News;
};
