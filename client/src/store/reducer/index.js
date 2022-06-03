import {GET_COUNTRE_DETAIL, 
     GET_COUNTRIES,
     ORDER_BY_CONTINENT, 
     ORDER_BY_NAME, 
     SEARCH_COUNTRIES,
     POST_ACTIVITY,
     ORDER_BY_POPULATION,
     FILTER_BY_ACTIVITY,
     GET_ACTIVITIES


    } from '../actions/index'

const initialState ={
    countries : [],
    filteredCountries: [],
    activities : [],
    countreDetail: {}
}

function reducer(state = initialState, action){
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload, // no lo traigo con data pq estoy usando fetch 
                filteredCountries: action.payload // si se me esta llenando pero no me renderiza 
            };
        case SEARCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload // no lo traigo con data pq estoy usando fetch 
            };

        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            };

        case ORDER_BY_NAME:
            let orderedCountries = [...state.countries]
            orderedCountries = orderedCountries.sort((a,b) => {
                if(a.name < b.name){
                    return action.payload === 'A-Z' ? -1 : 1
                 }
                 if(a.name > b.name){
                     return action.payload === 'Z-A' ? -1 : 1
                }
                return 0;
            })
               return {
                 ...state,
                countries: orderedCountries,
            };
        case ORDER_BY_POPULATION:
            let orderedCountriesbyPopulation = [...state.countries]
            orderedCountriesbyPopulation = orderedCountriesbyPopulation.sort((a,b) => {
                if(a.population < b.population){
                    return action.payload === 'MIN' ? -1 : 1
                 }
                 if(a.population > b.population){
                     return action.payload === 'MAX' ? -1 : 1
                }
                return 0;
            })
               return {
                 ...state,
                countries: orderedCountriesbyPopulation,
            };
        case ORDER_BY_CONTINENT:
            if(action.payload) {
                return {
                    ...state,
                    countries: state.filteredCountries.filter(count => count.continent === action.payload)
                }
            }else{
                return {
                    ...state,
                }
            };

        // case ORDER_BY_CONTINENT:
        //     const allcountries = state.filteredCountries
        //     const filtercont = action.payload === 'All' ? allcountries : allcountries.filter(count => count.continent === action.payload)
        //         return {
        //             ...state,
        //             countries: filtercont
        //         };

        
        case FILTER_BY_ACTIVITY:
                return {
                    ...state,
                    countries: state.filteredCountries.filter(a => a.activities && a.activities.map(e => e.name).includes(action.payload)
                    )
                };    
                
        case GET_COUNTRE_DETAIL:
            return{
                ...state,
                countreDetail: action.payload
            };

        case POST_ACTIVITY:
            return {
                ...state,
            };

        

        


        default:
            return state;
    }
}

export default reducer;


