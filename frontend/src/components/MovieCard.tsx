import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';


interface IProps {
  children: React.ReactNode,
  picture: string,
  storyline: string,
  id: string,
}

function MovieCard({ children, picture, storyline, id }: IProps) {


  const history = useHistory();
  const handleClick = () => history.push('/detail/' + id);


  return (
    <div className="grid-item">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="auto"
          image={picture}
          alt="Failed to fetch poster"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {children}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {storyline}
          </Typography>
        </CardContent>
        <CardActions>

          <Button size="small" onClick={handleClick}>Learn More</Button>
        </CardActions>
      </Card>
    </div>)
}
export default MovieCard;
