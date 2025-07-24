

import './NavBar.css';
import React,{useContext, useState, useEffect} from 'react';
import {store} from '../../App';
import {Navigate,Link} from 'react-router-dom';
import axios from '../../utils/axios';

export default function NavBar(){
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);
    const [movie,setmovie]=useState("");
    useEffect(() =>{
        axios.get('http://localhost:5000/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
    },[])
    const changeHandler = (e) =>{
        setmovie(e.target.value);
    }
    if(!token){
        return <Navigate to='/' />
    }
    return(
        <header className='header'>
            <img className="logo col-3" src="LogoMakr-94v4M9.png" alt="" display="inline"/>
            <Link to='/searched' state={movie}>
                <button className='search'>search</button>
            </Link>
            <input type="search"  onChange={changeHandler} id='nam'/>
            <Link to='/profile' state={data}>
            <div className='p  '>
                <p>MyAccount</p>
            </div>
            </Link>
            
            <button  onClick={() => setToken(null)}>Logout</button>
            {/* <Link to='/searched'>
                search
            </Link> */}
        </header>
    )
}
