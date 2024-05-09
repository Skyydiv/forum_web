import "../styles/CreateTopic.css"
import {useState} from "react"
import axios from "axios"

function CreateMessage({user,id_topic,changePage}) {
    const [formInfos, setFormInfo] = useState({
        "author":"",
        "content":"",
        "id_topic":"",
        "date":"",
    });
    
    axios.defaults.baseURL="http://localhost:8000";

    const options = {
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };

    const handleChange = (e) => {
        console.log("il y a du changement");
        setFormInfo(prev => ({
            ...prev, 
            [e.target.name]:e.target.value,
            "author":user.username,
            "id_topic":id_topic.id,
            "date":new Date().toLocaleString('fr-FR', options)
        }));

        
        console.log("j'ai set les infos");
    }

    const submit = (e) =>{
        e.preventDefault();

        axios.post("/CreateMessage", formInfos)
        .then(res => {
            window.alert("Message added!");
            // changePage({...curr,
            //     "num": 3,
            //     "topic": {"id":id_topic.id}
            // })
            changePage(prev =>({...prev,"num":3}))
        })

        
        .catch(e => {
            console.error(e);
        })
    }

    return(
        <div>

            <form className="CreateMessage">
                <ul>
                    <li className="box">
                        <label htmlFor="content"> Content: </label>
                        <textarea id="content" className="txt" name="content" rows="25" cols="70" maxLength="1000" onChange={handleChange}/>
                    </li>

                   
                   <li>
                       <input type="submit" value="Submit" onClick={submit}/>
                       <input type="button" value="Cancel" onClick={() => changePage(prev => ({...prev, "num":3}))}/>
                    </li>

                </ul>
            </form>
        </div>
    )
}

export default CreateMessage;