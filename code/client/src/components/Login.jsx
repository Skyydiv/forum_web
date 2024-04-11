import { Link } from "react-router-dom";
import axios from 'axios';

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();

        // axios.post("/login")

        axios.get("http://localhost:8000/data").then(response =>{
            console.log(response.data);
        });
        // .catch((error) =>{ console.error("error fetching data: ", error)});
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="usr">Nom d'utilisateur</label>
                <input id="usr" name="usr"/>

                <label htmlFor="mdp">Mot de passse</label>
                <input id="mdp" name="mdp"/>

                <input type="submit"/>
                <Link to="register">
                    <input type="button" value="Inscription"/> 
                </Link>
                
            </form>
        </div>
    )
}

export default Login