import './Tarjetas.css';
import { useState } from 'react';


function Tarjetas(props) {
    const lista = props.listaPlantas;
    // console.log(lista)
    const eliminar = props.eliminar;
    const modificar = props.modificar;
    
    const [modifica, setModifica] = useState("");
    const [error, setError] = useState("");


  // ----------------------------Gestor Borrar---------------------------------

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
    <div className="card text-white bg-primary mb-3">
            <div key={lista.id} id="tarjeta">
              <div className="eliminar">
              <button type="submit" id="borrar" onClick={borrarPlanta} className="fas fa-times btn btn-danger"></button>
              </div>
                <div>
                <p>{lista.Foto}</p>
                <h2 id="nombre"><strong>{lista.Nombre}</strong></h2>
                </div>
                <h4><strong>Referencia: </strong>{lista.Referencia}</h4>
                <p><strong>Tamaño: </strong>{lista.Tamaño}</p>
                <p><strong>Stock: </strong>{lista.Stock}</p>
                <p><strong>Activo: </strong>{lista.Activo}</p>
                <p><strong>Tipo: </strong>{lista.Tipo}</p>
                <p><strong>Precio: </strong>{lista.Precio}</p>
            </div>                
            <div key={modificar.id} id="gestoredit">
                    {/* {error ? (<div className="divError">
                    <p className="mensajeError">Debe completar todos los campos</p>
                    </div>) : null} */}
                    <form action="" onSubmit={gestorEdit} encType="multipart/form-data" id="formularioedit">
                        {/* <input onChange={gestorModifica} type="text" name="Campos" id="cambiaCampos" placeholder="Editar Campos" value={modifica} className="form-control me-sm-2"></input> */}
                        <button type="submit" id="editar" className="btn btn-warning">Editar Campos</button> 
                    </form>
            </div>
    </div>
  );
}

export default Tarjetas;