import "./index.css";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import Select from "react-select";
//import interfaces:
import { editModalProps, selectlanguagesOptions, Languages, ResponseAxiosProfessionalsLnaguages } from "../../../interfaces";
//import functions requests:
import { PatchProfessional, getProfessionals, getLanguages, getProfessionalsLanguages, deleteProfessionalLanguage, postProfessionalLanguage } from "../../../functions_requests";
//import styles modal:
import { modalStyle, modalBody } from "../styles"





function EditProfModal({ openEditlModal, stateEditModal, professional, professionals, actualPage, setProfessionalsList }: editModalProps): JSX.Element {
    //-----Local states:------//
    const [stateValues, setStateValues] = useState({
        profile_image: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    const [stateErrors, setStateErrors] = useState({
        profile_image: false,
        first_name: false,
        last_name: false,
        email: false,
    })

    const [errorResponse, setErrorResponse] = useState({});
    //selects:
    const [stateLanguages, setStateLangages] = useState<Languages[]>([]);
    const [stateProfLanguages, setStateProfLangages] = useState<ResponseAxiosProfessionalsLnaguages[]>([]);
    const [selectProfLangOptions, setSelectProfLangOptions] = useState<selectlanguagesOptions[]>();
    const [selectLanguagesOptions, setSelectLanguagesOptions] = useState<selectlanguagesOptions[]>([]);
    //selects: (valores seleccionados)
    const [selectProfLangValues, setSelectProfLangValues] = useState<selectlanguagesOptions[]>([]);
    const [selectLangValues, setSelectLangValues] = useState<selectlanguagesOptions[]>([]);

    //mensaje de edicion exitosa:
    const [msgSucceEdition, setMsgSucceEdition] = useState(false);
    //------------------------//




    //----------UseEfect:(initial data load)---------//
    useEffect((): void => {
        (async () => {
            //lead languages:
            const response = await getLanguages();
            setStateLangages(response.data);

            //load prof langauges:
            const response2 = await getProfessionalsLanguages(professional.id);
            setStateProfLangages(response2.data)

        })();
    }, [professionals, professional]);

    useEffect((): void => {
        //carga de lenguajes que tiene el profecional:
        let proflanguages: selectlanguagesOptions[] = [];
        stateProfLanguages.forEach((proflang) => {
            proflanguages.push({
                value: proflang.id,
                label: proflang.language.name
            })
        });
        setSelectProfLangOptions(proflanguages);


        //carga de lenguajes q no tiene el profesional:
        let arrayLanguages: Languages[] = stateLanguages;

        stateProfLanguages.forEach((proflang) => {
            arrayLanguages = arrayLanguages.filter(lang => lang.id !== proflang.language.id);
        })

        let selectLanguages: selectlanguagesOptions[] = [];
        arrayLanguages.forEach((lang) => {
            selectLanguages.push({
                value: lang.id,
                label: lang.name
            })
        });
        setSelectLanguagesOptions(selectLanguages);


    }, [stateProfLanguages]);
    //-----------------------------------------------//



    //----Handle Changes:----//
    function handleChangeFirstName(e: any): void {
        if (e.target.value.length > 30 ) {
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
        if (e.target.value.length > 30 ) {
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
        if (e.target.value.length > 254) {
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

        if (e.target.files.length === 0) {
            // setStateErrors({
            //     ...stateErrors,
            //     profile_image: true
            // })
            setStateValues({
                ...stateValues,
                profile_image: ""
            })
        } else {
            // setStateErrors({
            //     ...stateErrors,
            //     profile_image: false
            // })
            setStateValues({
                ...stateValues,
                profile_image: e.target.files[0]
            })
        }

    }


    function handleChangeSelectProfLang(e: any): void {
        setSelectProfLangValues(e);
    }

    function handleChangeSelectLanguages(e: any): void {
        setSelectLangValues(e);
    }
    //-----------------------//




    //----funcion para cerrar el modal y parcear los estados locales------//
    function close() {

        //parseamos el estado de los mensajes de error:
        setStateErrors({
            profile_image: false,
            first_name: false,
            last_name: false,
            email: false,
        })

        //parseamos el estado de los valores:
        setStateValues({
            profile_image: "",
            first_name: "",
            last_name: "",
            email: "",
        });

        //parseamos el errorResponse:
        setErrorResponse({});
        //parseamos el mensaje de creacion exitosa:
        if (msgSucceEdition) {
            setMsgSucceEdition(!msgSucceEdition);
        }

        openEditlModal();
    }
    //----------------------------------------------------------------------//






    async function handleSubmit(e: any) {
        e.preventDefault();

        //form-data y update del img, nombre, apellido y email del usuario:
        const f = new FormData();
        if (stateValues.profile_image !== "") {
            f.append("profile_image", stateValues.profile_image);
        }
        if (stateValues.first_name !== "") {
            f.append("first_name", stateValues.first_name);
        }
        if (stateValues.last_name !== "") {
            f.append("last_name", stateValues.last_name);
        }
        if (stateValues.email !== "") {
            f.append("email", stateValues.email);
        }

        // //comprobamos si el form data tiene info y realizamos el PATCH de ser necesario:
        // if (f.get("profile_image") || f.get("first_name") || f.get("last_name") || f.get("email")) {
            var response = await PatchProfessional(f, professional.id); // usamos VAR y no CONST para poder axceder desde un scope mas afuera !!
        // }


        //delete de idiomas del usuario: (si es que se seleccionó alguno)
        if (selectProfLangValues.length > 0) {
            selectProfLangValues.forEach(proflang => {
                deleteProfessionalLanguage(proflang.value);
            });
        }

        //post de idiomas nuevos al usuario: (si es que se seleccionó alguno)
        if (selectLangValues.length > 0) {
            selectLangValues.forEach(lang => {
                postProfessionalLanguage({
                    professional_id: professional.id,
                    language_id: lang.value
                });
            });
        }

        console.log(response);//-----
        if (response.data || selectProfLangValues.length > 0 || selectLangValues.length > 0) {

            //parseamos el errorResponse:
            setErrorResponse({});

            //actualizamos la lista en el home con los cambios en la paginacion que esté el usuario:
            const prof = await getProfessionals(actualPage);
            setProfessionalsList(prof.data.results);

            setMsgSucceEdition(!msgSucceEdition);

        } else if(Object.values(response).length>0) {

            setErrorResponse(response);

        }


    }




    return (

        <Modal animation="false" isOpen={stateEditModal} style={modalStyle} >

            <ModalBody style={modalBody} >

                <div className="modal_header" >
                    <h4>Editar profesional</h4>
                    <Button onClick={() => close()}  >X</Button>
                </div>

                {
                    msgSucceEdition
                        ?
                        <div className="msg_exito" > <h3>Cambios realizados con éxito.</h3> </div>
                        :
                        <form onSubmit={(e) => { handleSubmit(e) }} className="form_modal_container" >
                            <div className="form_modal_div" >
                                <p>Imagen de perfil</p>
                                {(stateErrors.profile_image) ? <p className="p_error_msg" >seleccione una imagen png o jpg</p> : null}
                                <input type="file" name="profile_image " accept="image/png, image/jpeg" onChange={(e) => handleProfileImage(e)} />
                            </div>

                            <div className="form_modal_div" >
                                <p>Nombre</p>
                                {(stateErrors.first_name) ? <p className="p_error_msg" >caracteres min:1 max:30</p> : null}
                                <input className="form_imput" type="text" name="first_name " placeholder="Nombre..." onChange={(e) => { handleChangeFirstName(e) }} />
                            </div>

                            <div className="form_modal_div" >
                                <p>Apellido</p>
                                {(stateErrors.last_name) ? <p className="p_error_msg" >caracteres min:1 max:30</p> : null}
                                <input className="form_imput" type="text" name="last_name " placeholder="Apellido..." onChange={(e) => { handleChangeLasttName(e) }} />
                            </div>

                            <div className="form_modal_div" >
                                <p>Email</p>
                                {(stateErrors.email) ? <p className="p_error_msg" >caracteres min:1 max:254</p> : null}
                                <input className="form_imput" type="email" name="email" placeholder="Email..." onChange={(e) => handleChangeEmail(e)} />
                            </div>


                            <div className="form_modal_div" >
                                <p>Eliminar idiomas existentes:</p>
                                <Select
                                    options={selectProfLangOptions}
                                    isMulti={true}
                                    isSearchable={true}
                                    onChange={(e) => { handleChangeSelectProfLang(e) }}
                                ></Select>
                            </div>


                            <div className="form_modal_div" >
                                <p>Agregar nuevos idiomas:</p>
                                <Select
                                    options={selectLanguagesOptions}
                                    isMulti={true}
                                    isSearchable={true}
                                    onChange={(e) => { handleChangeSelectLanguages(e) }}
                                ></Select>
                            </div>

                            {
                                Object.values(errorResponse).length > 0
                                    ?
                                    <div>
                                        {
                                            Object.values(errorResponse).map(prop => <p className="p_error_msg"  > {prop} </p>)
                                        }
                                    </div>
                                    :
                                    null
                            }

                            {
                                ( (stateValues.email === "" && stateValues.first_name === "" && stateValues.last_name === "" && stateValues.profile_image === "" && selectProfLangValues.length === 0 && selectLangValues.length === 0)  || stateErrors.email || stateErrors.first_name || stateErrors.last_name )
                                    ?
                                    null
                                    :
                                    <div>
                                        <Button type="submit" >Editar Profesional</Button>
                                    </div>
                            }


                        </form>
                }

            </ModalBody>

        </Modal>

    );

}

export default EditProfModal;