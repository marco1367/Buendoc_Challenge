import "./index.css";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
//import interfaces:
import { editModalProps, selectlanguagesOptions, Languages, ResponseAxiosProfessionalsLnaguages } from "../../../interfaces";
//import functions requests:
import { PatchProfessional, getProfessionals, getLanguages, getProfessionalsLanguages, deleteProfessionalLanguage, postProfessionalLanguage } from "../../../functions_requests";
//import styles modal:
import { modalStyle, modalBody } from "../styles"
//importaqmos componente Select de antds:
import 'antd/dist/antd.css';
import { Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


interface selectProfLangValuesinterf {
    value: number,
    key: number,
    label: string[]
}

interface LangNoDelete {
    id_relation: number,
    id_language: number
}

interface stateValuesEdit {
    profile_image: any,
    first_name: string,
    last_name: string,
    email: string,
}



function EditProfModal({ openEditlModal, stateEditModal, professional, professionals, actualPage, setProfessionalsList }: editModalProps): JSX.Element {
    //-----Local states:------//
    const [stateValues, setStateValues] = useState<stateValuesEdit>({
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
    //lista para select y valores por default:
    const [selectLanguagesOptions, setSelectLanguagesOptions] = useState([]);
    const [selectProfLangDefault, setSelectProfLangDefault] = useState([]);
    //selects: (valores seleccionados)
    const [selectProfLangValues, setSelectProfLangValues] = useState<selectProfLangValuesinterf[]>([]);

    //mensaje de edicion exitosa:
    const [msgSucceEdition, setMsgSucceEdition] = useState(false);
    //------------------------//
    //Select Languages Values:
    const { Option } = Select;




    //----------UseEfect:(initial data load)---------//
    useEffect((): void => {
        (async () => {
            //lead languages:
            const response = await getLanguages();
            setStateLangages(response.data);

            //load prof langauges:
            const response2 = await getProfessionalsLanguages(professional.id);
            setStateProfLangages(response2.data);

        })();
    }, [professionals, professional]);


    useEffect((): void => {

        //cargamos la lista para el Select
        let languages: any = [];
        stateLanguages.forEach((lang) => {
            languages.push(<Option value={lang.id} key={lang.id}  > {lang.name} </Option>)
        });
        setSelectLanguagesOptions(languages);

        //cargamos la lista dedefault values para el select:
        let languagesDefault: any = [];
        stateProfLanguages.forEach((proflang) => {
            languagesDefault.push({ value: proflang.language.id });
        });
        setSelectProfLangDefault(languagesDefault);


    }, [stateProfLanguages]);
    //-----------------------------------------------//





    //----Handle Changes:----//
    function handleChangeFirstName(e: any): void {
        setStateValues({
            ...stateValues,
            first_name: e.target.value
        })
    }

    function handleChangeLasttName(e: any): void {
        setStateValues({
            ...stateValues,
            last_name: e.target.value
        })
    }


    function handleChangeEmail(e: any): void {
        setStateValues({
            ...stateValues,
            email: e.target.value
        })
    }


    // function handleProfileImage(e: any): void {
    //     // console.log(e.target.files);//-----

    //     if (e.target.files.length === 0) {
    //         setStateValues({
    //             ...stateValues,
    //             profile_image: ""
    //         })
    //     } else {
    //         console.log(e.target.files[0]);//-----
    //         setStateValues({
    //             ...stateValues,
    //             profile_image: e.target.files[0]
    //         })
    //     }

    // }

    function handleChangeImgAnt(info: any) {
        // console.log(info.file);//-----

        // if (info.file.status !== 'uploading') {
        //     console.log(info.file);
        // }

        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setStateValues({
                ...stateValues,
                profile_image: info.file.originFileObj
            })

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

        if (info.file.status === "removed") {
            setStateValues({
                ...stateValues,
                profile_image: ""
            })
        }
    }


    function handleChangeSelect(values: any): void {
        console.log(values);//-----
        setSelectProfLangValues(values);
    }

    //--------------------------------------//





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

        //validacion de los datos ingresados en los inputs type="text":
        let errors = {
            profile_image: false,
            first_name: false,
            last_name: false,
            email: false,
        }
        if (stateValues.first_name !== "" && (stateValues.first_name.length < 1 || stateValues.first_name.length > 30)) {
            errors.first_name = true;
        }


        if (stateValues.last_name !== "" && (stateValues.last_name.length < 1 || stateValues.last_name.length > 30)) {
            errors.last_name = true;
        }


        if (stateValues.email !== "" && (stateValues.email.length < 1 || stateValues.email.length > 254 || (stateValues.email.includes("@") && stateValues.email.includes(".com")) === false)) {
            errors.email = true;
        }

        setStateErrors(errors);


        //idiomas a eliminar:
        let LanguagesNoDelete: LangNoDelete[] = [];
        stateProfLanguages.forEach((proflang) => {
            selectProfLangValues.forEach((lang) => {
                if (lang.value === proflang.language.id) {
                    LanguagesNoDelete.push({ id_relation: proflang.id, id_language: proflang.language.id });//guardamos el id de la relacion y del lenguaje;
                }
            });
        });

        let LanguagesToDelete: ResponseAxiosProfessionalsLnaguages[] = [];
        if (LanguagesNoDelete.length > 0) {
            LanguagesToDelete = stateProfLanguages;
            LanguagesNoDelete.forEach((lang1) => {

                LanguagesToDelete = LanguagesToDelete.filter(lang => lang.language.id !== lang1.id_language)
            });
        }
        console.log(LanguagesToDelete);//-----


        //idiomas a agregar:
        let languagesToAdd: selectProfLangValuesinterf[] = selectProfLangValues;
        LanguagesNoDelete.forEach(lang1 => {
            languagesToAdd = languagesToAdd.filter(lang2 => lang2.value !== lang1.id_language);
        });
        console.log(languagesToAdd);//-----



        //comprovamos que no haya ningun error en las validaciones para continuar:
        if (!errors.first_name && !errors.last_name && !errors.email) {
            // console.log("No hay errores");//-----

            let changes: boolean = false; //variable para saber si se realizaron cambios.

            //comprobamos si se ingres?? info en los imputs:
            if (stateValues.profile_image !== "" || stateValues.first_name !== "" || stateValues.last_name !== "" || stateValues.email !== "") {
                // console.log("hay info para el fomr-data");//-----

                //creamos y armamos el Form-Data a enviar:
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

                if (!response.data && Object.values(response).length > 0) {
                    setErrorResponse(response);
                    return; //cortamos la ejecucion.
                } else {
                    changes = true;
                }

            }

            //comprobamos si hay idiamos para eliminar:
            if (LanguagesToDelete.length > 0) {
                // console.log("hay idiomas para eliminar");//-----

                LanguagesToDelete.forEach((proflang) => {
                    deleteProfessionalLanguage(proflang.id);
                });

                changes = true;
            }

            //comprobamos si hay idiamos para agregar:
            if (languagesToAdd.length > 0) {
                // console.log("hay idiomas para agregar")//-----

                languagesToAdd.forEach((lang) => {
                    postProfessionalLanguage({
                        professional_id: professional.id,
                        language_id: lang.value
                    });
                });

                changes = true;
            }

            //comprobamos si se efectuo algun cambio, mostramos el mensaje y actualizamos la lista en el home:
            if (changes) {
                setMsgSucceEdition(!msgSucceEdition);
                const prof = await getProfessionals(actualPage);
                setProfessionalsList(prof.data.results);
            }


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
                        <div className="msg_exito" > <h3>Cambios realizados con ??xito.</h3> </div>
                        :
                        <form onSubmit={(e) => { handleSubmit(e) }} className="form_modal_container" >

                            <div className="form_modal_div" >
                                <p>Imagen de perfil</p>
                                <div className="div_file_img_delete_modal" >
                                    {(stateErrors.profile_image) ? <p className="p_error_msg" >seleccione una imagen png o jpg</p> : null}

                                    {/* <input type="file" name="profile_image " accept="image/png, image/jpeg" onChange={(e) => handleProfileImage(e)} /> */}
                                    <Upload
                                        accept=".jpg, .jpeg, .png"
                                        name="file"
                                        maxCount={1}
                                        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                        onChange={file => handleChangeImgAnt(file)}
                                    > <Button type="button" id="bttn_upLoad_img" > <UploadOutlined style={{ color: "grey" }} 
                                    /> <p>Subir imagen de perfil</p>  </Button> </Upload>

                                    {
                                        stateValues.profile_image !== ""
                                            ?
                                            <img src={URL.createObjectURL(stateValues.profile_image)} className="img_delet_modal" />
                                            :
                                            <img src={professional.profile_image} className="img_delet_modal" />
                                    }
                                </div>
                            </div>

                            <div className="form_modal_div" >
                                <p>Nombre</p>
                                {(stateErrors.first_name) ? <p className="p_error_msg" >caracteres min:1 max:30</p> : null}
                                <input className="form_imput" type="text" name="first_name " placeholder={professional.first_name} onChange={(e) => { handleChangeFirstName(e) }} />
                            </div>

                            <div className="form_modal_div" >
                                <p>Apellido</p>
                                {(stateErrors.last_name) ? <p className="p_error_msg" >caracteres min:1 max:30</p> : null}
                                <input className="form_imput" type="text" name="last_name " placeholder={professional.last_name} onChange={(e) => { handleChangeLasttName(e) }} />
                            </div>

                            <div className="form_modal_div" >
                                <p>Email</p>
                                {(stateErrors.email) ? <p className="p_error_msg" >caracteres min:1 max:254, debe contener @ y .com</p> : null}
                                <input className="form_imput" type="text" name="email" placeholder={professional.email} onChange={(e) => handleChangeEmail(e)} />
                            </div>





                            <div className="form_modal_div" >
                                <p>Idiomas:</p>
                                <Select
                                    mode="multiple"
                                    size="large"
                                    showSearch
                                    optionFilterProp="children"
                                    labelInValue
                                    defaultValue={selectProfLangDefault}
                                    allowClear
                                    style={{ width: '100%' }}
                                    onChange={handleChangeSelect}
                                >
                                    {selectLanguagesOptions}
                                </Select>
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


                            <div>
                                <Button
                                    type="submit"
                                >Editar Profesional</Button>
                            </div>



                        </form>
                }

            </ModalBody>

        </Modal>

    );

}

export default EditProfModal;