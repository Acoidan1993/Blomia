import './Tarjetas.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';


function Tarjetas(props) {
const recupera = props.recupera;
const lista = props.listaPlantas;
const eliminar = props.eliminar;
const modificar = props.modificar;

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

// ----------------------------Gestor Borrar---------------------------------

const borrarPlanta = () => {
eliminar(lista._id);
};

useEffect(() => {
}, [])

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
}


modificar(modificaPlanta);

setModifica("");

};


return (
  <div className="juntar">
  <div className="contenido">
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
            <p id="alert">¿Esta seguro de que desea eliminar {lista.Referencia}?</p>
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
      <p>{lista.Foto}</p>
      <h5 id="nombre"><strong>{lista.Nombre}</strong></h5>
    </div>
    <p><strong>Referencia: </strong>{lista.Referencia}</p>
    <p><strong>Tamaño: </strong>{lista.Tamaño}</p>
    <p><strong>Stock: </strong>{lista.Stock}</p>
    <p><strong>Activo: </strong>{lista.Activo}</p>
    <p><strong>Tipo: </strong>{lista.Tipo}</p>
    <p><strong>Precio: </strong>{lista.Precio}</p>
  </div>
  <div key={lista._id} id="gestoredit">
    {/* {error ? (<div className="divError">
      <p className="mensajeError">Debe completar todos los campos</p>
    </div>) : null} */}
    <div id="formularioedit">
      <button type="submit" id="editar" className="btn btn-warning" onClick={handleClickOpen2}>Editar Campos</button>
      <Dialog open={open2} onClose={handleClose2} aria-labelledby="alert-dialog-title" id="foredit"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          <p id="alertTitle">{"Editar Referencia"}</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div encType="multipart/form-data" className="form">
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
        </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
              <Button onClick={handleClose2} id="botones">Cancelar</Button>
              <Button onClick={handleClose2, gestorEdit} type="submit" autoFocus id="botones">
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </div>
</div>
</div>
</div>
);
}

export default Tarjetas;