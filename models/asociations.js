const List = require("./list");
const Task = require("./task");

List.hasMany(Task, {
    foreignKey: "listId",
});

Task.belongsTo(List, {
    foreignKey: "listId",
});
