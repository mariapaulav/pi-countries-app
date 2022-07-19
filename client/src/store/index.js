import { applyMiddleware,/* compose ,*/ legacy_createStore as createStore} from 'redux'

import reducer from './reducer'
import thunk from 'redux-thunk' 

const store = createStore(
    reducer, 
    applyMiddleware(thunk)
    // compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )
export default store


