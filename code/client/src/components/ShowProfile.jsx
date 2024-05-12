import {useEffect, useState, ObjectID} from "react"
import axios from "axios"
// import GetAdminRequests from "./GetAdminRequests.jsx";
// import MessagesList from "./MessagesList.jsx";
// import SetAdmin from "./SetAdmin.jsx";
// import SetMember from "./SetMember.jsx";
import RemoveAdminPrivilege from "./RemoveAdminPrivilege.jsx";




function ShowProfile({curr,changePage}) {
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

    const actualise = () => {
        console.log("actualise");
        changePage(prev => ({...prev, "num":8 }));
    }

    const SetMember = async (data) => {
        try {
            //modifier le champ adminRequest à false dans users
            //changer le privilege de l'user ou non
            console.log(data.user);
            const res = await axios.post("/SetMember", data);
        } catch (err) {
            console.error(err.message);
        }
    }

    const SetAdmin = async (data) => {
        try {
            //modifier le champ adminRequest à false dans users
            //changer le privilege de l'user ou non
            console.log(data.user);
            const res = await axios.post("/SetAdmin", data);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    
    return (
        <div>
            {/*accepter ou non une demande de membre (inscription)*/}
            {curr.user.privilege ==="admin" && userData.adminRequest=="true" &&(
                <div> 
                    <button onClick={() =>  {SetAdmin({"us":userData, "st":true}); actualise()}}>accept</button>
                    <button onClick={() => {SetAdmin({"us":userData, "st":false}); actualise()}}>refuse</button>
                </div>
            )}
            {/*accepter ou non une demande d'admin*/}
            {curr.user.privilege ==="admin" && userData.privilege=="awaiting" &&(
                <div> 
                    <button onClick={() =>  {SetMember({"us":userData, "st":true}); actualise()}}>accept</button>
                    <button onClick={() => {SetMember({"us":userData, "st":false}); actualise()}}>refuse</button>
                </div>
            )}

            {/* pouvoir supprimer les privilèges d'un admin quand on est admin*/}
            {curr.user.privilege ==="admin" && userData.privilege=="admin" &&(
                <button onClick={()=> RemoveAdminPrivilege(userData)}> Remove admin privilege </button>
            )}

            {/*afficher les infos de l'user visité*/}
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