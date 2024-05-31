// import { Link } from "react-router-dom";
import axios from 'axios';
import {useState} from "react"
import Forum from "./Forum"
import '../styles/Login.css'

function Login({changePage}) {
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
            // console.log("success: ", response.data);
            changePage({
                "num":2,
                "user":response.data.user
            })
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
        return (<Forum/>)
    }

    // Connection code
    else{
        return(
            <div className="login-container">
                {/* <Forum/> */}
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="usr">Nom d'utilisateur</label>
                    <input id="usr" name="username" onChange={handleChange}/>

                    <label htmlFor="mdp">Mot de passse</label>
                    <input id="mdp" name="password" type="password" onChange={handleChange}/>

                    <input type="submit"/>

                    <input type="button" value="Inscription" onClick={() => changePage({"num":1})}/> 
                    
                    
                </form>

                {/* if invalid fields print message */}
                {error.value? <p>Error  : {error.message}</p> :<p></p>}

            </div>
        )
    }
}

export default Login