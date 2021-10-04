import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./pages/Header/Header.jsx";
import Formulario from './pages/Formulario/Formulario.jsx';
import MuestraDatos from './pages/MuestaDatos/MuestraDatos.jsx';
import Registrarse from "./pages/Registrarse/Registrarse.jsx";
import Login from "./pages/Login/Login.jsx";
import './App.css';


function App() {

  // Define en una variable booleana si el usuario tiene o no acceso
  const [tieneAcceso, setTieneAcceso] = useState(false);
  // define los datos del acceso del usuario (nombre,email,password)
  const [datos, setDatos] = useState({});
  // Obtiene el token del usuario si se ha logueado correctamente
  const [token, setToken] = useState();
  // Traemos desde el componente Login los datos del usuario enviados desde el servidor mediante esta función prop
  const gestionarAcceso = (dato) => {
    setDatos(dato); // datos del usuario: email, password y token
    setTieneAcceso(true); // La variable que indica que está logueado se pone a true
    setToken(dato.token); // Por si fuera necesario
    // Para que persista el token y no se borre al recargar la pagina lo guardamos en formato texto en el localstorage
    localStorage.setItem(
      'userData',
      JSON.stringify({
        idUsuario: dato.idUsuario,
        token: dato.token
      })
    );
  };


  // ----------------------------Get Principal---------------------------------

  const url = 'http://localhost:5000/plantas';
  const [newResultado, setResultado] = useState([]);
  console.log(newResultado)
  
  const recuperaDatos = async () => {
    try {
      let respuesta = await fetch(url);
      let resultado = await respuesta.json();
      setResultado(resultado.respuesta)
      // return(resultado.respuesta)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
  recuperaDatos();
  }, [])

  // ----------------------------Get Busqueda---------------------------------


  // const urlBuscar = 'https://blomiasa.herokuapp.com/plantas';
  
  // const [planta, setPlanta] = useState('');

  // console.log(planta)

  // const gestorBuscar = (e) => {
  //   setPlanta(e.target.value);
  // }
  // const buscaDatos = async () => {
  //   try {
  //     let respuesta = await fetch(urlBuscar);
  //     let resultado = await respuesta.json();
  //     const busqueda = resultado.filter((element) =>{
  //       return element.Nombre === planta;
  //     })
  //     if(planta === ""){
  //     setPlanta(resultado)
  //     return resultado;
  //   } else{
  //     setPlanta(busqueda)
  //     return resultado;
  //   }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  // useEffect(() => {
  // buscaDatos();
  // }, [planta])


  // const busquedaUsuario = (e)=>{
  //   e.preventDefault();
  //   const buscar = planta;
  //   setPlanta(buscar);
  //   setPlanta("");
  // }

  // ----------------------------Funcion Añadir---------------------------------


  const añadirPlanta = async (planta)=>{
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "Nombre": planta.Nombre,
        "Referencia": planta.Referencia,
        "Tamaño": planta.Tamaño,
        "Stock": planta.Stock,
        "Activo": planta.Activo,
        "Tipo": planta.Tipo, 
        "Precio": planta.Precio,
        "Foto": planta.Foto
    });

    console.log(raw);
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("http://localhost:5000/plantas", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    recuperaDatos();
  }

  // ----------------------------Get Eliminar---------------------------------

 

  const eliminarPlanta = async (_id) => { 
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    await fetch(`http://localhost:5000/plantas/eliminar/`+ _id, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    recuperaDatos();
  };


  // ----------------------------Funcion Modificar---------------------------------


  const modificarPlanta = async (planta) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   Foto: planta.Foto,
    //   Nombre: planta.Nombre,
    //   Referencia: planta.Referencia,
    //   Tamaño: planta.Tamaño,
    //   Stock: planta.Stock,
    //   Activo: planta.Activo,
    //   Tipo: planta.Tipo,
    //   Precio: planta.Precio
    // });

    // var requestOptions = {
    //   method: "PUT",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // await fetch(`http://localhost:5000/api/blomia/plantas/${planta._id}`, requestOptions)
    //   .then((response) => response.text())
    //   .catch((error) => console.log("error", error));
    //   recuperaDatos();
  };
  

  // Cada vez que se recarga la pagina se renderiza el componente y se leen los datos
  useEffect(() => {
    const datosRecuperar = JSON.parse(localStorage.getItem('userData'));
    if (datosRecuperar && datosRecuperar.token) {
      setToken(datosRecuperar.token);
    }
    console.log(datosRecuperar);
  }, []);
  // UseEffect para que se realice la peticion solo una vez
  useEffect((e) => {
    console.log(e)
  }, []);

  return ( 
    <div className = "App" >
      	<Router>
					<Switch>
              <Route>
                <Header />
              </Route>
						<Route exact path="/blomia/login">
							<Login gestionarAcceso={gestionarAcceso} />
						</Route>
						<Route exact path="/blomia/alta">
							<Registrarse gestionarAcceso={gestionarAcceso} />
            </Route>
					</Switch>
				</Router>              
        <Formulario añadirPlanta={añadirPlanta}/>
        <MuestraDatos listaPlantas={newResultado} eliminarP={eliminarPlanta} modificarP={modificarPlanta}/>  
    </div>
  );
}

export default App;