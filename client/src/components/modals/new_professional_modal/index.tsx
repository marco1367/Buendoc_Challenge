import "./index.css";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import Select from "react-select";
//import interfaces:
import { newProfModal, Languages, selectlanguagesOptions, stateErrorsResult } from "../../../interfaces";
//import functions requests:
import { postProfessional, getLanguages, postProfessionalLanguage, getProfessionals } from "../../../functions_requests/index";
//import styles modal:
import { modalStyle, modalBody } from "../styles"



const selectOptions: selectlanguagesOptions[] = [];


// const modalStyle:any = {
//     position: "absolute",
//     top: "50%",
//     left:"50%",
//     transform: "translate(-50%, -50%)",

// }


function NewProfModal({ stateNewProfModal, openNewProfModal, setProfessionalsList, professionalsList }: newProfModal): JSX.Element {
    //-----Local states:-------//
    const [stateValues, setStateValues] = useState({
        profile_image: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    const [stateLanguages, setStateLangages] = useState<Languages[]>([]);
    const [stateSelectLanguages, setStateSelectLanguages] = useState<selectlanguagesOptions[]>([]);

    const [stateErrors, setStateErrors] = useState({
        profile_image: false,
        first_name: false,
        last_name: false,
        email: false,
        // languages:"",
    })

    const [errorResponse, setErrorResponse] = useState<stateErrorsResult>({
        profile_image: [""],
        first_name: [""],
        last_name: [""],
        email: [""],
        non_field_errors: [""],
    })

    const [stateMsgExito, setStateMsgExito] = useState<boolean>(false);
    //-------------------------------//


    //---USE EFECT:----//
    useEffect((): void => {
        (async () => {

            const response = await getLanguages();
            setStateLangages(response.data);

        })();
    }, []);


    useEffect((): void => {

        stateLanguages.forEach((lang) => {
            selectOptions.push({
                value: lang.id,
                label: lang.name
            })
        });

    }, [stateLanguages]);
    //--------------//



    //-------HandleChange functions:----------//
    function handleChangeFirstName(e: any): void {
        if (e.target.value.length < 1 || e.target.value.length > 30 || e.target.value === "") {
            setStateErrors({
                ...stateErrors,
                first_name: true
            })
        } else {
            setStateErrors({
                ...stateErrors,
                first_name: false
            })
        }

        setStateValues({
            ...stateValues,
            first_name: e.target.value
        })
    }

    function handleChangeLasttName(e: any): void {
        if (e.target.value.length < 1 || e.target.value.length > 30 || e.target.value === "") {
            setStateErrors({
                ...stateErrors,
                last_name: true
            })
        } else {
            setStateErrors({
                ...stateErrors,
                last_name: false
            })
        }

        setStateValues({
            ...stateValues,
            last_name: e.target.value
        })
    }

    function handleChangeEmail(e: any): void {
        if (e.target.value.length < 1 || e.target.value.length > 254 || e.target.value === "") {
            setStateErrors({
                ...stateErrors,
                email: true
            })
        } else {
            setStateErrors({
                ...stateErrors,
                email: false
            })
        }

        setStateValues({
            ...stateValues,
            email: e.target.value
        })
    }

    function handleProfileImage(e: any): void {
        if (!e.target.files) {
            setStateErrors({
                ...stateErrors,
                profile_image: true
            })
        } else {
            setStateErrors({
                ...stateErrors,
                profile_image: false
            })
        }

        setStateValues({
            ...stateValues,
            profile_image: e.target.files[0]
        })
    }

    function handleChangeSelect(e: any): void {
        setStateSelectLanguages(e);
    }
    //----------------------------------//







    //----funcion para cerrar el modal y parcear los estados locales------//
    function close() {

        //parseamos los valores del form:
        setStateValues({
            profile_image: "",
            first_name: "",
            last_name: "",
            email: "",
        })

        //parseamos el estado de los mensajes de error:
        setErrorResponse({
            profile_image: [""],
            first_name: [""],
            last_name: [""],
            email: [""],
            non_field_errors: [""],
        });

        setStateErrors({
            profile_image: false,
            first_name: false,
            last_name: false,
            email: false,
        })

        if (stateMsgExito) {
            setStateMsgExito(!stateMsgExito)
        }

        openNewProfModal();
    }
    //----------------------------------------------------------------------//




    async function handleSubmit(e: any) {
        e.preventDefault();

        const f = new FormData();
        f.append("profile_image", stateValues.profile_image);
        f.append("first_name", stateValues.first_name);
        f.append("last_name", stateValues.last_name);
        f.append("email", stateValues.email);

        //post new professional:
        const response = await postProfessional(f);


        if (!response.data) {

            setErrorResponse(response);

        } else {

            //posts professional_languages:
            stateSelectLanguages.forEach((lang) => {
                postProfessionalLanguage({
                    professional_id: response.data.id,
                    language_id: lang.value,
                })
            });
            //upDate professionalLinst in home:
            // const newProfessionalList = [response.data].concat(professionalsList);
            const response2 = getProfessionals()
            setProfessionalsList((await response2).data.results);

            //parseamos el estado de los mensajes de error:
            setErrorResponse({
                profile_image: [""],
                first_name: [""],
                last_name: [""],
                email: [""],
                non_field_errors: [""],
            });

            setStateErrors({
                profile_image: false,
                first_name: false,
                last_name: false,
                email: false,
            })

            //parseamos los valores del form:
            setStateValues({
                profile_image: "",
                first_name: "",
                last_name: "",
                email: "",
            })

            //activamos el mensaje de creacion exitosa:
            setStateMsgExito(!stateMsgExito)


        }

    }





    return (

        <Modal animation="false" isOpen={stateNewProfModal} style={modalStyle} >


            <ModalBody style={modalBody} >


                <div className="modal_header" >
                    <h4>Nuevo profesional</h4>
                    <Button onClick={() => { close() }} >X</Button>
                </div>

                {
                    stateMsgExito
                        ?
                        <div className="msg_exito" > <h3>Se ha agregado con éxito.</h3> </div>
                        :
                        <form onSubmit={(e) => { handleSubmit(e) }} className="form_modal_container"  >
                            <div className="form_modal_div" >
                                <p>Imagen de perfil</p>
                                {(errorResponse.profile_image && errorResponse.profile_image[0] !== "") ? <p className="p_error_msg" >{errorResponse.profile_image[0]}</p> : null}
                                <input type="file" name="profile_image " accept="image/png, image/jpeg" onChange={(e) => { handleProfileImage(e) }} />
                            </div>

                            <div className="form_modal_div" >
                                <p>Nombre</p>
                                {(stateErrors.first_name) ? <p className="p_error_msg" >Campo requerido, caracteres min:1 max:30</p> : null}
                                {(errorResponse.first_name && errorResponse.first_name[0] !== "") ? <p className="p_error_msg" > {errorResponse.first_name[0]} </p> : null}
                                <input className="form_imput" type="text" name="first_name " placeholder="Nombre..." onChange={(e) => { handleChangeFirstName(e) }} />
                            </div>

                            <div className="form_modal_div" >
                                <p>Apellido</p>
                                {(stateErrors.last_name) ? <p className="p_error_msg" >Campo requerido, caracteres min:1 max:30</p> : null}
                                {(errorResponse.last_name && errorResponse.last_name[0] !== "") ? <p className="p_error_msg" > {errorResponse.last_name[0]} </p> : null}
                                <input className="form_imput" type="text" name="last_name " placeholder="Apellido..." onChange={(e) => { handleChangeLasttName(e) }} />
                            </div>

                            <div className="form_modal_div" >
                                <p>Email</p>
                                {(stateErrors.email) ? <p className="p_error_msg" >Campo requerido, caracteres min:1 max:30</p> : null}
                                {(errorResponse.email && errorResponse.email[0] !== "") ? <p className="p_error_msg" > {errorResponse.email[0]} </p> : null}
                                {(errorResponse.non_field_errors && errorResponse.non_field_errors[0] !== "") ? <p className="p_error_msg" > {errorResponse.non_field_errors[0]} </p> : null}
                                <input className="form_imput" type="email" name="email" placeholder="Email..." onChange={(e) => { handleChangeEmail(e) }} />
                            </div>


                            <div className="form_modal_div" >
                                <p>Idiomas</p>
                                <Select
                                    options={selectOptions}
                                    isMulti={true}
                                    isSearchable={true}
                                    onChange={(e) => { handleChangeSelect(e) }}
                                ></Select>
                            </div>


                            <div className="form_modal_div modal_bttn" >
                                <Button type="submit" >Agregar Profesional</Button>
                            </div>

                        </form>
                }


            </ModalBody>

        </Modal>

    );

}

export default NewProfModal;