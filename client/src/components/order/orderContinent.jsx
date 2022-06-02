//import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { orderByContinent } from "../../store/actions"

export default function OrderContinent(){

    const dispatch = useDispatch()

    function onSelectChange(e){
        e.preventDefault()
        dispatch(orderByContinent(e.target.value)) // ordeno por el value que me pasen 
    }

   return (
       <div> 
       <label htmlFor="select">Filter by Continent</label>
        <select name="select" defaultValue={'DEFAULT'} onChange={onSelectChange} >
            <option value='DEFAULT'  disabled defaultValue > All</option>
            {/* <option value='All'>All</option> */}
            <option value='Africa'>Africa</option>
            <option value='Antarctica'>Antarctica</option>
            <option value='Asia'>Asia</option>
            <option value='North America'>North America</option>
            <option value='Oceania'>Oceania</option>
            <option value='South America'>South America</option>
        </select>
        </div>
        )
    
}
