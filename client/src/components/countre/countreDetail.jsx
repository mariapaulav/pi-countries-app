import React, {useEffect, useState} from 'react';
import { getCountreDetail, removeActivityDetail} from "../../store/actions"
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from "react-router-dom";
import { Link } from 'react-router-dom';
import './countreDetail.css'
import Header from '../header/header';


export default function CountreDetail (){
    const { id } = useParams();
    const [, setActivies] =useState([])
    let detail = useSelector((state)=> state.countreDetail)
    let dispatch = useDispatch()
    let activities = detail.activities
   

    function handleDeleteAcivity(e){
      activities = detail.activities.filter((a) => a.id !== e)
      detail.activities = activities
      setActivies(activities)
    }

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

          {activities && activities.length ? (
            <>
            <div className='marginActivity'>
              <h1>Activities:</h1>
              <ul className='uldetail'>
                {activities.map((activity) => {
                  return (
                    <div key={activity.id} className= 'ulactivitydetail'>
                      <h4> {activity.name.toUpperCase()}
                      <button 
                      className='btncreate2' 
                      value = {activity.id} 
                      onClick = {()=> {removeActivityDetail(activity.id) ; handleDeleteAcivity(activity.id)} }
                      >x</button>
                      </h4>
                      <p>Difficulty: {activity.difficulty}</p>
                      <p>Duration: {activity.duration} hours</p>
                      <p>Season: {activity.season}</p>
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
}