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
import Header from '../header/header';

import './home.css'



export default function Home (){

    let countries = useSelector((state)=> state.countries)

    const [currentPage, setCurrentPage] = useState(1)
   
    const [countriesPerPage] = useState(10)
  
    const indexOfLastCountry = currentPage === 1 ? 9 :currentPage * countriesPerPage  // saber cual es la posicion del ultimo country // 9
    const indexofFirstCoutry = currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage // saber la posicion del primer country //   0
    const currentCountry = countries.slice(indexofFirstCoutry, indexOfLastCountry) // me guarde los countries de una pagina // 

    // me ayuda al renderizado 
    function pagination(pageNumber){
     setCurrentPage(pageNumber)
    } 

    let dispatch = useDispatch()

    //dispatch(getCountries())

    useEffect(()=> {
        dispatch(getCountries())
    },[dispatch])


    return <div className='bodyhome'>
        <Header/>
        <div className='ordersp'>
        <SearchBar 
        />
        <Link to = 'createactivity'>
           <button className='btnCreateAct'>Create Activity </button>
        </Link>
        </div>
        <div className='ordersp'>
        <Order/>
        <OrderContinent
        setCurrentPage = {setCurrentPage}
        currentPage = {currentPage}
        />
        <OrderByPopulation/>
        <OrderActivity
         setCurrentPage = {setCurrentPage}
         currentPage = {currentPage}
         />
        
        <a href="http://localhost:3000/home" className='arefhome'> <BsArrowClockwise /> </a>
        </div>
        <div className='orderCards'>
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
    </div>
    <Paginado
          countriesPerPage={countriesPerPage}
          countries ={countries.length}
          pagination ={pagination}
    />
    

  </div>
}


