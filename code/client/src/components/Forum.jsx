import {useState} from "react";
import axios from "axios";

function Forum () {
    const [subjects, setSubjects] = useState([{id:0 , intitule:""}]);

    const url = "http://localhost:8000";

    const retrieveSubjects = () => {
        axios.get(`${url}/forum`)
        .then(
            res => console.log("cool\n", res.data)
        )
        .catch(
            err => console.error("ahhhhh")
        )
    }
    
    retrieveSubjects();

    return(
        <div>

        </div>
    )
}

export default Forum