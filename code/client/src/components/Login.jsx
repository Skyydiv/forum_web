import { Link } from "react-router-dom";
import axios from 'axios';
import {useState} from "react"

function Login() {
    const [usrInfos, setUsrInfos] = useState({
        username:"",
        password:""
    })

    const url = "http://localhost:8000"

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${url}/login`, usrInfos)
        .then(response =>{console.log("success: ", response.data)})
        .catch(err =>{console.err("error", err)});
    }


    const handleChange = (e =>{
        const {name, value} = e.target;
        setUsrInfos(prev => (
            {...prev,[name]:value}
        ))
    });

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="usr">Nom d'utilisateur</label>
                <input id="usr" name="username" onChange={handleChange}/>

                <label htmlFor="mdp">Mot de passse</label>
                <input id="mdp" name="password" onChange={handleChange}/>

                <input type="submit"/>
                <Link to="register">
                    <input type="button" value="Inscription"/> 
                </Link>
                
            </form>

            <p>my infos: <br/>{JSON.stringify(usrInfos)}</p>
        </div>
    )
}

export default Login