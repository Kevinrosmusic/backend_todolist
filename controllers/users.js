const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const List = require("../models/list");

const setRegister = async (req, res = response) => {
    const { name, email, password } = req.body;
    console.log(email);

    try {
        let user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user) {
            console.log("encontrado");
            return res.status(400).json({
                ok: false,
                msg: "The mail is already registered",
            });
        } else {
            console.log("entre");
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            const data = {
                id: uuidv4(),
                name,
                email,
                password: hash,
            };

            user = new User(data);
            user.save();

            res.status(200).json({
                ok: true,
                msg: "User created successfully",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "An unexpected error has occurred",
        });
    }
};

const setLogin = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user) {
            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                res.status(500).json({
                    ok: true,
                    msg: "Incorrect credentials",
                });
            } else {
                const token = await generateJWT(user.id, user.name);

                res.status(200).json({
                    ok: true,
                    uid: user.id,
                    name: user.name,
                    token,
                });
            }
        } else {
            res.status(500).json({
                ok: true,
                msg: "User does not exist",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "An unexpected error has occurred",
        });
    }
};

const createTodoList = async (req, res = response) => {
    const { name, uid } = req.body;

    try {
        const data = {
            id: uuidv4(),
            name,
            uid: uid,
        };
        const todoList = new List(data);
        await todoList.save();

        res.status(200).json({
            ok: true,
            msg: "To Do List created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "An unexpected error has occurred",
        });
    }
};

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const name = req.name;

    const token = await generateJWT(uid, name);

    res.status(200).json({
        ok: true,
        uid,
        name,
        token,
    });
};

module.exports = {
    setRegister,
    setLogin,
    renewToken,
    createTodoList,
};
