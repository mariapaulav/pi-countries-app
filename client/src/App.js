import {Route, Switch} from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import Home from './components/home/home'
import AddActivity from './components/addActivity/addActivity';
import CountreDetail from './components/countre/countreDetail';

function App() {
  return (
    <div>
  <Switch>
    <Route exact path = '/'>
        <LandingPage/>
    </Route>

    <Route exact path = '/home'>
        <Home/>
    </Route>

    <Route exact path = '/createactivity'>
        <AddActivity/>
    </Route>

    <Route exact path = '/country/:id'>
        <CountreDetail/>
    </Route>
  </Switch>
    </div>
  );
}

export default App;
