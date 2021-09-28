import React from 'react';
import { useState } from 'react';
import "./Formulario.css";


 function Formulario(props) {

  const añadirPlanta = props.añadirPlanta;
  const [error, setError] = useState("");


  const [Imagen, setImagen] = useState("")
  const [Nombre, setNombre] = useState("");
  const [Referencia, setReferencia] = useState("");
  const [Tamaño, setTamaño] = useState("");
  const [Stock, setStock] = useState("");
  const [Activo, setActivo] = useState("");
  const [Tipo, setTipo] = useState("");
//   const [ListaPrecio, setListaPrecio] = useState("");

    const gestorImagen = (e)=>{
        setImagen(e.target.value);
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
        setActivo(e.target.value);
    }
    const gestorTipo = (e)=>{
        setTipo(e.target.value);
    }
    // const gestorListaPrecio = (e)=>{
    //     setListaPrecio(e.target.value);
    // }

  // ----------------------------Funcion Submit---------------------------------

  const submit = (e)=>{
      e.preventDefault();
      setError(false);

// || ListaPrecio === "" añadir esto abajo

      if(Imagen === ""||Nombre === ""||Referencia === ""|| Tamaño === ""|| Stock === ""|| Activo === ""|| Tipo === ""){
        setError(true);
        return;
    }

    const plantas = {
        Imagen: Imagen,
        Nombre: Nombre,
        Referencia: Referencia,
        Tamaño: Tamaño,
        Stock: Stock,
        Activo: Activo,
        Tipo: Tipo,
        // ListaPrecio: ListaPrecio,
    }
    añadirPlanta(plantas);

    setImagen("");
    setNombre("");
    setReferencia("");
    setTamaño("");
    setStock("");
    setActivo("");
    setTipo("");
    // setListaPrecio("");

    console.log(error)
  }
  
  return (
    <form onSubmit={submit} className="formulario">
      <label for="File">Seleccione imagen de planta</label>
	  <input type="file" id="imageFile" accept="image/*" onChange={gestorImagen} required/>
      <input type="text" placeholder="Nombre" onChange={gestorNombre} required/>
      <input type="text" placeholder="Referencia" onChange={gestorReferencia} required/>
      <input type="text" placeholder="Tamaño" onChange={gestorTamaño} required/>
      <input type="number" placeholder="Stock" onChange={gestorStock} required/>
      <label for="CheckBox">Marcar si la planta esta Activa<input type="checkbox" placeholder="Activo" onChange={gestorActivo} required/></label>
      <input type="text" placeholder="Tipo" onChange={gestorTipo} required/>
      {/* falta input listaPrecio */}
      <input type="submit" />
    </form>
  );
}

export default Formulario;