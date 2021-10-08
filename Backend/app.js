require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

var ruta_project = require('./Rutas/ruta_project');

/**  RUTAS **/
const plantas = require("./Rutas/ruta_planta");
app.use("/plantas", plantas);
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// app.use("/public", express.static(`${__dirname}/storage`));
/**  Gestión de errores **/
// Si no encuentra las rutas.
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); //una vez subido a produccion en la nube se debe de cambiar el asterisco por las urls permitidas
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
	res.status(404);
	res.send("No se encontró nada");
});

app.use('/api', ruta_project);

app.use((error, req, res, next) => {
	if (res.headersSent) {
		// Si ya se ha enviado una respuesta desde el servidor
		return next(error); // seguimos para adelante
	}
	res.status(error.code || 500); // Proporciona código de error y si no hay proporciona el código 500.
	res.json({
		mensaje: error.message || "Ha ocurrido un error desconocido",
	});
});

// Conexión al servidor de MongoDB y, si tiene éxito, al servidor de express
mongoose
.connect(process.env.MONGO_DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
	app.listen(process.env.PORT, () => console.log("Escuchando en puerto 5000"));
})
.catch((error) => console.log(error));



module.exports = app;