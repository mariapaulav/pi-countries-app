import React from "react";
import { Link } from 'react-router-dom';
import './countre.css'

export default function Countre ({name,flag, continent, id}){
    return (
    <div className="conta" >
        <Link to = {'country/' + id}>
            <img  src= {flag} className= 'imgF' alt= 'img not found' />
            <p className="arefCountry">{name}</p>
            <p className="arefCountry">{continent}</p>
        </Link>
    </div>
    )
}   
