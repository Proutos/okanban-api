const Sequelize = require('sequelize');
const db = require('../db');

class List extends Sequelize.Model {

};

List.init({
    name: Sequelize.TEXT,
    position: Sequelize.INTEGER
}, {
    sequelize: db,
    tableName: "list",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = List;