import { FunctionComponent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./Login.css"
import { useQuery } from "@apollo/client";
import { LOGIN } from "../../api/graphqlQueries";
import {logIn} from "../../redux/log-in/logInActions";
import { useDispatch } from "react-redux";
interface ErrorMessageProps{
    message:string;
}
const styleErrorFont={
    fontFamily: "sans-serif",
    color: "#8E0505"
}
const ErrorMessage: React.FC<ErrorMessageProps>=({message})=>{
   return(
   <p style={styleErrorFont}>
       {message}
   </p>
   );
}

const styleInput={
    marginBottom:"1rem"
}
const Login: FunctionComponent = () => {
    const history = useHistory();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>(""); 
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { data, error} = useQuery(LOGIN, { variables: {
        "username": username,
        "password": password
      
      } });
    const dispatchLogIn = useDispatch(); 
    const handleLogin=()=>{
        if(!error && data){
            // Set token if successfully logged in 
            sessionStorage.jwt = data.login.token;
            // Set username in sessionStorage, this is for displaying username in the appbar later
            sessionStorage.username = data.login.username;
            //Update redux state
            dispatchLogIn(logIn()); 
            history.push("/");
        }
        if(error){
            //Give error message from backend if invalid username, password or both
            setErrorMessage(error?.graphQLErrors[0]?.message.split(":")[1])
        }
    }
    const handleGoBack = () => history.push('/');
    return (
        <>
        <button className="BTN" onClick={handleGoBack}>Go back</button>
        <form className="login">
            <ErrorMessage message={errorMessage}/>
            <TextField
            id="outlined-password-input"
            required={true}
            aria-label="Username"
            label="Username"
            type="text"
            style={styleInput}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setUsername(e.currentTarget.value)}
            />
            <TextField
            id="outlined-password-input"
            required={true}
            aria-label="Password"
            label="Password"
            type="password"
            autoComplete="current-password"
            style={styleInput}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setPassword(e.currentTarget.value)}
            />
            <Button id="logIn" aria-label="LoginButton" variant="contained" color="success" style={styleInput} onClick={()=>handleLogin()}>
                Log in
            </Button>
            <Link to="/register">Or click here to register as a new user</Link>
        </form>
        </>

 );
}
 
export default Login;