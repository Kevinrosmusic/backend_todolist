const { DataTypes } = require("sequelize");
const db = require("./connectionDb");

const List = db.sequelize.define("lists", {
    id: {
        type: DataTypes.STRING(256),
        primaryKey: true,
    },
    uid: {
        type: DataTypes.STRING(150),
    },
    name: {
        type: DataTypes.STRING(256),
    },
});

module.exports = List;
