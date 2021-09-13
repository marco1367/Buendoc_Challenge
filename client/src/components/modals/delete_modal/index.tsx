import "./index.css";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
//import interfaces:
import { deleteModalProps } from "../../../interfaces/index";
//import functions requests:
import { deleteProfessional, getProfessionals } from "../../../functions_requests";




function DeleteModal({ openDeletelModal, stateDeleteModal, professional, actualPage, setProfessionalsList, setNum }: deleteModalProps): JSX.Element {

    async function onClick() {
        //borramos el registro del profesional:
        await deleteProfessional(professional.id);
        //traemos los registros actualizados en la paginacion que estmaos:
        const response = await getProfessionals(actualPage);


        //tenemos que comprobar si es el ultimo registro de la ultima paginacion:
        if (response.data) {
            //seteamos el numero de registros para la paginacion con la respuesta del request del GET:
            setNum(response.data.count);
            //seteamos la lsita de profesionales a mostrar:
            setProfessionalsList(response.data.results);
        } else {
            //traemos los registros actualizados pero de la pagina anterior(eliminamos el ultimo reg de la ultima pagina):
            const newPageNumber: number = actualPage - 1;
            const response2 = await getProfessionals(newPageNumber);
            setNum(response2.data.count);
            setProfessionalsList(response2.data.results);
        }

    }

    return (

        <Modal animation="false" isOpen={stateDeleteModal} >

            <ModalBody>

                <div className="modal_header" >
                    <h4>Eliminar profesional</h4>
                    <Button onClick={() => { openDeletelModal() }} >X</Button>
                </div>

                <div id="mgs_delete" >
                    <h3>Atención:</h3>
                    <h3>Una vez borrado los datos no podrán ser recuperados.</h3>
                </div>

                <div className="form_modal_div modal_bttn" >
                    <Button onClick={() => { onClick() }} >Borrar</Button>
                </div>

            </ModalBody>

        </Modal>

    );

}

export default DeleteModal;