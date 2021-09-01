import "./index.css";
//import interfaces:
import { cardProps, ResponseAxiosProfessionalsLnaguages } from "../../../interfaces";
import penciledit from './lapiz.png'
import eyewatch from './ver.png';
import { createRef, useEffect, useState } from "react";
import DetailModal from "../../modals/detail_modal";
import { getProfessionalsLanguages } from "../../../functions_requests";







function ProfessionalCard( {professional}:cardProps ):JSX.Element {
    //locals states modals:
    const [stateDetailModal, setStateDetailModal] = useState(false);
    const [languages, setLanguages] = useState<ResponseAxiosProfessionalsLnaguages[]>([]);



    useEffect( ():void=>{
        (async ()=>{
            const response = await getProfessionalsLanguages(professional.id)
            setLanguages(response.data)
        })();
    },[]);



    //----functions callback modals----//
    function openDetailModal() {
        setStateDetailModal( !stateDetailModal );
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
            <div className="professional_card_div" > {professional.is_active} </div>

            <div className="professional_card_div" id="professional_card_img_container" >
                <img src={penciledit} className="img_card" />
                <img src={eyewatch} className="img_card" onClick={()=>{openDetailModal()}} />
            </div>


            <DetailModal  openDetailModal={openDetailModal} stateDetailModal={stateDetailModal} professional={professional} languages={languages}  />
        
        </div>
    );
  }
  
  export default ProfessionalCard;