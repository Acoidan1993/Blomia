import './Tarjetas.css';
import { useState } from 'react';


function Tarjetas(props) {
    const listaPlantas = props.listaPlantas;
    const eliminar = props.eliminar;
    const modificar = props.modificar;

    
    const [modifica, setModifica] = useState("");
    const [error, setError] = useState("");


  // ----------------------------Gesor Borrar---------------------------------

    const borrarPlanta = () => {
        eliminar(listaPlantas.id);
    };

  // ----------------------------Gestor Editar---------------------------------  
    
    const gestorEdit = (e) => {
        e.preventDefault();
        setError(false);
        if (
          modifica.trim() === "" 
        ) {
          setError(true);
          return;
        }
      
        const modificaPlanta = {
          id: listaPlantas.id,
        //   Imagen: listaPlantas.Imagen, descomentar cuando este implementado
          Nombre: listaPlantas.Nombre,
          Referencia: listaPlantas.Referencia,
          Tamaño: listaPlantas.Tamaño,
          Stock: listaPlantas.Stock,
          Activo: listaPlantas.Activo,
          Tipo: listaPlantas.Tipo
        //   listaPrecios: listaPlantas.listaPrecios, poner la coma en el anterior al descomentar esto
        };
      
        modificar(modificaPlanta);
      
        setModifica("");
      };
      
    
      const gestorModifica = (event) => {
        setModifica(event.target.value);
      };


  return (
    <div className="datos">
            <div key={listaPlantas.id} id="tarjeta">
                <div>
                <p>{listaPlantas.Imagen}</p>
                <h3 id="nombre">{listaPlantas.Nombre}
                <button type="submit" id="borrar"onClick={borrarPlanta}>Eliminar Artículo</button>
                </h3>
                </div>
                <h4>{listaPlantas.Referencia}</h4>
                <p>{listaPlantas.Tamaño}</p>
                <p>{listaPlantas.Stock}</p>
                <p>{listaPlantas.Activo}</p>
                <p>{listaPlantas.Tipo}</p>
                <p>{listaPlantas.ListaPrecios}</p>
    
                <div key={modificar.id} id="gestoredit">
                    {error ? (<div className="divError">
                    <p className="mensajeError">Debe completar todos los campos</p>
                    </div>) : null}
                    <form action="" onSubmit={gestorEdit} encType="multipart/form-data" id="formularioedit">
                        <input onChange={gestorModifica} type="text" name="Campos" id="cambiaCampos" placeholder="Editar Campos" value={modifica} className="form-control me-sm-2"></input>
                        <button type="submit" id="editar">Editar Campos</button> 
                    </form>
                </div>
            </div>
    </div>
  );
}

export default Tarjetas;