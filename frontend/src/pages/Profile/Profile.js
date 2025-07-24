import { useLocation } from "react-router-dom";
export default function Profile(){
    const location=useLocation();
    const user=location.state;
    return(
        <div>
            <h1>"username: "{user.username}</h1>
            
        </div>
    )
}