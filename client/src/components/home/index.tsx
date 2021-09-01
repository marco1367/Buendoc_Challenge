import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
//import functions requests:
import {getProfessionals} from "../../functions_requests/index";
//import interfaces:
import {Professional, ResultAxiosProfessionals} from "../../interfaces/index";
//import components:
import HomeTitles from "./titles";
import ProfessionalList from "./professional_list";
import Pagination from "../pagination";




function Home():JSX.Element {
    const [professionalsList, setProfessionalsList] = useState<Professional[]>([]);
    const [num, setNum] = useState(1);
    



    useEffect( ():void=>{
        (async ()=>{
            
            const response1 = await getProfessionals();
            
            setProfessionalsList(response1.data.results);
            let next:null|string = response1.data.next;

            while(next!==null){
                setNum(num +1)
                const response2 = await axios.get<ResultAxiosProfessionals>(`http://challenge.radlena.com/api/v1/professionals/?page=${num+1}`);
                next = response2.data.next;
            }

        })();
    },[]);


    //function callback pagination:
    function getProfessionalsPagination(e:any):void{
        console.log(e.target.value);

        (async (e)=>{
            const response1 = await getProfessionals(e);
            setProfessionalsList(response1.data.results);
        })();

    }




    return (
        <div id="home_principal_container" >

            <HomeTitles setProfessionalsList={setProfessionalsList} professionalsList={professionalsList} />

            <ProfessionalList professionals={professionalsList} />

            <Pagination num={num} getProfessionalsPagination={getProfessionalsPagination} />


        </div>
    );
  }
  
  export default Home;