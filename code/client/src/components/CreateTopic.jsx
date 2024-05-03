import "../styles/CreateTopic.css"
import {useState} from "react"
import axios from "axios"

function CreateTopic({user,changePage}) {
    const [formInfos, setFormInfo] = useState({
        "subject":"",
        "text":""
    });

    axios.defaults.baseURL="http://localhost:8000";
    
    const handleChange = (e) => {
        setFormInfo(prev => ({...prev, [e.target.name]:e.target.value}))
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
                        <textarea id="subject" name="subject" rows="1" cols="100" maxlength="1000" onChange={handleChange}/>
                    </li>

                    <li className="box">
                        <label htmlFor="text"> Text: </label>
                        <textarea id="text" className="txt" name="text" rows="25" cols="70" maxlength="1000" onChange={handleChange}/>
                    </li>

                   
                   <li>
                       <input type="submit" onClick={submit}/>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default CreateTopic;