const express = require("express");
const { setRegister, setLogin, renewToken, createTodoList } = require("../controllers/users");
const { check } = require("express-validator");
const { validationFields } = require("../middlewares/validationFields");
const { validarJWT } = require("../middlewares/validation-jwt");

const router = express.Router();

router.post(
    "/register",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El correo es obligatorio").not().isEmpty(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check("confirmPassword", "La confirmación de contraseña es obligatoria").not().isEmpty(),
        validationFields,
    ],
    setRegister
);

router.post("/login", setLogin);

router.get("/renew", validarJWT, renewToken);

router.post("/list/create", [check("name", "El nombre es obligatorio").not().isEmpty(), validationFields], validarJWT, createTodoList);

module.exports = router;
