import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import 'react-toastify/dist/ReactToastify.css';
import "./Formulario.css";


 function Formulario(props) {

  const añadirPlanta = props.añadirPlanta;
  const [error, setError] = useState("");


  const [Foto, setFoto] = useState("")
  const [Nombre, setNombre] = useState("");
  const [Referencia, setReferencia] = useState("");
  const [Tamaño, setTamaño] = useState("");
  const [Stock, setStock] = useState("");
  const [Activo, setActivo] = useState("");
  const [Tipo, setTipo] = useState("");
  const [Precio, setPrecio] = useState("");


    const gestorFoto = (e)=>{
        setFoto(e.target.value);
    }
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
      // Hola Aco
        if(e.target.checked === true){
          setActivo("Si");
        }else{
          setActivo("No");
        }
        console.log(Activo);
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
        

      if(Foto === ""|| Nombre === ""|| Referencia === ""|| Tamaño === ""|| Stock === ""|| Tipo === ""|| Precio === ""){
        setError(true);
        console.log("hay error")
        return;
    }

    const plantas = {
        Foto: Foto,
        Nombre: Nombre,
        Referencia: Referencia,
        Tamaño: Tamaño,
        Stock: Stock,
        Activo: Activo,
        Tipo: Tipo,
        Precio: Precio,
    }
    añadirPlanta(plantas);

    setFoto("");
    setNombre("");
    setReferencia("");
    setTamaño("");
    setStock("");
    setActivo("");
    setTipo("");
    setPrecio("");

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
          {error ? (<div className="divError">
            <p className="mensajeError">Debe completar todos los campos</p>
          </div>) : null}
      <form type="" onSubmit={submit} encType="multipart/form-data" className="formulario bg-success mb-3" >
        <h2 className="tituloTarjeta">Crear Nueva Planta</h2>
      <label for="File">Seleccione imagen de planta</label>
	    <input type="text" id="imageFile"accept="image/*" onChange={gestorFoto} value={Foto} required className="form-control"/>
      <input type="text" placeholder="Nombre" onChange={gestorNombre} value={Nombre} required className="form-control"/>
      <input type="text" placeholder="Referencia" onChange={gestorReferencia} value={Referencia} required className="form-control"/>
      <input type="text" placeholder="Tamaño" onChange={gestorTamaño} value={Tamaño}required className="form-control"/>
      <input type="number" placeholder="Stock" onChange={gestorStock} value={Stock} required className="form-control"/>
      <label for="CheckBox">Marcar si la planta esta Activa</label>
      <input type="checkbox" placeholder="Activo" id="checkbox" onChange={gestorActivo} value={Activo}/>

      {/* este input precio es de prueba--------------------------------------------------------------- */}
      <input type="text" placeholder="Tipo" onChange={gestorTipo} value={Tipo} required className="form-control"/>
      <input type="number" placeholder="Precio" step="0.01" onChange={gestorPrecio} value={Precio} required className="form-control"/>
      
      <button type="submit" className="btn btn-success" onClick={success}>ENVIAR</button>
    </form>  
    <div>    
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
      </div>    
    </div>
  );
}

export default Formulario;