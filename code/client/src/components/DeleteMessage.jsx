import axios from 'axios';
import {useState, useEffect} from "react"

//supprimer un message

function DeleteMessage(Message){

    axios.defaults.baseURL = "http://localhost:8000";

    console.log("je suis dans DeleteMessage");

    const postToServer = async () => {
        try {
            console.log(Message);
            const res = await axios.post("/DeleteMessage", Message);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    postToServer();
   
    return (
        console.log("yes")
    );
}
export default DeleteMessage;
