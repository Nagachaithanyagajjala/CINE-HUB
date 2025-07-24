import requests from '../../utils/requests'
import NavBar from '../../components/NavBar/NavBar.js'
import Row from '../../components/Row/Row.js'
import Grid from '../../components/Grid/Grid.js'
import Mylist from '../Mylist/Mylist.js'
import axios from '../../utils/axios'
import { useEffect,useState,useContext } from 'react'
import {store} from '../../App'
import {Link} from 'react-router-dom'
export default function Home(){
    const base_url="https://image.tmdb.org/t/p/original/";
    const [token,setToken] = useContext(store)
    const [data,setData] = useState(null);
    useEffect(() =>{
        // axios.get('http://localhost:5000/myprofile',{
        //     headers: {
        //         'x-token' : token
        //     }
        // }).then(res => setData(res.data)).catch((err) => console.log(err))
        const helper=async()=>{
            await axios.get('http://localhost:5000/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
        }
        helper()
    },[])
    if(data){
        const cur=new Date();
        console.log(cur)
        console.log(data.rented)
       for(let i in data.rented){
            async function helper(){
                console.log("fucked")
                await axios.post('http://localhost:5000/api/user/remove',{
                    email:data.email,
                    movieId:data.rented[i].movie.id
                })
            }
            const x=cur.getTime();
            const prev=new Date(data.rented[i].date);
            const y=prev.getTime()
            if(x>=y){
                console.log("fuck")
                helper();
            }
       }
    }
    return(
        <div>
            <NavBar/>
        <Grid/>
        <Link to='/Mylist' state={data}>
                       <button>MyList</button>
                    </Link> 
          <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLarge={true}></Row>
          <Row title="Trending Now" fetchUrl={requests.fetchTrending}></Row>
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated}></Row>
          <Row title="Action" fetchUrl={requests.fetchActionMovies}></Row>
          <Row title="Romance" fetchUrl={requests.fetchRomanceMovies}></Row>
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}></Row>
          <Row title="Horror" fetchUrl={requests.fetchHorrorMovies}></Row>
          <Row title="Comedy" fetchUrl={requests.fetchComedyMovies}></Row>
        </div>
        
    )
}