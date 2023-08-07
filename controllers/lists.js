const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const List = require("../models/list");
const Task = require("../models/task");

const getList = async (req, res = response) => {
    const { uid } = req.params;

    try {
        const lists = await List.findAll({
            where: {
                uid,
            },
            attributes: {
                exclude: ["uid", "createdAt", "updatedAt"],
            },
        });

        res.status(200).json({
            ok: true,
            lists,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getListById = async (req, res = response) => {
    const { id } = req.params;

    try {
        const list = await List.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Task,
                    // attributes: {
                    //     exclude: ["userId", "id", "createdAt", "updatedAt"],
                    // },
                },
            ],
        });

        res.status(200).json({
            ok: true,
            list,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const addTask = async (req, res = response) => {
    const { listId, task } = req.body;
    try {
        const data = {
            id: uuidv4(),
            listId: listId,
            title: task,
            done: false,
        };

        newTask = new Task(data);
        await newTask.save();

        res.status(200).json({
            ok: true,
            msg: "Tarea creada exitosamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateTask = async (req, res = response) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({
            where: {
                id,
            },
        });

        task.done = !task.done;
        await task.save();

        res.status(200).json({
            ok: true,
            msg: "Tarea actualizada exitosamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deleteList = async (req, res = response) => {
    const { id } = req.params;

    try {
        const list = await List.findOne({
            where: {
                id,
            },
        });

        const tasks = await Task.findAll({
            where: {
                listId: id,
            },
        });

        tasks.forEach(async (task) => {
            await task.destroy();
        });

        await list.destroy();
        res.status(200).json({
            ok: true,
            msg: "Lista eliminada exitosamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

module.exports = {
    getList,
    getListById,
    addTask,
    updateTask,
    deleteList,
};
