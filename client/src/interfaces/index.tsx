

export interface Professional {
    id:number;
    profile_image:string;
    first_name:string;
    last_name:string;
    email:string;
    is_active:boolean;
}


export interface Languages {
    id:number,
    name:string,
    code:string,
    is_active:boolean
}


export interface ResultAxiosProfessionals {
    count:number;
    next:null|string;
    previous:null|string;
    results:Professional[]; // array of professionals interface.
}

export interface ResponseAxiosProfessionalsLnaguages {
    id:number,
    professional:Professional,
    language:Languages,
    created_at:string,
    modified_at:string
}


export interface cardProps{
    professional:Professional,
    professionals:Professional[],
    actualPage:number,
    setProfessionalsList:Function,
    setNum:Function
}


export interface detailModalProps{
    openDetailModal:Function,
    stateDetailModal:boolean,
    professional:Professional,
    // languages:ResponseAxiosProfessionalsLnaguages[]
}


export interface deleteModalProps {
    openDeletelModal:Function,
    stateDeleteModal:boolean,
    professional:Professional,
    actualPage:number,
    setProfessionalsList:Function,
    setNum:Function
}


export interface editModalProps {
    openEditlModal:Function,
    stateEditModal:boolean,
    professional:Professional,
    actualPage:number,
    setProfessionalsList:Function,
    professionals:Professional[]
}



export interface titleProps {
    setProfessionalsList:Function,
    professionalsList: Professional[],
    setNum:Function
}



export interface newProfModal {
    stateNewProfModal:boolean,
    openNewProfModal:Function,
    setProfessionalsList: Function,
    professionalsList:Professional[],
    setNum:Function
}



export interface newProfessional {
    profile_image:File|string,
    first_name:string,
    last_name:string,
    email:string,
}



export interface selectlanguagesOptions {
    value: number,
    label:string,
}


export interface professionalLanguage {
    professional_id:number,
    language_id:number,
}


export interface stateErrorsResult {
    profile_image: string[],
    first_name: string[],
    last_name: string[],
    email: string[],
    non_field_errors: string[],
}