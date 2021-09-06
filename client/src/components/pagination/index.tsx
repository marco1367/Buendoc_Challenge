import { Button } from "reactstrap";
import "./index.css";



interface paginationProps{
    num:number,
    getProfessionalsPagination:Function,
    setActualPage:Function,
    actualPage:number
}


function Pagination({actualPage, num, getProfessionalsPagination, setActualPage}:paginationProps):JSX.Element {

    const numberPages:number = Math.ceil(num/10);
    let numArray:number[] = [];
    for( let i:number=1 ; i<=numberPages ; i++ ){
        numArray.push(i);
    }


    function onClick(e:any):void{
        setActualPage(e.target.value);
        getProfessionalsPagination(e)
    }



    return (
        <div id="pagination_container" >
            {
                // numArray.map( n => <button key={n} value={n} onClick={(e)=>{getProfessionalsPagination(e)}} > {n} </button> )
                numArray.map( n => <button 
                                        key={n} value={n} onClick={(e)=>{onClick(e)}}  
                                        className="bttn_basic_style bttn_pagination"  
                                        id={ n==actualPage ? "bttn_pagination_active" : undefined }
                                    > {n} </button> )
            }
        </div>
    );
  }
  
  export default Pagination;