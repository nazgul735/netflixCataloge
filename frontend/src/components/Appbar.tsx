import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import FilterModal from './FilterModal';
import { useDispatch, useSelector } from 'react-redux';
import {StateType} from "../redux/StateType"; 
import { useHistory } from 'react-router-dom';
import {logOut} from "../redux/log-in/logInActions";
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Appbar() {
const [modal, setModal] = useState<boolean>(false); 
const [searchString, setSearchString] = useState<string|undefined>(undefined); 
const updateSearchQuery= useDispatch(); 
const logOutDispatch= useDispatch(); 
const prevSearchQuery = useSelector((state:StateType) =>state.searchQueries.searchQueries);
const isLoggedIn = useSelector((state:StateType)=>state.isLoggedIn); 

 const handleFilter = ()=>{
    setModal(true); 
 }
 const closeModal = ()=>{
     setModal(false); 
 }
 const handleRemoveFilter = ()=>{
   // Update redux state to remove filters
  updateSearchQuery({type:"UPDATE_SEARCH_DATA", payload: {
    selectedGenre: undefined,
    fromYear: undefined,
    toYear: undefined,
    searchString: undefined}});
}
 const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{setSearchString(e.currentTarget.value)}
 useEffect(()=>{
   updateSearchQuery({type:"UPDATE_SEARCH_DATA", payload: {...prevSearchQuery, searchString:searchString}});
 },[searchString])
 const history = useHistory();
 const handleButtonClick = ()=>{
   //Log out user if button is clicked and the user is logged in at the time
   //remove jwt token and change state in redux store
   if(sessionStorage.getItem("jwt")){
     //Delete stored jwt by changing it to empty string
      sessionStorage.jwt="";
      //Update redux state for isLoggedIn
      logOutDispatch(logOut()); 
      
   }
   // If not logged in, this means the redux state for isLoggedIn is false, then send user to log in page and
   //handle log in from there
   else{
     history.push("/login");
   }
 }
 // Defined the button text based on sessionStorage and state stored in redux
let logInText = isLoggedIn ? "Log out" : "Log in"

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Movie database
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleSearch(e)}
                />
            </Search>
            <Button variant="contained" onClick={handleFilter}>Filter movies</Button>
            <Button variant="contained" onClick={handleRemoveFilter}>Remove filter</Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {sessionStorage.getItem("username") &&
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Logged in as {sessionStorage.getItem("username")}
            </Typography>}
            <Button onClick={handleButtonClick} variant="contained">{logInText}</Button>
          </Box>

        </Toolbar>
      </AppBar>
      <FilterModal open={modal} handleClose={closeModal}></FilterModal>
    </Box>
  );
}