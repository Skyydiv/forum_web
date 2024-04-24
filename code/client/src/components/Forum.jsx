import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import Topic from "./Topic";

function Forum () {
    const [subjects, setSubjects] = useState([]);
    const [selected, setSelected] = useState();

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

    const handleSelected = (arg) => {
        console.log(arg);
        setSelected(arg);
    }
    
    if (selected){
        return <Topic id={selected}/>;
    }

    else{
        return(
            <div>
                <ul>
                    {subjects.map(sub => (
                        <a href='' onClick={(e) =>{e.preventDefault(); handleSelected(sub._id)}}>
                            <li key ={sub.id}>{sub.subject}</li>
                        </a>
                    ))}
                </ul>
            </div>
        );
    }
    

    

}

export default Forum


