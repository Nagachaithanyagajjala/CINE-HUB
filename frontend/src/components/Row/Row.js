import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../utils/axios.js"
import './Row.css'
const base_url="https://image.tmdb.org/t/p/original/";
function Row({ title,fetchUrl,isLarge}){
    const [movies, setMovies]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request=await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl])
    return (
        <div className='row'>
            <h2>{title}</h2>
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
export default Row;