import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Formulario.css";


 function Formulario(props) {

  const añadirPlanta = props.añadirPlanta;
  const [error, setError] = useState("");


//   const [Imagen, setImagen] = useState("")
  const [Nombre, setNombre] = useState("");
  const [Referencia, setReferencia] = useState("");
  const [Tamaño, setTamaño] = useState("");
  const [Stock, setStock] = useState("");
  const [Activo, setActivo] = useState("");
  const [Tipo, setTipo] = useState("");
  const [Precio, setPrecio] = useState("");

    // const gestorImagen = (e)=>{
    //     setImagen(e.target.value);
    // }
    const gestorNombre = (e)=>{
        setNombre(e.target.value);
    }
    const gestorReferencia = (e)=>{
        setReferencia(e.target.value);
    }
    const gestorTamaño = (e)=>{
        setTamaño(e.target.value);
    }
    const gestorStock = (e)=>{
        setStock(e.target.value);
    }
    const gestorActivo = (e)=>{
        setActivo(e.target.value);
    }
    const gestorTipo = (e)=>{
        setTipo(e.target.value);
    }
    const gestorPrecio = (e)=>{
        setPrecio(e.target.value);
    }

  // ----------------------------Funcion Submit---------------------------------

  const submit = (e)=>{
      e.preventDefault();
      setError(false);
        // Imagen === ""||

      if(Nombre === ""||Referencia === ""|| Tamaño === ""|| Stock === ""|| Activo === ""|| Tipo === ""|| Precio === ""){
        setError(true);
        return;
    }

    const plantas = {
        // Imagen: Imagen,
        Nombre: Nombre,
        Referencia: Referencia,
        Tamaño: Tamaño,
        Stock: Stock,
        Activo: Activo,
        Tipo: Tipo,
        Precio: Precio,
    }
    añadirPlanta(plantas);

    // setImagen("");
    setNombre("");
    setReferencia("");
    setTamaño("");
    setStock("");
    setActivo("");
    setTipo("");
    Precio("");

    console.log(error)
  }

    const success = () => 
    toast.success('PLANTA CREADA CON EXITO', {
        position: "top-center",
        type: "success",
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;
  
  return (
      <div className="cuerpo">
    <form onSubmit={submit} className="formulario bg-success mb-3" >
        <h2 className="tituloTarjeta">Crear Nueva Planta</h2>
      <label for="File">Seleccione imagen de planta</label>
	  {/* <input type="file" id="imageFile" accept="image/*" onChange={gestorImagen} required className="form-control"/> */}
      <input type="text" placeholder="Nombre" onChange={gestorNombre} required className="form-control"/>
      <input type="text" placeholder="Referencia" onChange={gestorReferencia} required className="form-control"/>
      <input type="text" placeholder="Tamaño" onChange={gestorTamaño} required className="form-control"/>
      <input type="number" placeholder="Stock" onChange={gestorStock} required className="form-control"/>
      <label for="CheckBox">Marcar si la planta esta Activa</label>
      <input type="checkbox" placeholder="Activo" id="checkbox" onChange={gestorActivo}/>

      {/* este input precio es de prueba--------------------------------------------------------------- */}
      <input type="number" placeholder="Precio" onChange={gestorPrecio} required className="form-control"/>

      {/* <input type="number" placeholder="Lista 1"/>
      <input type="text" placeholder="Lista 2" />
      <input type="text" placeholder="Lista 3" />
      <input type="text" placeholder="Lista 4" /> Implementar las listas de precios--------------------------------------------------------------------- */}
      <input type="text" placeholder="Tipo" onChange={gestorTipo} required className="form-control"/>
      {/* falta input listaPrecio */}
      <input type="submit" className="btn btn-success" onClick={success}></input>
      <ToastContainer 
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
    </form>
    </div>
  );
}

export default Formulario;