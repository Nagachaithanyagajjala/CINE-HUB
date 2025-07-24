
import {Link,useLocation} from 'react-router-dom';
import React,{useContext, useState, useEffect} from 'react';
import axios from '../../utils/axios' 
import './Searched.css'
import Row from '../../components/Row/Row';
export default function Searched(props){
    const location=useLocation();
    const movie=location.state;
    return(
        <Row title={movie} fetchUrl={`https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=b93b401d7bd55bb8b3633b9d9a554e1d`}/>
    )
}