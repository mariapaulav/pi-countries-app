import React from "react";
import './paginado.css'

export default function Paginado ({countriesPerPage, countries , paginado}){
    const pagNumbers = []

    for (let i = 0; i < Math.ceil(countries/countriesPerPage); i++) {
        pagNumbers.push(i + 1)
    }

    return (
        <nav>
            <ul className="orders1">
            {pagNumbers && pagNumbers.map((number) =>{
                return <button
                className="btnpag "
                 key={number} 
                 onClick={()=> paginado(number)}>{number}</button>
            })}
            </ul>
        </nav>
    )
}