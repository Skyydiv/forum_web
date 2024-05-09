import {useEffect, useState, ObjectID} from "react"
import axios from "axios"
import AdminRequest from "./AdminRequest.jsx"
import GetAdminRequests from "./GetAdminRequests.jsx";
import DeleteAccount from "./DeleteAccount.jsx";

function Profile02({user, username, changePage, curr}) {
    //cas n°1 : les données de l'user sont passées dans les props
    //cas n°2 : seulement l'username' de l'user est donné
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [userData, setUserData] = useState({
        _id :"",
        username: "",
        password: "",
        privilege :""
    });

    axios.defaults.baseURL = "http://localhost:8000";
    
    //récupérer les données de l'user

    // INUTILE on a toujours les données de l'utilasateur courant
    const fetchData = async () => {
        try {
            console.log("Je fais une requête pour accéder aux infos du profile");
            let responseData;
            if (user) {
                // Si les props user ne sont pas vides, utilisez ces données
                console.log("je passe par les props");
                responseData = user;
            } else {
                // Sinon, faites une requête POST pour récupérer les données
                console.log("je fais une requête");
                const res = await axios.post("/User", {"username" : username});
                responseData = res.data;
            }
            setUserData(responseData);
        } catch (err) {
            setError({
                value: true,
                message: "Erreur lors de la requête."
            });
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

     //faire une seule requête à la bdd 
    //pour s'inscrire sur la liste de demande d'admin
    const [isAdminRequested, setIsAdminRequested] = useState(false);
    const [RequestSent, setRequestSent] = useState(false);

    const handleSelected = () => {
        console.log("demande d'admin");
        setIsAdminRequested(true);
    }

    useEffect(() => {
        if (isAdminRequested && !RequestSent) {
            setRequestSent(true);
        }
    }, [isAdminRequested]);

    const handlechange = () => {
        // console.log(arg);
        DeleteAccount(curr, changePage)
        changePage({"num":0, "topic":{}, "user" :{}})
    }
    return (
        <div>
            {userData.privilege === "user" && (
                    <li>
                        <button type="button" onClick={(e) =>{
                            e.preventDefault();
                            handleSelected();
                        }}> demande d'admin </button>
                    </li>
                    )}
            
            {userData.privilege === "admin" && (
                    <GetAdminRequests changePage={changePage} curr={curr}/>
                    )}
            
            {isAdminRequested && <AdminRequest user={userData} />}

            {userData ? (
                <div>
                    <h1>Profil de l'utilisateur :</h1>
                    <p>Nom d'utilisateur : {userData.username}</p> 
                    <button onClick={() => handlechange() }>deleteAccount</button>
                
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
            {error.value && <p>{error.message}</p>}
        </div>
    )
}

export default Profile02;