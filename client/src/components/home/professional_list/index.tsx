import "./index.css";
//import interfaces:
import { Professional } from "../../../interfaces";
//import components:
import ProfessionalCard from "../professional_card/index";


interface Props{
    professionals:Professional[],
    actualPage:number,
    setProfessionalsList:Function,
    setNum:Function
}


function ProfessionalList({professionals, actualPage, setProfessionalsList, setNum}:Props):JSX.Element {


    return (
        <div id="professional_lins_container" >
            {
                professionals.map(prof => <ProfessionalCard key={prof.id} professional={prof} professionals={professionals} actualPage={actualPage} setProfessionalsList={setProfessionalsList} setNum={setNum} /> )
            }
        </div>
    );
  }
  
  export default ProfessionalList;