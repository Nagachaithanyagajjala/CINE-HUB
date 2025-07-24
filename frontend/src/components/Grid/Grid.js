import './grid.css'
import requests from '../../utils/requests.js';  
import Filter from '../filter/Filter.js'  
export default function Grid(){
    return(
        <div className="container">
            <Filter title="Action" url={requests.fetchActionMovies}/>
            <Filter title="Romance" url={requests.fetchRomanceMovies}/>
            <Filter title="Horror" url={requests.fetchHorrorMovies}/>
            <Filter title="Documentary" url={requests.fetchDocumentaries}/>
            <Filter title="Comedy" url={requests.fetchComedyMovies}/>    
    </div>
    )
    
}

