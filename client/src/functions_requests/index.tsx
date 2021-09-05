import axios from "axios";
import { ResultAxiosProfessionals, 
        ResponseAxiosProfessionalsLnaguages, 
        newProfessional, Languages, 
        professionalLanguage 
} from "../interfaces";




export  async function getProfessionals(num?:number){
    
    if(!num){
        const response = await axios.get<ResultAxiosProfessionals>("http://challenge.radlena.com/api/v1/professionals/");
        return response;
    }else{
        const response = await axios.get<ResultAxiosProfessionals>(`http://challenge.radlena.com/api/v1/professionals/?page=${num}`);
        return response;
    }

}


export async function getLanguages() {
    const response = axios.get<Languages[]>("http://challenge.radlena.com/api/v1/languages/");
    return response;
}


export  async function getProfessionalsLanguages(id:number){
    
    const response = await axios.get<ResponseAxiosProfessionalsLnaguages[]>(`http://challenge.radlena.com/api/v1/professional-languages/?professional__id=${id}`);
    return response;
    
}



export async function postProfessional(f:any){

        const response = await axios.post("http://challenge.radlena.com/api/v1/professionals/", f).catch(e => {return e.response.data})
        return response;

}



export async function postProfessionalLanguage(obj:professionalLanguage){
    const response = await axios.post("http://challenge.radlena.com/api/v1/professional-languages/", obj);
}



export async function deleteProfessional(id:number){
    const response = await axios.delete(`http://challenge.radlena.com/api/v1/professionals/${id}/`);
}



export async function PatchProfessional(f:any,id:number){
    const response = await axios.patch(`http://challenge.radlena.com/api/v1/professionals/${id}/`, f).catch(e => {return e.response.data});
    console.log(response);//----
    return response;
}