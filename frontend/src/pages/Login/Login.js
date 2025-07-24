import React,{useState,useContext} from 'react'
import axios from 'axios';
import {store} from '../../App';
import { Navigate,Link } from 'react-router-dom';
import './Login.css'
const Login = () => {
    const [token,setToken] = useContext(store)
    const [data,setData] = useState({
        email:'',
        password:'',
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',data).then(
            res => setToken(res.data.token)
        )
    }
    if(token){
        // console.log(data)
       return <Navigate to='/home' />
    }
    return (
        <div>
            <center>
            <form onSubmit={submitHandler} className='form'>
                <div>
                <h3 className='head'>Login</h3>
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" /><br />
                <input type="password" onChange={changeHandler} name="password" placeholder="Password" /><br />
                <input type="submit" value="Login" /><br />
                <Link to='/register'>
                        <button>new user</button>
                </Link>
                </div>
                      
            </form>
            </center>
        </div>
    )
}

export default Login