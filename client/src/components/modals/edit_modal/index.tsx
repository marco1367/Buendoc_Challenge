import "./index.css";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import Select from "react-select";
//import interfaces:
import { editModalProps } from "../../../interfaces";





function EditProfModal({openEditlModal, stateEditModal}:editModalProps):JSX.Element {
    //-----Local states:------//
    const [stateValues, setStateValues] = useState({
        profile_image:"",
        first_name:"",
        last_name:"",
        email:"",
    });
    //------------------------//


    //----Handle Changes:----//
    function handleChangeFirstName(e:any):void {
        setStateValues({
            ...stateValues,
            first_name: e.target.value
        })
    }
    //-----------------------//
    // console.log(stateValues);//----




    return (
        
        <Modal animation="false" isOpen={stateEditModal} >

            <ModalBody>

                <div>
                    <Button onClick={()=>openEditlModal()}  >X</Button>
                </div>
                
                <form >
                    <div>
                        <input type="file" name="profile_image " accept="image/png, image/jpeg"  />
                    </div>

                    <div>
                        <input type="text" name="first_name " placeholder="Nombre..." onChange={(e)=>{handleChangeFirstName(e)}} />
                    </div>

                    <div>
                        <input type="text" name="last_name " placeholder="Apellido..." />
                    </div>

                    <div>
                        <input type="email" name="email" placeholder="Email..." />
                    </div>

                    <div>
                        <Select 
                            // options={selectOptions} 
                            isMulti={true}
                            isSearchable={true}
                            // onChange={(e)=>{handleChangeSelect(e)}}
                        ></Select>
                    </div>

                    <div>
                        <Button type="submit" >Editar Profesional</Button>
                    </div>

                </form>

            </ModalBody>

        </Modal>

    );

}
  
  export default EditProfModal;