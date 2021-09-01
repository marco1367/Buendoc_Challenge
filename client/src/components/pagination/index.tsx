import "./index.css";



interface paginationProps{
    num:number,
    getProfessionalsPagination:Function,
}


function Pagination({num, getProfessionalsPagination}:paginationProps):JSX.Element {

    let numArray:number[] = [];

    for( let i:number=1 ; i<=num ; i++ ){
        numArray.push(i);
    }

    return (
        <div id="pagination_container" >
            {
                numArray.map( n => <button key={n} value={n} onClick={(e)=>{getProfessionalsPagination(e)}} > {n} </button> )
            }
        </div>
    );
  }
  
  export default Pagination;