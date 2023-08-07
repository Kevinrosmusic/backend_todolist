const express = require("express");
const { getList, getListById, addTask, updateTask, deleteList } = require("../controllers/lists");
const { validarJWT } = require("../middlewares/validation-jwt");

const router = express.Router();

router.get("/:uid", validarJWT, getList);

router.get("/get/:id", validarJWT, getListById);

router.post("/task/create", validarJWT, addTask);

router.put("/task/update/:id", validarJWT, updateTask);

router.delete("/delete/:id", validarJWT, deleteList);

module.exports = router;
