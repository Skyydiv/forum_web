import axios from 'axios';
import {useState, useEffect} from "react"

//ajoute l'user dans la liste des users
// en attente d'acceptation/refus du statut Admin

function AdminRequest({user}){

    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [isOnList, setOnList]=useState(false);
    const [requestSent, setRequestSent] = useState(false);

    axios.defaults.baseURL = "http://localhost:8000";

    console.log("je suis dans AdminRequest");
        console.log(user);
        const postToServer = async () => {
            setRequestSent(true);
            try {
                //modifier le champ adminRequest à true dans users
                console.log("je fais une demande");
                const res = await axios.post("/AdminRequest", user);
                setOnList(true);
            } catch (err) {
                setError({
                    value: true,
                    message: "Erreur lors de la requête."
                });
                console.error(err.message);
            }
        };
    
    useEffect(() => {
        if (!requestSent){
            postToServer();
        }
        
    }, [user, requestSent]);

    return (
        <div>
            {isOnList ? (
                console.log("L'utilisateur a bien demandé à être admin !")
            ) : (
                console.log("Il semble qu'il y ai eu un problème !")
            )}
            {error.value && <p>{error.message}</p>}
        </div>
    );
}
export default AdminRequest;