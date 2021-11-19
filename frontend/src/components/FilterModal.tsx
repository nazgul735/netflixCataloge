import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface IProps{
    open: boolean; 
    handleClose: ()=>void;
}

export default function FilterModal({open, handleClose}:IProps) {
    const [selectedGenre, setGenre] = React.useState('');
    const [fromYear, setFromYear] = React.useState<number>(0);
    const [toYear, setToYear] = React.useState<number>(0);
    const updateSearchQueries = useDispatch(); 
    const handleChange = (event: SelectChangeEvent) => {
        setGenre(event.target.value as string);
    };
    const genres = [
        "Action",
        "Comedy",
        "Crime",
        "Adventure", 
        "Drama",
        "Fantasy",
        "Horror",
        "Romance",
        "Horror",
        "Thriller",
        "Documentary",
        "Mystery",
        "Music",
        "Family",
        "War",
        "Sci-Fi",
        "Animation",
        "Biography",
        "Mystery",
        "History"
      ];
const menuItems = genres.map((genre:string)=> <MenuItem value={genre}>{genre}</MenuItem>)
const updatePage = useDispatch();
const handleChangeFromYear= (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromYear(parseInt(event.target.value));
  };
  const handleChangeToYear= (event: React.ChangeEvent<HTMLInputElement>) => {
    setToYear(parseInt(event.target.value));
  };

  const handleApplyFilter= ()=>{
    // Provide given search query object
      updateSearchQueries({type:"UPDATE_SEARCH_DATA", payload: {fromYear: fromYear, toYear: toYear, selectedGenre: selectedGenre}});
    // Reset page to 1 when applying filter
    updatePage({ type: "UPDATE_PAGE", payload: 1 });
    // Close modal after applying filters
    handleClose();
  }

 
  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter by genre 
          </Typography>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="dropdownSelectGenre"
            value={selectedGenre}
            aria-label="Selected genre"
            onChange={handleChange}
            >
                {menuItems}
            </Select>
        </FormControl>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter by year
          </Typography>
            <TextField
                id="fromYear"
                aria-label="From year"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChangeFromYear}
            />
            <TextField
                id="toYear"
                aria-label="To year"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChangeToYear}
            />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button onClick={handleClose} variant="outlined">Close filter</Button>
          <Button id="applyFilter" onClick={()=> handleApplyFilter()} variant="outlined">Apply filter</Button>
          </Box>
        </Box>
      </Modal>
  );
}