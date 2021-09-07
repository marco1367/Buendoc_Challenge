import "./index.css";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
//import interfaces:
import { detailModalProps, ResponseAxiosProfessionalsLnaguages } from "../../../interfaces/index"
import { useEffect, useState } from "react";
import { getProfessionalsLanguages } from "../../../functions_requests";
//import styles modal:
import { modalStyle, modalBody } from "../styles"





function DetailModal({ stateDetailModal, openDetailModal, professional }: detailModalProps): JSX.Element {
    const [languages, setLanguages] = useState<ResponseAxiosProfessionalsLnaguages[]>([]);


    useEffect((): void => {
        (async () => {
            const response = await getProfessionalsLanguages(professional.id)
            setLanguages(response.data)
        })();
    }, [professional]);


    return (

        <Modal animation="false" isOpen={stateDetailModal} style={modalStyle} >
            <ModalBody style={modalBody} >

                <div className="form_modal_container" >

                    <div className="modal_header" >
                        <h4>Detalles del profesional</h4>
                        <Button onClick={() => { openDetailModal() }} >X</Button>
                    </div>

                    <div>
                        <img src={professional.profile_image} className="detail_modal_img_profile" />
                    </div>

                    <div className="form_modal_div" >
                        <p>Nombre:</p>
                        {professional.first_name}
                    </div>

                    <div className="form_modal_div" >
                        <p>Apellido</p>
                        {professional.last_name}
                    </div>

                    <div className="form_modal_div" >
                        <p>Email</p>
                        {professional.email}
                    </div>

                    <div className="form_modal_div" >
                        <p>ID</p>
                        {professional.id}
                    </div>

                    <div className="form_modal_div" >
                        <p>Estado</p>
                        {professional.is_active}
                    </div>

                    <div className="form_modal_div" >
                        <p>Idiomas</p>
                        <div id="detail_languages_container" >
                            {
                                languages
                                    ?
                                    languages.map((profslangs) => { return <div key={profslangs.language.id} > {profslangs.language.name} </div> })
                                    : null
                            }
                        </div>
                    </div>

                </div>


            </ModalBody>
        </Modal>

    );

}

export default DetailModal;