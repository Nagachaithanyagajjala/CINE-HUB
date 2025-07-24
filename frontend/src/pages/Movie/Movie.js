import React from 'react'
import { useLocation } from 'react-router-dom';
import './Movie.css'
import axios from '../../utils/axios'
import { useContext,useState,useEffect } from 'react';
import {store} from '../../App';
import Window from '../../components/Window/Window.js'
const base_url="https://image.tmdb.org/t/p/original/"
export default function Movie(props){
    const location=useLocation();
    const movie=location.state;
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);
    // console.log(data)
    useEffect(() =>{
        const helper=async()=>{
            await axios.get('http://localhost:5000/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
        }
        helper()      
    },[])
// const addToList = async () => {
//         try {
//           await axios.post("http://localhost:5000/api/user/add", {
//             email: data.email,
//             data: movie,
//           });
//         } catch (error) {
//           console.log(error);
//         }
//       };
if(data!=null){
        return(
            <div className='movie'
            style={{color:"white" ,backgroundImage:
            `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)),url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`}}>
                <div className='movie-contents'>
                    <h1 className='title'>{movie?.title||movie?.name||movie?.original_name}</h1>
                    <h1 className='description'>{movie.overview}</h1>
                    <div className='banner_buttons'>
                        <button className='banner_button'>Play</button>
                        {/* <button className='banner_button' onClick={addToList}>Buy</button> */}
                        <Window user={data} movie={movie}/>

                    </div>
                </div>
                
            </div>
        )
      }
}