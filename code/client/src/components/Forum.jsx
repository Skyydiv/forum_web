import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";

function Forum () {
    const [subjects, setSubjects] = useState([]);

    const url = "http://localhost:8000";

    const retrieveSubjects = () => {
        axios.get(`${url}/forum`)

        .then(res => {
            console.log("cool\n", res.data);
            setSubjects(res.data)
        })

        .catch(
            err => console.error("ahhhhh")
        )
    }

    useEffect(() => {
        retrieveSubjects();
    },[]);
    
    

    return(
        <div>
            <ul>
                {subjects.map(sub => (
                    <li key ={sub.id}>{sub.subject}</li>
                ))}
            </ul>
        </div>
    );

}

export default Forum


