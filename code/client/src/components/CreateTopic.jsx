import "../styles/CreateTopic.css"
import {useState} from "react"
import axios from "axios"

function CreateTopic({user,changePage}) {
    const options = {
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };

    const [formInfos, setFormInfo] = useState({
        "subject":"",
        "text":"",
        "author":user.username,
        "privilege":"user",
        "date":new Date().toLocaleString('fr-FR', options)
    });

    axios.defaults.baseURL="http://localhost:8000";


    const handleChangePrivilege = (e) => {
        setFormInfo(prev => ({
            ...prev,
            "privilege": prev.privilege === "user" ? "admin" : "user"
        }));
    };
    
    const handleChange = (e) => {
        setFormInfo(prev => ({
            ...prev, 
            [e.target.name]:e.target.value
        }))
    }

    const submit = (e) =>{
        e.preventDefault();
        console.log("subbb");

        axios.post("/CreateTopic", formInfos)
        .then(res => {
            window.alert("Topic added!");
            changePage(prev => ({...prev, "num":2}));
        })

        
        .catch(e => {
            log.error(e);
        })
    }

    return(
        <div>

            <form className="CreateTopic">
                <ul>
               
                    <li>
                        <label htmlFor="subject">Subject: </label>
                        <textarea id="subject" name="subject" rows="1" cols="100" maxLength="1000" onChange={handleChange}/>
                    </li>

                    <li className="box">
                        <label htmlFor="text"> Text: </label>
                        <textarea id="text" className="txt" name="text" rows="25" cols="70" maxLength="1000" onChange={handleChange}/>
                    </li>

                    {user.privilege === "admin" && (
                    <li>
                        <label htmlFor="privilege"> Privilege: </label>
                        <button type="button" onClick={handleChangePrivilege}>{formInfos.privilege}</button>
                    </li>
                    )}
                   <li>
                       <input type="submit" onClick={submit}/>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default CreateTopic;