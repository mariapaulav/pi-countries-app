import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountries } from "../../store/actions";
import './searchBar.css'

export default function SearchBar() {
  const [search , setSearch] = useState('');
  let dispatch = useDispatch()


  function onInputChange(e){
    e.preventDefault();
    setSearch(e.target.value)
  }

  
  function onSubmit(e){
    e.preventDefault();
    dispatch(searchCountries(search))
    setSearch(''); // para que se borre el contenido del input
      
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

