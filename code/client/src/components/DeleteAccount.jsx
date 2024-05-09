import axios from 'axios';
import {useState, useEffect} from "react"

//supprimer un compte

function DeleteAccount(curr, changePage){

    axios.defaults.baseURL = "http://localhost:8000";

    console.log("je suis dans DeleteAccount");

    const postToServer = async () => {
        try {
            console.log(curr.user);
            const res = await axios.post("/DeleteAccount", curr.user);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    postToServer();
   
    return (
        console.log("yes")
    );
}
export default DeleteAccount;
