import {useEffect, useState, ObjectID} from "react"
import axios from "axios"
import AdminRequest from "./AdminRequest.jsx"
import GetAdminRequests from "./GetAdminRequests.jsx";
import MessagesList from "./MessagesList.jsx";
import SetAdminRequest from "./SetAdminRequest.jsx";




function ShowProfile({curr}) {
    //cas n°1 : les données de l'user sont passées dans les props
    //cas n°2 : seulement l'username' de l'user est donné
    
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [userData, setUserData] = useState({
        _id :"",
        username: "",
        // password: "",
        privilege :"",
        adminRequest:""
    });

    axios.defaults.baseURL = "http://localhost:8000";

    let retrieveUser = () =>{
        console.log("id user",curr.user_visit);
        axios.post("/User", {"username":curr.user_visit})
        .then( (rep)=> {
            console.log("show profile res", rep.data);
            setUserData(rep.data)
        })

        .catch((e) => {
            console.error(e);
        })
    }

    useEffect(() => {
        // console.log("curr =", curr);
        retrieveUser();
    }, []);
    
    return (
        <div>
            {curr.user.privilege ==="admin" && userData.adminRequest=="true" &&(
                <div> 
                    <button onClick={() =>  SetAdminRequest(userData, true)}>accept</button>
                    <button onClick={() => SetAdminRequest(userData, false)}>refuse</button>
                </div>
            )}

            {(userData.username !="") ? (
                <div>
                    <h1>Profil de l'utilisateur :</h1>
                    <p>Nom d'utilisateur : {userData.username}</p> 
                    
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
            {error.value && <p>{error.message}</p>}
        </div>
    )
}

export default ShowProfile;