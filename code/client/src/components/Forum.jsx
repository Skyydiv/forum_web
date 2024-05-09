import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import NavBarre from "./NavBarre"

import "../styles/Forum.css"

function Forum ({curr,changePage}) {
    const [subjects, setSubjects] = useState([]);

    const url = "http://localhost:8000";
    console.log(curr.user);

    const retrieveSubjects = () => {
        axios.post(`${url}/forum`, curr.user)

        .then(res => {
            // console.log("cool\n", res.data);
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
        // console.log(arg);
        changePage({...curr,
            "num": 3,
            "topic": {"id":arg}
        })
    }
 

    return(
        <div>


            
            <input type="button" value="New topic" className="NewTopic" onClick={() => (
                changePage(prev =>(
                    {...prev,"num":5}
                ))
            )}/>

            <ul className="Bar">
                <li> Thread </li>
                <li> Author</li>
                <li> Creation date</li>
            </ul>

            <ul className="TopicList">
                {subjects.map(sub => (
                    <a href='' onClick={(e) =>{e.preventDefault();  handleSelected(sub._id)}}>
                        <li key ={sub.id} >{sub.subject}</li>
                    </a>
                ))}
            </ul>
        </div>
    );

    

    

}

export default Forum


