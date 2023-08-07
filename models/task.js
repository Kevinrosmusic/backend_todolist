const { DataTypes } = require("sequelize");
const db = require("./connectionDb");

const Task = db.sequelize.define("tasks", {
    id: {
        type: DataTypes.STRING(256),
        primaryKey: true,
    },
    listId: {
        type: DataTypes.STRING(150),
    },
    title: {
        type: DataTypes.STRING(256),
    },
    done: {
        type: DataTypes.BOOLEAN,
    },
});

module.exports = Task;
