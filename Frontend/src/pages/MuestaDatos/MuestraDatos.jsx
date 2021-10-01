import './MuestraDatos.css';
import Tarjetas from "../Tarjetas/Tarjetas.jsx";
import { useState, useEffect, useRef } from 'react';
// import axios from "axios";



function MuestraDatos(props) {
    const listaPlantas = props.listaPlantas;
    const eliminaP = props.eliminarP;
    const modificarP = props.modificarP;
    // const [Plantacion, setPlantacion] = useState([]);
    // const [buscador, setBuscador] = useState("");
    // const firstUpdate = useRef(true);

    // const buscarPlanta = () => {
  

    //   const vivero = listaPlantas.filter((planta) => {
    //     return (
    //       planta.Nombre.toLowerCase().startsWith(buscador.toLowerCase()) &&
    //       buscador !== ""
    //     );
    //   });
    //   setPlantacion(vivero);
    // };
  
    // useEffect(() => {
    //   if (firstUpdate.current) {
    //     firstUpdate.current = false;
    //     return;
    //   }
    //   buscarPlanta();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [buscador]);


  const urlBuscar = 'https://blomiasa.herokuapp.com/plantas';
  
  const [planta, setPlanta] = useState([]);

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
        {/* <input
              type="text"
              placeholder="Busca Planta"
              className="col-12"
              value={buscador}
              onChange={(e) => setBuscador(e.target.value)}
              onBlur={() =>
                setTimeout(() => {
                  setPlantacion([]);
                }, 100)
              }
            /> */}
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