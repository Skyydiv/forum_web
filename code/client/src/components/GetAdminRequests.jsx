import {useEffect, useState} from "react"
import axios from "axios"
import Message from "./Message";
import NavBarre from "./NavBarre"
import Profile02 from "./Profile02";
import MessagesList from "./MessagesList";
import SetAdminRequest from "./SetAdminRequest";
import Forum from "./Forum";

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
    
    const acceptAdminRequest = async (request) => {
        try {
            // Appel à la fonction SetAdminRequest avec les données nécessaires
            SetAdminRequest(request, true);
            // Peut-être une logique supplémentaire après avoir accepté la demande
        } catch (err) {
            setError({
                value: true,
                message: "Erreur lors de l'acceptation de la demande."
            });
            console.error(err.message);
        }
    };
    
    return (
            <div>
                Liste users en attente d'acceptation : 
                {requestsList.map((request, index) => (
                    <div key={index}>
                    <button onClick={() => changePage({ ...curr, "num": 7, "user_visit":request.username , "curr":curr})}>{request.username}</button>
           </div>
            ))}
           
           
             </div>
        
        
    )

};
export default GetAdminRequests;