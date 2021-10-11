import mongoose from 'mongoose';
const data =require('../resources/movies.json');
import {Movie} from "./models/Movies";

const mongoDBURL= "mongodb://localhost:27017/test"
function populateDatabase(){
    mongoose.connect(mongoDBURL, {useNewUrlParser:true, useUnifiedTopology:true})
    // Clean old data first 
    // .then(Movie.deleteMany({}, function(err, result) {
    //     if (err) {
    //       console.log("Something went wrong")
    //     } else {
    //       console.log("Database is cleaned.");
    //     }
    //   }))
    // Populate with relevant data from movies.json
    .then(data.forEach(function(movie) { 
        const newMovie = new Movie({title: movie.title, year: movie.year,genres: movie.genres, actors: movie.actors, posterurl: movie.posterurl, storyline: movie.storyline}) 
        newMovie.save() 
    }))
    .then(console.log("Data populated!"));
    // Close connection with data is populated
    mongoose.connection.close()
}

populateDatabase()