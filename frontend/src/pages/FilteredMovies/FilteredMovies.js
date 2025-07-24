import React, { useState,useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import axios from "../../utils/axios.js"
import './FilteredMovies.css';
const base_url="https://image.tmdb.org/t/p/original/";
function FilteredMovies({ title,fetchUrl}){
    const [movies, setMovies]=useState([]);
    const location=useLocation();
    const object=location.state;
        async function fetchData(){
            const request=await axios.get(object.url);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    return (
        <div className='row'>
            <h1 className='title'>{object.title}</h1>
            <div className="posters">
                {movies.map(movie=>(
                    //`'/Movie:${movie?.title||movie?.name||movie?.original_name}'`
                    <Link to='/Movie' state={movie}>
                        <img key={movie.id} 
                        className='poster'     
                        src={base_url+movie.poster_path} 
                        alt={movie.name} />
                    </Link>                          
                ))}
            </div>
        </div>
    )
}
export default FilteredMovies;
