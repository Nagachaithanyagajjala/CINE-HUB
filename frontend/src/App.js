import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import FilteredMovies from './pages/FilteredMovies/FilteredMovies';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Searched from './pages/Searched/Searched';
import Mylist from './pages/Mylist/Mylist'
import WalletCard from './pages/Payment/WalletCard';
import Profile from './pages/Profile/Profile';
// import Myprofile from './Myprofile';

export const store = createContext();

export default function App(){
  const [token,setToken] = useState(null);
  return (
    <div className="App">
      <store.Provider value={[token,setToken]}>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>   
          <Route path='/register' element={<Register/>} />
          {/* <Route path='/myprofile' component={Myprofile} /> */}
          <Route path='/Movie' element={<Movie/>}/>
          {/* <Route path='/Myprofile' element={<Myprofile/>}/> */}

          <Route path='/Filtered' element={<FilteredMovies/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Mylist' element={<Mylist/>}/>
          <Route path='/searched' element={<Searched/>}/>
          <Route path='/payment' element={<WalletCard/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
      </store.Provider>
    </div>
  );
}