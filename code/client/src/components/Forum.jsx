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
    
    const goUserProfile = (username) => {
        changePage(prev => ({...prev, "num":7, "user_visit":username}));
    } 
    

    return(
        <div className="Forum">


            
            <input type="button" value="New topic" className="NewTopic" onClick={() => (
                changePage(prev =>(
                    {...prev,"num":5}
                ))
            )}/>

            <table>
                    <thead>
                        <tr>
                            <th>Thread</th>
                            <th>Author</th>
                            <th>Creation date</th>
                            <th>Privilege</th>
                        </tr>
                        
                    </thead>

                    <tbody>
                        {subjects.map(sub => (
                            <tr>
                                <td>
                                    <a href='' onClick={(e) =>{e.preventDefault();  handleSelected(sub._id)}}> {sub.subject} </a>
                                </td>
                                <td>
                                    <a href='' onClick={(e) =>{e.preventDefault();  goUserProfile(sub.author)}}> {sub.author} </a>
                                </td>
                                <td>{sub.date}</td>
                                <td>{sub.privilege}</td>
                            </tr>
                        ))}

                    </tbody>

            </table>
            
        </div>
    );

    

    

}

export default Forum


