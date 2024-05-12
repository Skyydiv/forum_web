import {useEffect, useState} from "react"
import axios from "axios"
import Profile02 from "./Profile02";
import Forum from "./Forum";

function GetNewRegistrations ({changePage, curr}){
    //Affiche la liste des user en attente de validation d'inscription (awaiting)

    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [awaitingList, setAwaitingList] = useState([]);

    axios.defaults.baseURL = "http://localhost:8000";

    useEffect(() => {
        const getToServer = async () => {
            try {
                const res = await axios.get("/GetNewRegistrations");
                setAwaitingList(res.data);
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
                {awaitingList.map((request, index) => (
                    <div key={index}>
                    <button onClick={() => changePage({ ...curr, "num": 7, "user_visit":request.username , "curr":curr})}>{request.username}</button>
           </div>
            ))}
           
           
             </div>
        
        
    )

};
export default GetNewRegistrations;