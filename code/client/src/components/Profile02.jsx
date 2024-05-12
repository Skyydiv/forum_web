import {useEffect, useState, ObjectID} from "react"
import axios from "axios"

function Profile02({user, changePage, curr}) {
    //cas n°1 : les données de l'user sont passées dans les props
    //cas n°2 : seulement l'username' de l'user est donné
    

    const [userData, setUserData] = useState(user);

    axios.defaults.baseURL = "http://localhost:8000";
  
     //faire une seule requête à la bdd 
    //pour s'inscrire sur la liste de demande d'admin

    const adminDemand = async () => {
        try {
            //modifier le champ adminRequest à true dans users
            console.log("je fais une demande");
            const res = await axios.post("/AdminRequest", userData);
        } catch (err) {
            setError({
                value: true,
                message: "Erreur lors de la requête."
            });
            console.error(err.message);
        }
    }

 

    const DeleteAccount = async() => {
        // console.log(arg);
        try {
            const res = await axios.post("/DeleteAccount", curr.user);
        } catch (err) {
            console.error(err.message);
        }
        changePage({"num":0, "topic":{}, "user" :{}})
    }

    const ManageUsers = () =>{
        changePage({...curr, "num" : 8})
    }

    console.log(user.adminRequest)
    return (
        <div>
            {user.adminRequest ==="true" && (<p> Your admin request has been sent successfully.</p>)}
            {userData.privilege === "user" && userData.adminRequest !=="true" && (
                    <li>
                        <button type="button" onClick={(e) =>{
                            e.preventDefault();
                            adminDemand();
                        }}> demande d'admin </button>
                    </li>
                    )}
            
            {userData.privilege === "admin" && (
                    <div>
                        <button type="button" onClick={(e) =>{
                            ManageUsers();
                        }}> Manage Users </button>
                    </div>
                    )} 
            

            {userData ? (
                <div>
                    <h1>Profil de {userData.username}</h1> 
                    <button onClick={() => DeleteAccount() }>deleteAccount</button>
                
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
            
        </div>
    )
}

export default Profile02;