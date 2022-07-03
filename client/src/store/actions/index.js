import axios from 'axios' // nunca olvidar que lo debo importar sin los { } 
import swal from 'sweetalert';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES';
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_CONTINENT = 'ORDER_BY_CONTINENT';
export const GET_COUNTRE_DETAIL = 'GET_COUNTRE_DETAIL';
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const REMOVE_ACTIVITY_DETAIL= 'REMOVE_ACTIVITY_DETAIL'

export function getCountries(){
    return function (dispatch){
        return fetch('http://localhost:3002/country/')
        .then(response => response.json())
        .then(json => {
            dispatch({type:GET_COUNTRIES, // dispatch para despachar la action 
                payload: json})
        })
        .catch(error =>{
            console.log(error, 'errorGetCountries');
        })
    }
}

export function searchCountries(search){
    return function (dispatch){
        return fetch(`http://localhost:3002/country?name=${search}`)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SEARCH_COUNTRIES, 
                payload: json})
        })
        .catch(error =>{
            swal({
                title: "Oops",
                text: "Country not found",
                icon: "error",
                className: "red-bg",
            });
            console.log(error);
        })
    }
}

export function getActivities(){
    return async function (dispatch){
        try {
            const response = await fetch('http://localhost:3002/activity/');
            const json = await response.json();
            dispatch({
                type: GET_ACTIVITIES,
                payload: json
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function getCountreDetail(id){
    return function(dispatch) { 
        return fetch(`http://localhost:3002/country/${id}`) 
          .then(response => response.json()) 
          .then(json => {
            dispatch({ type: GET_COUNTRE_DETAIL, 
                payload: json }); 
          })
      }
}

export function orderByName(order) {
    return {
      type: ORDER_BY_NAME,
      payload: order
    };
  };


  export function orderByContinent(continent){
    return  {
        type: ORDER_BY_CONTINENT,
        payload: continent
    }
}


export function orderByPopulation(order) {
    return {
      type: ORDER_BY_POPULATION,
      payload: order
    };
  };

export function filterByActivity(filter) {
    return {
      type: FILTER_BY_ACTIVITY,
      payload: filter
    };
  };

export function postActivity(payload) {
    return async (dispatch) => {
        try {
            console.log(payload,'payload');
            const response = await axios.post("http://localhost:3002/activity", payload);  
      return dispatch({ type: POST_ACTIVITY, payload: response });
        } catch (error) {
            console.log(error, 'post activity ');
        }
    };
  };

export function removeActivityDetail(id){
        try {
            const response =  axios.delete(`http://localhost:3002/activity/${id}`);
            return {
                type: REMOVE_ACTIVITY_DETAIL, 
                payload: id,
                response
            }
        } catch (error) {
            console.log(error, 'delete activity ');
        }
}