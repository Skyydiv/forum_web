import {useEffect, useState} from "react"
import axios from "axios"

function Profile02(props) {
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [userData, setUserData] = useState(props.user)
    
    return (
        <div>
            {userData.password ? (
                <div>
                    <h1>Profil de l'utilisateur :</h1>
                    <p>Nom d'utilisateur : {userData.username}</p> 
                    <p>Mot de passe : {userData.password}</p>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
            {error.value && <p>{error.message}</p>}
        </div>
    );
}

export default Profile02;
