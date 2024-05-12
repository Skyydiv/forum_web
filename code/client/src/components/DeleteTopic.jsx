import axios from 'axios';
import {useState, useEffect} from "react"

//supprimer un topic

function DeleteTopic(Topic){

    axios.defaults.baseURL = "http://localhost:8000";

    console.log("je suis dans DeleteTopic");

    const postToServer = async () => {
        try {
            console.log(Topic);
            const res = await axios.post("/DeleteTopic", Topic);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    postToServer();
   
    return (
        console.log("yes")
    );
}
export default DeleteTopic;
