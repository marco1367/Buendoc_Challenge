import "./index.css";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
//import interfaces:
import {deleteModalProps} from "../../../interfaces/index";
//import functions requests:
import { deleteProfessional, getProfessionals } from "../../../functions_requests";




function DeleteModal({openDeletelModal, stateDeleteModal, professional, actualPage, setProfessionalsList,setNum}:deleteModalProps): JSX.Element {

    async function onClick() {
        await deleteProfessional(professional.id);
        const response = await getProfessionals(actualPage);
        setNum(response.data.count+1)
        setProfessionalsList(response.data.results);
    }

    return (

        <Modal animation="false" isOpen={stateDeleteModal} >
            <ModalBody>
                <div>
                    <Button onClick={() => { openDeletelModal() }} >X</Button>
                </div>

                <div>
                    <h3>Atención:</h3>
                    <h3>Una vez borrado los datos no podrán ser recuperados.</h3>
                </div>

                <div>
                    <Button onClick={()=>{onClick()}} >Borrar</Button>
                </div>

            </ModalBody>
        </Modal>

    );

}

export default DeleteModal;