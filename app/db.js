const sequelize = require('sequelize');

const dbConnection = new sequelize.Sequelize(process.env.PG_URL, {
    dialect: 'postgres'
});

module.exports = dbConnection;