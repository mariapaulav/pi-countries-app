import axios from 'axios' // nunca olvidar que lo debo importar sin los { } 
import swal from 'sweetalert';
import dotenv from 'dotenv'
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const SEARCH_COUNTRIES = 'SEARCH_COUNTRIES';
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_CONTINENT = 'ORDER_BY_CONTINENT';
export const GET_COUNTRE_DETAIL = 'GET_COUNTRE_DETAIL';
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const REMOVE_ACTIVITY_DETAIL= 'REMOVE_ACTIVITY_DETAIL';


dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3002/';



export function getCountries(){
    return async function (dispatch){
        try {
            let json = await axios.get('/country');
            return dispatch({
                type:GET_COUNTRIES,
                payload: json.data,
            })
        } catch (error) {
            console.log(error, 'errorGetCountries');
        }
    }
};


export function searchCountries(search){
    return async function (dispatch){
        try {
            const response = await axios.get(`/country?name=${search}`);
            dispatch({
                type: SEARCH_COUNTRIES,
                payload: response.data
            });
        } catch (error) {
            swal({
                title: "Oops",
                text: "Country not found",
                icon: "error",
                className: "red-bg",
            });
            console.log(error);
        }
    }
}

export function getActivities(){
    return async function (dispatch){
        try {
            const response = await axios.get('/activity/');
            dispatch({
                type: GET_ACTIVITIES,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function getCountreDetail(id){
    return async function (dispatch){
        try {
            let json = await axios.get(`/country/${id}`);
            return dispatch({ 
                type: GET_COUNTRE_DETAIL, 
                payload: json.data
            }); 
        } catch (error) {
            console.log(error, 'errorGetCountriesid');
        }
    }
};

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
            const response = await axios.post("/activity", payload);  
      return dispatch({ type: POST_ACTIVITY, payload: response });
        } catch (error) {
            console.log(error, 'post activity ');
        }
    };
  };

export function removeActivityDetail(id){
        try {
            const response =  axios.delete(`/activity/${id}`);
            return {
                type: REMOVE_ACTIVITY_DETAIL, 
                payload: id,
                response
            }
        } catch (error) {
            console.log(error, 'delete activity ');
        }
}