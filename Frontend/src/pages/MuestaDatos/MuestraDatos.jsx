import './MuestraDatos.css';
import '../Tarjetas/Tarjetas.css';
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
const [open2, setOpen2] = React.useState(false);


const handleClickOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};

const handleClickOpen2 = () => {
setOpen2(true);
};
  
const handleClose2 = () => {
setOpen2(false);
};


return (
<div className="juntar">
  <div id="inicio">
    <input type="text" name="busca" icon="search" id="busca" placeholder="Buscar por Nombre" onChange={(e)=>
    searchItems(e.target.value)}className="form-control"/>
  </div>
  <div className="contenido">
    {searchInput.length > 1 ? (
    filteredResults.map((item)=>{

    // ----------------------------Gestor Borrar---------------------------------

    //---------------------------------------------------elimina pero no lanza la pagina de nuevo-------------------------------------------

    const borrarPlanta = () => {
    eliminaP(item._id);
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
    id: item._id,
    Foto: item.Foto,
    Nombre: item.Nombre,
    Referencia: item.Referencia,
    Tamaño: item.Tamaño,
    Stock: item.Stock,
    Activo: item.Activo,
    Tipo: item.Tipo,
    Precio: item.Precio,
    };


    modificarP(modificaPlanta);

    setModifica("");
    };


    return (
    <div className="card text-white bg-primary mb-3">
      <div key={filteredResults._id} id="tarjeta">
        <div className="eliminar">
          <button type="submit" id="borrar" onClick={handleClickOpen} className="fas fa-times btn btn-danger"></button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              <p id="alertTitle">{"Confirme eliminacion de planta"}</p>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p id="alert">¿Esta seguro de que desea eliminar {item.Referencia}?</p>
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
      <div key={item._id} id="gestoredit">
        {/* {error ? (<div className="divError">
          <p className="mensajeError">Debe completar todos los campos</p>
        </div>) : null} */}
        <div id="formularioedit">
          <button type="submit" id="editar" className="btn btn-warning" onClick={handleClickOpen2}>Editar Campos</button>
          <Dialog open={open2} onClose={handleClose2} aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              <p id="alertTitle">{"Confirme eliminacion de planta"}</p>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
            <form encType="multipart/form-data" className="form">
            <label for="File">Seleccione imagen de planta</label>
            <input type="text" id="imageFile" accept="image/*" 
              className="form-control" />
            <input type="text" placeholder="Nombre" 
              className="form-control" />
            <input type="text" placeholder="Referencia" 
              className="form-control" />
            <input type="text" placeholder="Tamaño" 
              className="form-control" />
            <input type="number" placeholder="Stock" 
              className="form-control" />
            <label for="CheckBox">Marcar si la referencia esta Activa</label>
            <input type="checkbox" placeholder="Activo" id="checkbox" />
            {/* este input precio es de prueba--------------------------------------------------------------- */}
            <input type="text" placeholder="Tipo" 
              className="form-control" />
            <input type="number" placeholder="Precio" step="0.01" 
              className="form-control" />
            </form>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} id="botones">Cancelar</Button>
              <Button onClick={handleClose2, gestorEdit} onSubmit={handleClose} type="submit" autoFocus id="botones">
            Editar
          </Button>
        </DialogActions>
          </Dialog>
        </div>
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