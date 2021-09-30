import './MuestraDatos.css';
import Tarjetas from "../Tarjetas/Tarjetas.jsx";


function MuestraDatos(props) {
    const listaPlantas = props.listaPlantas;
    console.log(listaPlantas)
    const eliminaP = props.eliminaP;
    const modificarP = props.modificarP;
    

  return (
    <div className="juntar">
    <div className="contenido">
      {listaPlantas.map((e)=>{
          return(
              <Tarjetas key={e.id} listaPlantas={e} eliminar={eliminaP} modificar={modificarP}/>
          )
      })}
    </div>
    </div>
  );
}

export default MuestraDatos;