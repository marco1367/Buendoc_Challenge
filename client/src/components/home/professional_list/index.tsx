import "./index.css";
//import interfaces:
import { Professional } from "../../../interfaces";
//import components:
import ProfessionalCard from "../professional_card/index";


interface Props{
    professionals:Professional[],
}


function ProfessionalList({professionals}:Props):JSX.Element {

    // console.log(professionals);//----

    return (
        <div id="professional_lins_container" >
            {
                professionals.map(prof => <ProfessionalCard key={prof.id} professional={prof} /> )
            }
        </div>
    );
  }
  
  export default ProfessionalList;