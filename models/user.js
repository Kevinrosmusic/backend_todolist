const { DataTypes } = require("sequelize");
const db = require("./connectionDb");

const User = db.sequelize.define("users", {
    id: {
        type: DataTypes.STRING(256),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(150),
    },
    email: {
        type: DataTypes.STRING(256),
    },
    password: {
        type: DataTypes.STRING(256),
    },
});

module.exports = User;
