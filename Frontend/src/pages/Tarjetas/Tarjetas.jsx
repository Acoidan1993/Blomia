import './Tarjetas.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';


function Tarjetas(props) {
const lista = props.listaPlantas;
const eliminar = props.eliminar;
const modificar = props.modificar;

const [modifica, setModifica] = useState("");
const [error, setError] = useState("");
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};


// ----------------------------Gestor Borrar---------------------------------

const borrarPlanta = () => {
eliminar(lista._id);
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
id: lista._id,
Foto: lista.Foto,
Nombre: lista.Nombre,
Referencia: lista.Referencia,
Tamaño: lista.Tamaño,
Stock: lista.Stock,
Activo: lista.Activo,
Tipo: lista.Tipo,
Precio: lista.Precio,
};

modificar(modificaPlanta);

setModifica("");
};


const gestorModifica = (event) => {
setModifica(event.target.value);
};


return (
<div className="card text-white bg-primary mb-3">
  <div key={lista._id} id="tarjeta">
    <div className="eliminar">
      <button type="submit" id="borrar" onClick={handleClickOpen} className="fas fa-times btn btn-danger"></button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          <p id="alertTitle">{"Confirme eliminacion de planta"}</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p id="alert">¿Esta seguro de que desea eliminar la planta?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose, borrarPlanta} autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
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
      {/* <input onChange={gestorModifica} type="text" name="Campos" id="cambiaCampos" placeholder="Editar Campos"
        value={modifica} className="form-control me-sm-2"></input> */}
      <button type="submit" id="editar" className="btn btn-warning">Editar Campos</button>
    </form>
  </div>
</div>
);
}

export default Tarjetas;