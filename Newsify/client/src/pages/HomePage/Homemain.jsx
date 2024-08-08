import React,{useContext} from "react";
import Navbar from "../../component/Navbar/Navbar"
import NavbarSec from "./NavbarSec";

import "../../component/Navbar/navbar.css"
import "./Styles/navbarSec.css"
import "./Styles/carousel.css"
import "./Styles/homemain.css"
import Footer from "../../component/Footer/Footer";
import { Context } from "../..";

function Homemain() {
  const { user } = useContext(Context);
  return (
    <>
      <div className="main">
        {/* <Navbar /> */}
        <h1 className="w3-cursive w3-xlarge m-2">Hola {`${!user.name ? "Guest User": user.name}`}🤝!!!!</h1>
        <NavbarSec />
      </div>
      <Footer/>
    </>
  );
}

export default Homemain;