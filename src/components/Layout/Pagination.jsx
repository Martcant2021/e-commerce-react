import React from "react";

const Pagination = ({currentPage, totalPage, onPrevPage, onNextPage}) =>{


    return(
        <div>
            <button onClick={onPrevPage} disabled={currentPage === 1}>
                Anterior
            </button>
            <span >
                {currentPage} de {totalPage}
            </span>

            <button onClick={onNextPage} disabled={currentPage === totalPage}>
                Siguiente
            </button>
        </div>
    )





}

export default Pagination