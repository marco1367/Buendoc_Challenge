import "./index.css";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
//import interfaces:
import {detailModalProps} from "../../../interfaces/index"
import { useEffect } from "react";





function DetailModal({languages, stateDetailModal, openDetailModal, professional}:detailModalProps):JSX.Element {


    return (
        
        <Modal animation="false" isOpen={stateDetailModal} >
            <ModalBody>
                <div>
                    <Button onClick={() => { openDetailModal() }} >X</Button>
                </div>

                <div> 
                    <img src={professional.profile_image}  className="detail_modal_img_profile" /> 
                </div>
                <div> {professional.first_name} </div>
                <div> {professional.last_name} </div>
                <div > {professional.email} </div>
                <div > {professional.id} </div>
                <div > {professional.is_active} </div>

                {
                    languages 
                    ?
                    languages.map( (profslangs)=>{ return <div key={profslangs.language.id} > {profslangs.language.name} </div> } ) 
                    : null
                }
                

            </ModalBody>
        </Modal>

    );

}
  
  export default DetailModal;