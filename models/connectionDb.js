const { Sequelize } = require("sequelize");
require("dotenv").config();

const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: 0,
};

const sequelize = new Sequelize(config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
