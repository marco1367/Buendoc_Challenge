import { useState } from "react";
import "./index.css";
//import modals:
import NewProfModal from "../../modals/new_professional_modal";
//import interfaces:
import {titleProps} from "../../../interfaces/index";





function HomeTitles({setProfessionalsList, professionalsList}:titleProps):JSX.Element {
    const [stateNewProfModal, setStateNewProfModal] = useState(false);


    //----functions callback modals----//
    function openNewProfModal() {
        setStateNewProfModal( !stateNewProfModal );
    }
    //---------------------------------//


    return (
        <div id="home_titles_container" >

            <div className="home_titles_div" ></div>
            <div className="home_titles_div" >NOMBRE</div>
            <div className="home_titles_div" >APELLIDO</div>
            <div className="home_titles_div" >EMAIL</div>
            <div className="home_titles_div" >ID</div>
            <div className="home_titles_div" >ESTADO</div>

            <div className="home_titles_div" > 
                <button onClick={():void=>{openNewProfModal()}} >Nuevo Profesional</button> 
            </div>

            <NewProfModal stateNewProfModal={stateNewProfModal} openNewProfModal={openNewProfModal} setProfessionalsList={setProfessionalsList} professionalsList={professionalsList}  />

        </div>
    );
  }
  
  export default HomeTitles;