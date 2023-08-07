const express = require("express");
const { sequelize } = require("./models/connectionDb");
const cors = require("cors");
require("dotenv").config();
require("./models/asociations");

//Acceso a Express
const app = express();

//Middlewares
app.use(cors());

//Directorio Público
app.use(express.static("public"));
app.use(express.json());

//Rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/lists", require("./routes/lists"));

//Servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);

    sequelize
        .authenticate()
        .then(() => {
            console.log("La conexión a la base de datos se ha establecido correctamente");
        })
        .catch((err) => {
            console.log("No se ha podido conectar a la base de datos:", err);
        });
});
