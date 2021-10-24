import { FunctionComponent, useState } from "react";
import {useHistory } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "../login/Login.css";
import { useMutation} from "@apollo/client";
import { REGISTER } from "../../api/graphqlQueries";
import {logIn} from "../../redux/log-in/logInActions";
import { useDispatch } from "react-redux";
interface ErrorMessageProps{
    message:string;
}
const styleErrorFont={
    fontFamily: "sans-serif",
    color: "#8E0505"
}
export const ErrorMessage: React.FC<ErrorMessageProps>=({message})=>{
   return(
   <p style={styleErrorFont}>
       {message}
   </p>
   );
}

const styleInput={
    marginBottom:"1rem"
}
const Register: FunctionComponent = () => {
    const history = useHistory();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>(""); 
    const [confirmPassword, setConfirmPassword] = useState<string>(""); 
    const [email, setEmail] = useState<string>(""); 
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [register] = useMutation(REGISTER);
    const logInDispatch = useDispatch();
    const handleRegister=async (e: any)=>{
        try {
            // Create new user by calling the register mutate function
            const { data } = await register({ variables: {
                "username": username,
                "password": password,
                "confirmPassword": confirmPassword,
                "email": email
              } });
            // Update sessionStorage with appropiate token, this means logging in the user automatically after registration
            data && (sessionStorage.jwt = data.register.token);
            //Set username in sessionStorage, this is for displaying the username in the appbar
            data && (sessionStorage.username = data.register.username);
            // Update redux state, logging in user
            logInDispatch(logIn()); 
            history.push("/");
    } catch (error:any) {
        setErrorMessage(error?.graphQLErrors[0]?.message.split(":")[1]);
      }
}
    return (
        <form className="login">
            <ErrorMessage message={errorMessage}/>
            <TextField
            id="outlined-username-input"
            required={true}
            label="Username"
            type="text"
            style={styleInput}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setUsername(e.currentTarget.value)}
            />
            <TextField
            id="outlined-email-input"
            required={true}
            label="E-mail"
            type="text"
            style={styleInput}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.currentTarget.value)}
            />
            <TextField
            id="outlined-password-input"
            required={true}
            label="Password"
            type="password"
            autoComplete="current-password"
            style={styleInput}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setPassword(e.currentTarget.value)}
            />
            <TextField
            id="outlined-password2-input"
            required={true}
            label="Retype password"
            type="password"
            autoComplete="current-password"
            style={styleInput}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setConfirmPassword(e.currentTarget.value)}
            />
            <Button variant="contained" color="success" style={styleInput} onClick={(e)=>handleRegister(e)}>
                Register
            </Button>
        </form>
 );
}
 
export default Register;