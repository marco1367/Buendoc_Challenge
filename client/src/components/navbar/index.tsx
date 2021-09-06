import "./index.css";
import logo from "./favicon.png";


function Navbar():JSX.Element {
    return (
        <div id="navbar_principal_container" >
            <img src={logo} id="navbar_img" />
            <h2>Buendoc - Lista de profesionales.</h2>
        </div>
    );
  }
  
  export default Navbar;