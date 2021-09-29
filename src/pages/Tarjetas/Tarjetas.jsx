import './Tarjetas.css';
import { useState } from 'react';


function Tarjetas(props) {
    const lista = props.listaPlantas;
    // console.log(lista)
    const eliminar = props.eliminar;
    const modificar = props.modificar;

    
    const [modifica, setModifica] = useState("");
    const [error, setError] = useState("");


  // ----------------------------Gesor Borrar---------------------------------

    const borrarPlanta = () => {
        eliminar(lista.id);
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
          id: lista.id,
        //   Imagen: lista.Imagen, descomentar cuando este implementado
          Nombre: lista.Nombre,
          Referencia: lista.Referencia,
          Tamaño: lista.Tamaño,
          Stock: lista.Stock,
          Activo: lista.Activo,
          Tipo: lista.Tipo
        //   listaPrecios: lista.listaPrecios, poner la coma en el anterior al descomentar esto
        };
      
        modificar(modificaPlanta);
      
        setModifica("");
      };
      
    
      const gestorModifica = (event) => {
        setModifica(event.target.value);
      };


  return (
    <div className="datos">
            <div key={lista.id} id="tarjeta">
                <div>
                <p>{lista.Imagen}</p>
                <h3 id="nombre">{lista.Nombre}
                <button type="submit" id="borrar"onClick={borrarPlanta}>Eliminar Artículo</button>
                </h3>
                </div>
                <h4>{lista.Referencia}</h4>
                <p>{lista.Tamaño}</p>
                <p>{lista.Stock}</p>
                <p>{lista.Activo}</p>
                <p>{lista.Tipo}</p>
                <p>{lista.ListaPrecios}</p>
    
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