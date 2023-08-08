const express = require("express");
const { setRegister, setLogin, renewToken, createTodoList } = require("../controllers/users");
const { check } = require("express-validator");
const { validationFields } = require("../middlewares/validationFields");
const { validarJWT } = require("../middlewares/validation-jwt");

const router = express.Router();

router.post(
    "/register",
    [
        check("name", "name is required").not().isEmpty(),
        check("email", "email is required").not().isEmpty(),
        check("password", "password is required").not().isEmpty(),
        check("confirmPassword", "repeat password is required").not().isEmpty(),
        validationFields,
    ],
    setRegister
);

router.post("/login", setLogin);

router.get("/renew", validarJWT, renewToken);

router.post("/list/create", [check("name", "name is required").not().isEmpty(), validationFields], validarJWT, createTodoList);

module.exports = router;
