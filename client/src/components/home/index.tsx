import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
//import functions requests:
import {getProfessionals} from "../../functions_requests/index";
//import interfaces:
import {Professional} from "../../interfaces/index";
//import components:
import HomeTitles from "./titles";
import ProfessionalList from "./professional_list";
import Pagination from "../pagination";




function Home():JSX.Element {
    const [professionalsList, setProfessionalsList] = useState<Professional[]>([]);
    const [num, setNum] = useState<number>(1);
    const [actualPage, setActualPage] = useState<number>(1);
    



    useEffect( ():void=>{
        (async ()=>{
            
            const response1 = await getProfessionals();
            
            setProfessionalsList(response1.data.results);

            setNum(response1.data.count);
            

        })();
    },[]);


    //function callback pagination:
    function getProfessionalsPagination(e:any):void{

        (async (e)=>{
            const response1 = await getProfessionals(e);
            setProfessionalsList(response1.data.results);
        })(e.target.value);

    }



    return (
        <div id="home_principal_container" >

            <HomeTitles setProfessionalsList={setProfessionalsList} professionalsList={professionalsList} />

            <ProfessionalList professionals={professionalsList} actualPage={actualPage} setProfessionalsList={setProfessionalsList} setNum={setNum} />

            <Pagination num={num} getProfessionalsPagination={getProfessionalsPagination}  setActualPage={setActualPage} />


        </div>
    );
  }
  
  export default Home;