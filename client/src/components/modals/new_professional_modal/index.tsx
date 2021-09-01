import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import Select from "react-select";
//import interfaces:
import { newProfModal, Languages, selectlanguagesOptions, professionalLanguage } from "../../../interfaces";
//import functions requests:
import {postProfessional, getProfessionals, getLanguages, postProfessionalLanguage} from "../../../functions_requests/index";



const selectOptions:selectlanguagesOptions[] = [];



function NewProfModal({stateNewProfModal, openNewProfModal, setProfessionalsList, professionalsList}:newProfModal):JSX.Element {
    //Local states:
    const [stateValues, setStateValues] = useState({
        profile_image:"",
        first_name:"",
        last_name:"",
        email:"",
    });

    const [stateLanguages, setStateLangages] = useState<Languages[]>([]);
    const [stateSelectLanguages, setStateSelectLanguages] = useState<selectlanguagesOptions[]>([]);

    const [stateErrors, setStateErrors] = useState({
        profile_image:"",
        first_name:"",
        last_name:"",
        email:"",
        // languages:"",
    })


    //---USE EFECT:----//
    useEffect( ():void=>{
        (async ()=>{
            
            const response = await getLanguages();
            setStateLangages(response.data);

        })();
    },[]);


    useEffect( ():void=>{
        
        stateLanguages.forEach((lang)=>{
            selectOptions.push({
                value:lang.id,
                label:lang.name
            })
        });

    },[stateLanguages]);
    //--------------//

    

    //HandleChange functions:
    function handleChangeFirstName(e:any):void {
        setStateValues({
            ...stateValues,
            first_name: e.target.value
        })
    }

    function handleChangeLasttName(e:any):void {
        setStateValues({
            ...stateValues,
            last_name: e.target.value
        })
    }

    function handleChangeEmail(e:any):void {
        setStateValues({
            ...stateValues,
            email: e.target.value
        })
    }

    function handleProfileImage(e:any):void {
        setStateValues({
            ...stateValues,
            profile_image: e.target.files[0]
        })
    }

    function handleChangeSelect(e:any):void {
        setStateSelectLanguages(e);
    }
    //---------------------//

    


    async function handleSubmit(e:any) {
        e.preventDefault();

        const f = new FormData();
        f.append("profile_image", stateValues.profile_image);
        f.append("first_name", stateValues.first_name);
        f.append("last_name", stateValues.last_name);
        f.append("email", stateValues.email);

        //post new professional:
        const response = await postProfessional(f);

        
        //posts professional_languages:
        stateSelectLanguages.forEach((lang)=>{
            postProfessionalLanguage({
                professional_id: response.data.id,
                language_id: lang.value,
            })
        });
        
        //upDate professionalLinst in home:
        const newProfessionalList = [response.data].concat(professionalsList);
        setProfessionalsList(newProfessionalList);
    }




    return (
        
        <Modal animation="false" isOpen={stateNewProfModal} >

            <ModalBody>

                <div>
                    <Button onClick={() => { openNewProfModal() }} >X</Button>
                </div>
                
                <form onSubmit={(e)=>{handleSubmit(e)}} >
                    <div>
                        <input type="file" name="profile_image " accept="image/png, image/jpeg" onChange={(e)=>{handleProfileImage(e)}} />
                    </div>

                    <div>
                        <input type="text" name="first_name " placeholder="Nombre..." onChange={(e)=>{handleChangeFirstName(e)}} />
                    </div>

                    <div>
                        <input type="text" name="last_name " placeholder="Apellido..." onChange={(e)=>{handleChangeLasttName(e)}} />
                    </div>

                    <div>
                        <input type="text" name="email" placeholder="Email..." onChange={(e)=>{handleChangeEmail(e)}} />
                    </div>

                    <div>
                        <Select 
                            options={selectOptions} 
                            isMulti={true}
                            isSearchable={true}
                            onChange={(e)=>{handleChangeSelect(e)}}
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