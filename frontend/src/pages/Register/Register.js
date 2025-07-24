import React,{useState} from 'react'
import axios from '../../utils/axios';
import {store} from '../../App';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
const Register = () => {
    const [token,setToken] = useContext(store)
    const [flag,setflag]=useState(false);
    const [data,setData] = useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/register',data).then(
            res => {alert(res.data);setData({
                username:'',
                email:'',
                password:'',
                confirmpassword:''
            });setflag(true)}
        )
        
    }
    if(flag==true){
        return <Navigate to='/'/>
    }
    return (
        <div>
            <center>
            <form onSubmit={submitHandler} autocomplete="off" className='form'>
            <div>
            <h1>Register</h1>
                <input type="text" onChange={changeHandler} name="username" placeholder="User Name" /><br />
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" /><br />
                <input type="password" onChange={changeHandler} name="password" placeholder="Password" /><br />
                <input type="password" onChange={changeHandler} name="confirmpassword" placeholder="Confirm Password" /><br />
                <input type="submit" value="Register" /><br />
            </div>
                
            </form>
            </center>
        </div>
    )
}

export default Register