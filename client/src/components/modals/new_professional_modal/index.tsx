import "./index.css";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import Select from "react-select";
//import interfaces:
import { newProfModal, Languages, selectlanguagesOptions } from "../../../interfaces";
//import functions requests:
import { postProfessional, getLanguages, postProfessionalLanguage, getProfessionalsLanguages } from "../../../functions_requests/index";



const selectOptions: selectlanguagesOptions[] = [];


interface stateErrorsResult {
    profile_image: string[],
    first_name: string[],
    last_name: string[],
    email: string[],
    non_field_errors: string[],
}



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
            const newProfessionalList = [response.data].concat(professionalsList);
            setProfessionalsList(newProfessionalList);

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


        }

    }





    return (

        <Modal animation="false" isOpen={stateNewProfModal} >


            <ModalBody>

                <div>
                    <Button onClick={() => { close() }} >X</Button>
                </div>

                <form onSubmit={(e) => { handleSubmit(e) }} >
                    <div>
                        {(errorResponse.profile_image && errorResponse.profile_image[0] !== "") ? <p>{errorResponse.profile_image[0]}</p> : null}
                        <input type="file" name="profile_image " accept="image/png, image/jpeg" onChange={(e) => { handleProfileImage(e) }} />
                    </div>

                    <div>
                        {(stateErrors.first_name) ? <p>Campo requerido, caracteres min:1 max:30</p> : null}
                        {(errorResponse.first_name && errorResponse.first_name[0] !== "") ? <p> {errorResponse.first_name[0]} </p> : null}
                        <input type="text" name="first_name " placeholder="Nombre..." onChange={(e) => { handleChangeFirstName(e) }} />
                    </div>

                    <div>
                        {(stateErrors.last_name) ? <p>Campo requerido, caracteres min:1 max:30</p> : null}
                        {(errorResponse.last_name && errorResponse.last_name[0] !== "") ? <p> {errorResponse.last_name[0]} </p> : null}
                        <input type="text" name="last_name " placeholder="Apellido..." onChange={(e) => { handleChangeLasttName(e) }} />
                    </div>

                    <div>
                        {(stateErrors.email) ? <p>Campo requerido, caracteres min:1 max:30</p> : null}
                        {(errorResponse.email && errorResponse.email[0] !== "") ? <p> {errorResponse.email[0]} </p> : null}
                        {(errorResponse.non_field_errors && errorResponse.non_field_errors[0] !== "") ? <p> {errorResponse.non_field_errors[0]} </p> : null}
                        <input type="email" name="email" placeholder="Email..." onChange={(e) => { handleChangeEmail(e) }} />
                    </div>


                    <div>
                        <Select
                            options={selectOptions}
                            isMulti={true}
                            isSearchable={true}
                            onChange={(e) => { handleChangeSelect(e) }}
                        ></Select>
                    </div>


                    <div>
                        <Button type="submit" >Agregar Profesional</Button>
                    </div>

                </form>

            </ModalBody>

        </Modal>

    );

}

export default NewProfModal;