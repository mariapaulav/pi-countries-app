import React, { useEffect, useState } from 'react';
import { BsArrowClockwise } from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import {getCountries} from '../../store/actions/index'
import Countre from '../countre/countre';
import Order from '../order/order';
import SearchBar from '../searchBar/searchBar';
import { Link } from 'react-router-dom';
import OrderContinent from '../order/orderContinent';
import OrderByPopulation from '../order/orderByPopulation';
import OrderActivity from '../order/orderActivity';
import Paginado from '../order/paginado';

import './home.css'


export default function Home (){

    let countries = useSelector((state)=> state.countries)
    // con use selector me traigo me traigo la parte que necesito de mi estado, lo que hacia con mapStateto...
    let dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)
    // aca las pagina actual que es 1 

    const [countriesPerPage] = useState(10)
    // aca cuantas quiero por pagina 

    const indexOfLastCountry = currentPage * countriesPerPage // saber cual es la posicion del ultimo country // 9

    const indexofFirstCoutry = indexOfLastCountry - countriesPerPage // saber la posicion del primer country //   0

    const currentCountry = countries.slice(indexofFirstCoutry, indexOfLastCountry) // me guarde los countries de una pagina // toma esos indices 

    // me ayuda al renderizado 
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
    
    // dispacha la accion que se trae a los personajes 
    useEffect(()=> {
        dispatch(getCountries())
    },[dispatch])


    return <div className='bodyhome'>
        <SearchBar 
          setCurrentPage = {setCurrentPage}
        />
        <Link to = 'createactivity'>
         <button>Create Activity </button>
        </Link>
        <div className='orders'>
        <Order/>
        <OrderContinent/>
        <OrderByPopulation/>
        <OrderActivity
         setCurrentPage = {setCurrentPage}
         />
        
        <a href="http://localhost:3000/home" className='arefhome'> <BsArrowClockwise /> </a>
        </div>
        {
      currentCountry.map((count) => {
        return (
          <Countre
            key={count.id}
            id={count.id}
            name={count.name}
            flag={count.flag}
            continent={count.continent}
            population={count.population}
          />
        )
      })
    }
    <Paginado
          countriesPerPage={countriesPerPage}
          countries ={countries.length}
          paginado ={paginado}
    />
    

  </div>
}


