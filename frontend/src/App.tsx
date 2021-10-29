
import Appbar from './components/Appbar';
import Movies from './pages/Movies';
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import DetailedMovie from './pages/detailedMovie';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import { StateType } from './redux/StateType';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#d81f27" // This is an orange looking color
    },
    secondary: {
      main: "#d81f27" //Another orange-ish color
    }
  },
});


function App() {
  const isLoggedIn = useSelector((state: StateType) => state.isLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <HashRouter basename="/prosjekt-3/frontend">
        <div className="App" arial-label="app">
          <Appbar />
          <Switch>
            <Route exact path="/">
              <Movies />
            </Route>

            <Route exact path="/detail/:movieID">
              <DetailedMovie />
            </Route>
            <Route exact path="/login">
              {console.log("isEmpty", sessionStorage.getItem("jwt") === null || sessionStorage.getItem("jwt") === "")}
              {!isLoggedIn ? <Login /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/register">
              {!isLoggedIn ? <Register /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </ThemeProvider>
  )

}

export default App;
