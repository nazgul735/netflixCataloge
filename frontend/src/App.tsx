import './App.css';
import Appbar from './components/Appbar';
import Movies from './pages/Movies';
import {BrowserRouter as Router , Redirect, Route, Switch} from "react-router-dom";
import DetailedMovie from './pages/detailedMovie';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import { StateType } from './redux/StateType';
function App() {
  const isLoggedIn = useSelector((state:StateType)=>state.isLoggedIn); 
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzQyZTM3OGRhZTFkZTMwODBiYjU3OCIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MzUwOTcyMzgsImV4cCI6MTYzNTEwMDgzOH0.mMfh27R5-jdWdLxS8BFx-LJyXz9cnpDFhH_WVnJ0awo
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
          <Route exact path="/login">
            {console.log("isEmpty",sessionStorage.getItem("jwt")===null || sessionStorage.getItem("jwt")==="")}
            {!isLoggedIn ?  <Login/> : <Redirect to="/"/> }
          </Route>
          <Route exact path="/register">
            {!isLoggedIn ?<Register/>: <Redirect to="/"/> }
          </Route>
        </Switch>
      </div>
    </Router>
  )

}

export default App;
