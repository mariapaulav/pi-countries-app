import React, { useEffect } from 'react';
import { getCountreDetail } from "../../store/actions"
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from "react-router-dom";
import { Link } from 'react-router-dom';


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
        <div>
          <h1>{detail.name}</h1>
          <div>
            <img src={detail.flag} alt={detail.name} width="210" height="150" />
            <div>
            <p>Capital: {detail.capital}</p>
            <p>Region: {detail.region}</p>
            <p>Subregion: {detail.subregion}</p>
            <p>Area: {detail.area}</p>
            <p>Population: {detail.population}</p>
            </div>
          </div>
          {detail.activities && detail.activities.length ? (
            <>
              <h3>Activities:</h3>
              <ul>
                {detail.activities.map((a) => {
                  return (
                    <div key={a.id} >
                      <h4> {a.name.toUpperCase()}</h4>
                      <p>Difficulty: {a.difficulty}</p>
                      <p>Duration: {a.duration} hours</p>
                      <p>Season: {a.season}</p>
                    </div>
                  );
                })}
              </ul>
              <Link to={"/createactivity"}>
                  <button>Create Activity</button>
              </Link>
              <Link to={"/home"}>
                  <button>Home</button>
              </Link>
            </>
          ) : (
            <div>
              <h3>Activities not found</h3>
              <Link to={"/createactivity"}>
                  <button>Create Activity</button>
              </Link>
            </div>
          )}
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