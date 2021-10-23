import './App.css';
import Appbar from './components/Appbar';
import Movies from './pages/Movies';
import { Route, Switch } from "react-router-dom";
import DetailedMovie from './pages/detailedMovie';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Appbar />
        <Switch>

          <Route exact path="/">
            <Movies />
          </Route>

          <Route path="/detail/:movieID">
            <DetailedMovie />
          </Route>
        </Switch>
      </div>
    </Router>
  )

}

export default App;
