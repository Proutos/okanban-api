const Sequelize = require('sequelize');
const db = require('../db');

class Card extends Sequelize.Model {

};

Card.init({
  title: Sequelize.TEXT,
  color: Sequelize.INTEGER,
  position: Sequelize.INTEGER,
  list_id: Sequelize.INTEGER
}, {
  sequelize: db,
  tableName: "card",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Card; 