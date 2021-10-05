import './MuestraDatos.css';
import Tarjetas from "../Tarjetas/Tarjetas.jsx";
import { useState, useEffect, useRef } from 'react';
// import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function MuestraDatos(props) {
const listaPlantas = props.listaPlantas;
const eliminaP = props.eliminarP;
const modificarP = props.modificarP;


const [filteredResults, setFilteredResults] = useState([]);
const [searchInput, setSearchInput] = useState('');


const searchItems = (searchValue) => {
setSearchInput(searchValue)
if (searchInput !== '') {
const filteredData = listaPlantas.filter((item) => {
return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
})
setFilteredResults(filteredData)
}
else{
setFilteredResults(listaPlantas)
}
}


const [modifica, setModifica] = useState("");
const [error, setError] = useState("");
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};


return (
<div className="juntar">
  <div id="inicio">
    <input type="text" name="busca" icon="search" id="busca" placeholder="Buscar por Nombre" onChange={(e)=>
    searchItems(e.target.value)}class="form-control"/>
  </div>
  <div className="contenido">
    {searchInput.length > 1 ? (
    filteredResults.map((item)=>{

  // ----------------------------Gestor Borrar---------------------------------

  const borrarPlanta = () => {
    console.log(filteredResults)
  eliminaP(filteredResults._id);
  };
  
  // ----------------------------Gestor Editar---------------------------------
  
  const gestorEdit = (e) => {
  e.preventDefault();
  setError(false);
  if (
  modificarP.trim() === ""
  ) {
  setError(true);
  return;
  }
  
  const modificaPlanta = {
  id: filteredResults._id,
  Foto: filteredResults.Foto,
  Nombre: filteredResults.Nombre,
  Referencia: filteredResults.Referencia,
  Tamaño: filteredResults.Tamaño,
  Stock: filteredResults.Stock,
  Activo: filteredResults.Activo,
  Tipo: filteredResults.Tipo,
  Precio: filteredResults.Precio,
  };
  
  
  
  modificarP(modificaPlanta);
  
  setModifica("");
  };
  
  
  const gestorModifica = (event) => {
  setModifica(event.target.value);
  console.log(item)
  };
    return (
    <div className="card text-white bg-primary mb-3">
      <div key={item._id} id="tarjeta">
        <div className="eliminar">
          <button type="submit" id="borrar" onClick={handleClickOpen} className="fas fa-times btn btn-danger"></button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              <p id="alertTitle">{"Confirme eliminacion de planta"}</p>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p id="alert">¿Esta seguro de que desea eliminar esta referencia?</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} id="botones">No</Button>
              <Button onClick={handleClose, borrarPlanta} autoFocus id="botones">
                Si
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <p>{item.Foto}</p>
          <h5 id="nombre"><strong>{item.Nombre}</strong></h5>
        </div>
        <p><strong>Referencia: </strong>{item.Referencia}</p>
        <p><strong>Tamaño: </strong>{item.Tamaño}</p>
        <p><strong>Stock: </strong>{item.Stock}</p>
        <p><strong>Activo: </strong>{item.Activo}</p>
        <p><strong>Tipo: </strong>{item.Tipo}</p>
        <p><strong>Precio: </strong>{item.Precio}</p>
      </div>
      <div key={modificarP.id} id="gestoredit">
        {/* {error ? (<div className="divError">
          <p className="mensajeError">Debe completar todos los campos</p>
        </div>) : null} */}
        <form action="" onSubmit={gestorEdit} encType="multipart/form-data" id="formularioedit">
          {/* <input onChange={gestorModifica} type="text" name="Campos" id="cambiaCampos" placeholder="Editar Campos"
            value={modifica} className="form-control me-sm-2"></input> */}
          <button type="submit" id="editar" className="btn btn-warning" onClick={gestorModifica}>Editar Campos</button>
        </form>
      </div>
    </div>
    )
    })
    ) : (
    listaPlantas.map((e)=>{
    return(
    <Tarjetas key={e._id} listaPlantas={e} eliminar={eliminaP} modificar={modificarP} />
    )
    })
    )}
  </div>
</div>
);
}

export default MuestraDatos;