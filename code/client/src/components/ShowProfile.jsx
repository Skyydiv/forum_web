import {useEffect, useState, ObjectID} from "react"
import axios from "axios"
import AdminRequest from "./AdminRequest.jsx"
import GetAdminRequests from "./GetAdminRequests.jsx";
import MessagesList from "./MessagesList.jsx";
import SetAdminRequest from "./SetAdminRequest.jsx";

function ShowProfile({user, curr}) {
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
        privilege :"",
        adminRequest:""
    });

    useEffect(() => {
        console.log("curr =", user)
        setUserData(user);
    }, []);
    
    return (
        <div>
            {curr.user.privilege ==="admin" && userData.adminRequest=="true" &&(
                <div> 
                    <button onClick={() =>  SetAdminRequest(userData, true)}>accept</button>
                    <button onClick={() => SetAdminRequest(userData, false)}>refuse</button>
                </div>
            )}

            {userData ? (
                <div>
                    <h1>Profil de l'utilisateur :</h1>
                    <p>Nom d'utilisateur : {userData.username}</p> 
                    <MessagesList criteria={{"author":userData.username}}/>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
            {error.value && <p>{error.message}</p>}
        </div>
    )
}

export default ShowProfile;