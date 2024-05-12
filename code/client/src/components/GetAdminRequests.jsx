import {useEffect, useState} from "react"
import axios from "axios"

function GetAdminRequests ({changePage, curr}){
    //Affiche les la liste des users en attente d'acceptation d'admin
    const [error, setError] = useState({
        value: false,
        message: ""
    });
    const [requestsList, setRequestsList] = useState([]);
    axios.defaults.baseURL = "http://localhost:8000";

    useEffect(() => {
        const getToServer = async () => {
            try {
                const res = await axios.get("/GetAdminRequests");
                setRequestsList(res.data);
            } catch (err) {
                setError({
                    value: true,
                    message: "Erreur lors de la requête."
                });
                console.error(err.message);
            }
        };

        getToServer();
    }, []);
    
  

    
    return (
            <div>
                {requestsList.map((request, index) => (
                    <div key={index}>
                    <button onClick={() => changePage({ ...curr, "num": 7, "user_visit":request.username , "curr":curr})}>{request.username}</button>
           </div>
            ))}
           
           
             </div>
        
        
    )

};
export default GetAdminRequests;