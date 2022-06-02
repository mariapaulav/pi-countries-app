import { applyMiddleware,compose, legacy_createStore as createStore} from 'redux'

import reducer from './reducer'
import thunk from 'redux-thunk' // para poder aplicar middlewares // para poder usar acciones con promesas 

const store = createStore(reducer, 
    compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store