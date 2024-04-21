import { Link } from "react-router-dom";
import axios from 'axios';
import {useState} from "react"
import Forum from "./Forum"

function Login() {
    const [isConnected, setIsConnected] = useState(false);
    const [error,setError] = useState({
        "value":false,
        "message":"coucou"
    })
    const [usrInfos, setUsrInfos] = useState({
        username:"",
        password:""
    });

    const url = "http://localhost:8000";

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${url}/login`, usrInfos)
        .then(response =>{
            console.log("success: ", response.data.value);
            setIsConnected(response.data.value);
        })
        .catch(err =>{
            console.error("error", err);

            if(err.response){
                setError({"value":true,"message":err.response.data});
            }
        });
    };

    
    const handleChange = (e =>{
        const {name, value} = e.target;
        setUsrInfos(prev => (
            {...prev,[name]:value}
        ))
    });


    // Once connected creat forum component
    if(isConnected){
        return <p>pouet</p>
    }

    // Connection code
    else{
        return(
            <div>
                <Forum/>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="usr">Nom d'utilisateur</label>
                    <input id="usr" name="username" onChange={handleChange}/>

                    <label htmlFor="mdp">Mot de passse</label>
                    <input id="mdp" name="password" type="password" onChange={handleChange}/>

                    <input type="submit"/>
                    <Link to="register">
                        <input type="button" value="Inscription"/> 
                    </Link>
                    
                </form>

                {/* if invalid fields print message */}
                {error.value? <p>Error  : {error.message}</p> :<p></p>}

            </div>
        )
    }
}

export default Login