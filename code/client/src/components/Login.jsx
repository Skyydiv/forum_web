import { Link } from "react-router-dom";
import axios from "axios"

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/login")
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubit={handleSubmit}>
                <label HTMLfor="usr">Nom d'utilisateur</label>
                <input id="usr" name="usr"/>

                <label HTMLfor="mdp">Mot de passse</label>
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