import './MuestraDatos.css';
import Tarjetas from "../Tarjetas/Tarjetas.jsx";
import { useState, useEffect } from 'react';



function MuestraDatos(props) {
    const listaPlantas = props.listaPlantas;
    const eliminaP = props.eliminarP;
    const modificarP = props.modificarP;
    
    
  const urlBuscar = 'https://blomiasa.herokuapp.com/plantas';
  
  const [planta, setPlanta] = useState('');

  console.log(planta)

  const gestorBuscar = (e) => {
    setPlanta(e.target.value);
  }
  const buscaDatos = async () => {
    try {
      let respuesta = await fetch(urlBuscar);
      let resultado = await respuesta.json();
      const busqueda = resultado.filter((element) =>{
        return element.Nombre === planta;
      })
      if(planta === ""){
      setPlanta(resultado)
      return resultado;
    } else{
      setPlanta(busqueda)
      return resultado;
    }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
  buscaDatos();
  }, [planta])


  const busquedaUsuario = (e)=>{
    e.preventDefault();
    const buscar = planta;
    setPlanta(buscar);
    setPlanta("");
  }

  return (
    <div className="juntar">
        <div id='inicio'>
        <form action="" onSubmit={busquedaUsuario}>
        <input type="text" name="busca" id="busca" placeholder="Buscar Planta" onChange={gestorBuscar} value={planta} class="form-control"/>
        </form>
        </div>
    <div className="contenido">
      {listaPlantas.map((e)=>{
          return(
              <Tarjetas key={e._id} listaPlantas={e} eliminar={eliminaP} modificar={modificarP}/>
          )
      })}
    </div>
    </div>
  );
}

export default MuestraDatos;