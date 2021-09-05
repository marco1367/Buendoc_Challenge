import "./index.css";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import Select from "react-select";
//import interfaces:
import { editModalProps, selectlanguagesOptions, Languages, ResponseAxiosProfessionalsLnaguages } from "../../../interfaces";
//import functions requests:
import { PatchProfessional, getProfessionals, getLanguages, getProfessionalsLanguages } from "../../../functions_requests";





function EditProfModal({ openEditlModal, stateEditModal, professional, actualPage, setProfessionalsList }: editModalProps): JSX.Element {
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
    //------------------------//



    // //costs for selectors components:
    // const selectLangOptions: selectlanguagesOptions[] = [];
    // let selectProfLangOptions: selectlanguagesOptions[] = [];



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
    }, []);

    useEffect((): void => {
        //carga de lenguajes que tiene el profecional:
        let proflanguages:selectlanguagesOptions[] = []; 
        stateProfLanguages.forEach((proflang) => {
            proflanguages.push({
                value: proflang.language.id,
                label: proflang.language.name
            })
        });

        setSelectProfLangOptions(proflanguages);


        //carga de lenguajes q no tiene el profesional:
        let arrayLanguages:Languages[] = stateLanguages;

        stateProfLanguages.forEach((proflang)=>{
            arrayLanguages = arrayLanguages.filter( lang => lang.id !== proflang.language.id );
        })
        
        let selectLanguages:selectlanguagesOptions[] = []; 
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

        if (e.target.files.length === 0) {
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

        openEditlModal();
    }
    //----------------------------------------------------------------------//



    async function handleSubmit(e: any) {
        e.preventDefault();

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

        const response = await PatchProfessional(f, professional.id);

        if (response.data) {

            //parseamos el errorResponse:
            setErrorResponse({});

            const prof = await getProfessionals(actualPage);

            setProfessionalsList(prof.data.results);
        } else {

            setErrorResponse(response);

        }


    }




    return (

        <Modal animation="false" isOpen={stateEditModal} >

            <ModalBody>

                <div>
                    <Button onClick={() => close()}  >X</Button>
                </div>

                <form onSubmit={(e) => { handleSubmit(e) }} >
                    <div>
                        {(stateErrors.profile_image) ? <p>Campo requerido: seleccione una imagen png o jpg</p> : null}
                        <input type="file" name="profile_image " accept="image/png, image/jpeg" onChange={(e) => handleProfileImage(e)} />
                    </div>

                    <div>
                        {(stateErrors.first_name) ? <p>Campo requerido, caracteres min:1 max:30</p> : null}
                        <input type="text" name="first_name " placeholder="Nombre..." onChange={(e) => { handleChangeFirstName(e) }} />
                    </div>

                    <div>
                        {(stateErrors.last_name) ? <p>Campo requerido, caracteres min:1 max:30</p> : null}
                        <input type="text" name="last_name " placeholder="Apellido..." onChange={(e) => { handleChangeLasttName(e) }} />
                    </div>

                    <div>
                        {(stateErrors.email) ? <p>Campo requerido, caracteres min:1 max:254</p> : null}
                        <input type="email" name="email" placeholder="Email..." onChange={(e) => handleChangeEmail(e)} />
                    </div>


                    <div>
                        <p>Seleccione idiomas a elminar:</p>
                        <Select
                            options={selectProfLangOptions}
                            isMulti={true}
                            isSearchable={true}
                        // onChange={(e)=>{handleChangeSelect(e)}}
                        ></Select>
                    </div>


                    <div>
                        <p>Seleccione idiomas a agregar:</p>
                        <Select
                            options={selectLanguagesOptions} 
                            isMulti={true}
                            isSearchable={true}
                        // onChange={(e)=>{handleChangeSelect(e)}}
                        ></Select>
                    </div>

                    {
                        Object.values(errorResponse).length > 0
                            ?
                            <div>
                                {
                                    Object.values(errorResponse).map(prop => <p> {prop} </p>)
                                }
                            </div>
                            :
                            null
                    }

                    <div>
                        <Button type="submit" >Editar Profesional</Button>
                    </div>

                </form>

            </ModalBody>

        </Modal>

    );

}

export default EditProfModal;