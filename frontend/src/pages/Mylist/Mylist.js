import React,{useContext,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const base_url="https://image.tmdb.org/t/p/original/";
const Mylist = (props) => {
    const location=useLocation();
    const data=location.state;
    return (
        <div className='row'>
            <h1 className='title'>favourite movies</h1>
            <div className="posters">
                {data.likedMovies.map(movie=>(
                    //`'/Movie:${movie?.title||movie?.name||movie?.original_name}'`
                    <Link to='/Movie' state={movie}>
                        <img key={movie.id} 
                        className='poster'     
                        src={base_url+movie.poster_path} 
                        alt={movie.name} />
                    </Link>                          
                ))}
                {data.rented.map(obj=>(
                    //`'/Movie:${movie?.title||movie?.name||movie?.original_name}'`
                    <Link to='/Movie' state={obj.movie}>
                        <img key={obj.movie.id} 
                        className='poster'     
                        src={base_url+obj.movie.poster_path} 
                        alt={obj.movie.name} />
                    </Link>                          
                ))}
            </div>
        </div>
    )
}

export default Mylist;