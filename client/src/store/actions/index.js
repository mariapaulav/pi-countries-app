import axios from 'axios' // nunca olvidar que lo debo importar sin los { } 
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES';
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_CONTINENT = 'ORDER_BY_CONTINENT';
export const GET_COUNTRE_DETAIL = 'GET_COUNTRE_DETAIL';
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';

export function getCountries(){
    return function (dispatch){
        return fetch('http://localhost:3002/country/')
        .then(response => response.json())
        .then(json => {
            dispatch({type:GET_COUNTRIES, // dispatch para despachar la action, esto nos lo da redux thunk 
                payload: json})
        })
        .catch(error =>{
            console.log(error);
        })
    }
}

export function searchCountries(search){
    return function (dispatch){
        return fetch(`http://localhost:3002/country?name=${search}`)
        .then(response => response.json())
        .then(json => {
            dispatch({type:SEARCH_COUNTRIES, // dispatch para despachar la action, esto nos lo da redux thunk 
                payload: json})
        })
        .catch(error =>{
            alert('Country not found');
            console.log(error);
        })
    }
}

export function getCountreDetail(id){
    return function(dispatch) { // ME RETORNA UNA FUNCION // el dispatch me lo pasa redux directamente 
        return fetch(`http://localhost:3002/country/${id}`) // LLAMADO A LA API 
          .then(response => response.json()) // esto convierte de json a JS 
          .then(data => {
            dispatch({ type: GET_COUNTRE_DETAIL, 
                payload: data }); // su payload es el objeto que me devolvio la api 
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

export const postActivity = (payload) =>{
    return async () => {
        try {
            console.log(payload,'payload');
            const response = await axios.post("http://localhost:3002/activity/", payload) // dispara la ruta de post/ crea el personaje -> hacer el post del payload que es lo que llega en el front 
            console.log(response, 'response');
            return response;
        } catch (error) {
            console.log(error, 'postActivity');
        }
    }
}
