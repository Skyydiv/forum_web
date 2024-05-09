
import axios from 'axios';
import {useState, useEffect} from "react"

//admin accepte ou refuse l'user comme admin

function SetAdminRequest(user, state){
//user : l'utilisateur qui a fait la demande d'admin
//state : true or false : true l'admin accepte, false s'il refuse

    const data = {
        us : user,
        st : state
    }
  

    axios.defaults.baseURL = "http://localhost:8000";

    console.log("je suis dans SetAdminRequest");
    console.log("user", user, "state", state);

    const postToServer = async () => {
        try {
            //modifier le champ adminRequest à false dans users
            //changer le privilege de l'user ou non
            console.log(data.user);
            const res = await axios.post("/SetAdminRequest", data);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    postToServer();
    /*
    useEffect(() => {
        console.log("youhouuuu");
        if (!requestSent){
            postToServer();
        }
        
    }, []);
*/
    return (
        console.log("yes")
    );
}
export default SetAdminRequest;
