import "./index.css";
//import interfaces:
import { cardProps } from "../../../interfaces";
//import imgs:
import penciledit from './lapiz.png';
import eyewatch from './ver.png';
import dele from './dele.png';
import { useEffect, useState } from "react";
//import modals:
import DetailModal from "../../modals/detail_modal";
import DeleteModal from "../../modals/delete_modal";
import EditProfModal from "../../modals/edit_modal";






function ProfessionalCard( {professional, professionals, actualPage, setProfessionalsList, setNum}:cardProps ):JSX.Element {
    //locals states modals:
    const [stateDetailModal, setStateDetailModal] = useState(false);
    const [stateDeleteModal, setStateDeleteModal] = useState(false);
    const [stateEditModal, setStateEditModal] = useState(false);


    //----functions callback modals----//
    function openDetailModal():void {
        setStateDetailModal( !stateDetailModal );
    }
    function openDeletelModal():void {
        setStateDeleteModal( !stateDeleteModal );
    }
    function openEditlModal():void {
        setStateEditModal( !stateEditModal );
    }
    //---------------------------------//


    return (
        <div key={professional.id} className="professional_card_container" >
            <div className="professional_card_div" >
                <img src={professional.profile_image} className="img_card_profile" />
            </div>
            <div className="professional_card_div" > {professional.first_name} </div>
            <div className="professional_card_div" > {professional.last_name} </div>
            <div className="professional_card_div" > {professional.email} </div>
            <div className="professional_card_div" > {professional.id} </div> 
            <div className="professional_card_div" > {professional.is_active ? "Activo" : "No activo"} </div>

            <div className="professional_card_div" id="professional_card_img_container" >
                <img src={penciledit} className="img_card" onClick={()=>{openEditlModal()}} />
                <img src={eyewatch} className="img_card" onClick={()=>{openDetailModal()}} />
                <img src={dele} className="img_card"  onClick={()=>{openDeletelModal()}} />
            </div>


            <DetailModal  openDetailModal={openDetailModal} stateDetailModal={stateDetailModal} professional={professional}   />

            <DeleteModal openDeletelModal={openDeletelModal} stateDeleteModal={stateDeleteModal} professional={professional} actualPage={actualPage} setProfessionalsList={setProfessionalsList} setNum={setNum}  />
        
            <EditProfModal openEditlModal={openEditlModal} stateEditModal={stateEditModal} professional={professional} actualPage={actualPage} setProfessionalsList={setProfessionalsList} />

        </div>
    );
  }
  
  export default ProfessionalCard;