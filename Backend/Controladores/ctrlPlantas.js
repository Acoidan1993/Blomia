const mongoose = require("mongoose");
const Plantas = require("../Modelos/plantas");

const agregarNuevaPlanta = async (req, res, next) => {
	try {
		//Buscamos la planta por si ya existe
		respuesta = await Plantas.findOne({ Nombre: req.body.Nombre });
	} catch (error) {
		E = new Error("Fallo en la busqueda");
		E.code = 422;
		return next(E);
	}

	const nuevaPlanta = new Plantas(req.body);
	if (respuesta) {
		E = new Error("Ya existe esta planta");
		E.code = 422;
		return next(E);
	} else {
		try {
			await nuevaPlanta.save();
		} catch (error) {
			console.log(error)
			E = new Error("No se pudo guardar");
			E.code = 500;
			return next(E);
		}
	}
	res.json({ nuevaPlanta });
};



const obtenerPlantas = async (req, res, next) => {
	try {
		respuesta = await Plantas.find({});
	} catch (error) {
		E = new Error("Fallo en la busqueda");
		E.code = 422;
		return next(E);
	}
	res.json({ respuesta });
};




const obtenerPlantaPorNombre = async (req, res, next) => {
	try {
		respuesta = await Plantas.findOne({ Nombre: req.params.nombre });
	} catch (error) {
		E = new Error("Fallo en la busqueda");
		E.code = 422;
		return next(E);
	}
	respuesta ? res.json({ respuesta }) : res.send("No se encontró esta planta");
};




const eliminarPlanta = async (req, res, next) => {
	const idPlanta = req.params._id;
	try {
		elimina = await Plantas.findById(idPlanta);
	} catch (error) {
		E = new Error("Fallo en la busqueda");
		E.code = 404;
		return next(E);
	}
	try{
		await elimina.remove();
	}catch (error) {
	E = new Error("Fallo al eliminar");
	E.code = 404;
	return next(E);
	}
	res.send("Planta eliminada");
};




const cambiarActivo = async (req, res, next) => {
	try {
		respuesta = await Plantas.findById(req.params);
	} catch (error) {
		E = new Error("Fallo en la busqueda. Intentalo otra vez");
		E.code = 404;
		return next(E);
	}
	try {
		respuesta.Activo = !respuesta.Activo;
		respuesta.save();
	} catch (error) {
		E = new Error("No se pudo guardar. Intentalo de nuevo");
		E.code = 500;
		return next(E);
	}
	// res.json({ respuesta });
	res.send(`Actualizado: Activo = ${respuesta.Activo}`);
};


const modificarPlanta = async (req, res, next) => {
	const { Nombre, Referencia, Tamaño, Stock, Activo, Tipo, Precio } = req.body;
	const nombrePlanta = req.params.Nombre;
	let planta;
	try {
		planta = await Plantas.findOne({nombre: {$eq: nombrePlanta}});
	} catch (error) {
		const err = new Error(
			'Ha habido algún problema. No se ha podido actualizar la información de la planta'
		);
		err.code = 500;
		return next(err);
	}

	// if (planta.creador.toString() !== req.userData.userId) {
	// 	const err = new Error('No tiene permiso para modificar esta planta');
	// 	err.code = 401; // Error de autorización
	// 	return next(err);
	// }


	planta = Object.assign(planta, req.body);
	// planta.Nombre = Nombre;
	// planta.descripcion = descripcion;

	try {
		planta.save();
	} catch (error) {
		const err = new Error(
			'Ha habido algún problema. No se ha podido guardar la información actualizada'
		);
		err.code = 500;
		return next(err);
	}

	res.status(200).json({
		planta,
	});
};



/*****************************************
 * TODO
 * Metodos:

 * - Modificar planta (revisar)
 */
exports.agregarNuevaPlanta = agregarNuevaPlanta;
exports.obtenerPlantas = obtenerPlantas;
exports.obtenerPlantaPorNombre = obtenerPlantaPorNombre;
exports.eliminarPlanta = eliminarPlanta;
exports.cambiarActivo = cambiarActivo;
exports.modificarPlanta = modificarPlanta;