import './Filter.css';
import {Link} from 'react-router-dom'
import React from 'react'
export default function Filter(props){
    return(
        <Link to='/Filtered' state={props}>
            <div className="filter">
                <video src={`${props.title}.mp4`} autoPlay loop muted ></video>
                <p>{props.title}</p>
            </div>   
        </Link>
    )
}