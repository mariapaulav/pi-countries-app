import React from "react";

export default function Paginado ({countriesPerPage, countries , paginado}){
    const pagNumbers = []

    for (let i = 1; i < Math.ceil(countries/countriesPerPage); i++) {
        pagNumbers.push(i)
    }

    return (
        <nav>
            <ul>
            {pagNumbers && pagNumbers.map((number) =>{
                return <button key={number} onClick={()=> paginado(number)}>{number}</button>
            })}
            </ul>
        </nav>
    )
}