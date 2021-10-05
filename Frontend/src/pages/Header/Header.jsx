import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Nav,Navbar} from "react-bootstrap";
import './Header.css';

const Header = () => {
    // // Funcion para el logout de la Sesion
    // const logout = () =>{
    //     if(localStorage.getItem("userData").length <= 0){
    //         console.log("No tiene token de usuario no deberia estar aqui.");
    //     }else{
    //         localStorage.removeItem("userData");
    //         // return <Redirect to="/login"/>
    //     }
    // } implementar tambien en funcion de si esta logeado o no cambie el icono
return (
<div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="#" id="logo"><strong>BLOMIA INVENTARIO</strong></a>
    <div id="botonesUser">
    <button id="userSI" className="btn btn-info"><i type="button" size="5" className="fas fa-user"></i></button>
    <button id="userNO" className="btn btn-info"><i type="button" size="5" className="far fa-user"></i></button>
    </div>
    </nav>
</div>

)
}

export default Header