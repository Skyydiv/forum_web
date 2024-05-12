import axios from 'axios';
import {useState, useEffect} from "react"

//remove admin privilege

function RemoveAdminPrivilege(userData){

    axios.defaults.baseURL = "http://localhost:8000";

    console.log("je suis dans RemoveAdminPrivilege");

    const postToServer = async () => {
        try {
            console.log(userData);
            const res = await axios.post("/RemoveAdmin", userData);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    postToServer();
   
    return (
        console.log("yes")
    );
}
export default RemoveAdminPrivilege;
