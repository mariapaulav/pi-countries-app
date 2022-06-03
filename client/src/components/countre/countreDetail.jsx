import React, { useEffect } from 'react';
import { getCountreDetail } from "../../store/actions"
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
import './countreDetail.css'
import Header from '../header/header';


export default function CountreDetail (props){
    const { id } = useParams();
    // console.log(id);
    // console.log(props , 'props');
    // let idPrueba = props.match.params.id
    // console.log(idPrueba,'id prueba');
    let detail = useSelector((state)=> state.countreDetail)
    let dispatch = useDispatch()
  
    useEffect(()=> {
        dispatch(getCountreDetail(id))
    },[dispatch,id])

    

    return (
        <div className='bodydetail'>
          <Header/>
              <div className='order2detail'>
          <div>
            <div className='marginInfo1'>
          <h1>{detail.name}</h1>
          <p>{detail.id}</p>
          </div>
          <div className='ordersDetail'>
            <img className='marginFlag' src={detail.flag} alt={detail.name} width="350" height="250" />
            <div>
            <p>Capital: {detail.capital}</p>
            <p>Continent: {detail.continent}</p>
            <p>Subregion: {detail.subregion}</p>
            <p>Area: {detail.area} Km <sup>2</sup></p>
            <p>Population: {detail.population}</p>
            </div>
            </div>
          </div>

          {detail.activities && detail.activities.length ? (
            <>
            <div className='marginActivity'>
              <h1>Activities:</h1>
              <ul className='uldetail'>
                {detail.activities.map((a) => {
                  return (
                    <div key={a.id} className= 'ulactivitydetail'>
                      <h4> {a.name.toUpperCase()}</h4>
                      <p>Difficulty: {a.difficulty}</p>
                      <p>Duration: {a.duration} hours</p>
                      <p>Season: {a.season}</p>
                    </div>
                  );
                })}
              </ul>
              <Link to={"/createactivity"}>
                  <button className='btnCreate'>Create Other Activity</button>
          </Link>
              </div>
            </>
          ) : (
            <div className='marginActivity'>
              <h1>Activities not found</h1>
              <Link to={"/createactivity"}>
                  <button className='btnCreate'>Create Activity</button>
          </Link>
            </div>
          )}
             
          </div>
          <Link to={"/home"}>
                  <p className='linkhome'>Home</p>
              </Link>
        </div>
      );


    // return (
    //     <div>
    //         <div>{detail.name}</div>
    //         <img  src= {detail.flag} alt= 'img not found' width="210" height="150"/>
    //         <p>{detail.population}</p>
    //         <p>{detail.capital}</p>
            
    //         <Link to ='/home'>
    //         <button>home</button>
    //     </Link>
    //     </div>
    //     )
    
}