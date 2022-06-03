import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountries } from "../../store/actions";
import './searchBar.css'

export default function SearchBar({setCurrentPage}) {
  // este estado es para almacenar lo que me pasen en la busqueda 
  const [search , setSearch] = useState('');// inicializo el valor de mi estado en un strng vacio
  let dispatch = useDispatch()

  function onSubmit(e){
    e.preventDefault();
    dispatch(searchCountries(search))
    setCurrentPage(1) // para que vaya a la pag 1 
    setSearch(''); // para que se borre el contenido del input
      
  }

  function onInputChange(e){
    e.preventDefault();
    setSearch(e.target.value)
  }

  return (
    <div>
        <form onSubmit={onSubmit}> 
            <input 
            className='inputBox'
            type = 'text' 
            onChange={onInputChange} 
            value = {search} 
            placeholder = 'Enter country name'
            />

            <input 
            className="btnSearch"
            type = 'submit' 
            value = 'Search'/>
        </form>
    </div>
  )
}

