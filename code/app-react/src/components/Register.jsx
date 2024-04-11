import { Link } from "react-router-dom";

function Register(){
    return(
        <>
            <h1>Inscription</h1>
            <form>
                <label HTMLfor="usr">Username</label>
                <input id="user"/>

                <labe HTMLfor="mdp">Mot de passe</labe>
                <input id="mdp"/>

                <input type="submit"/>
                <Link to="/">
                    <input type="button" value="Page de connection"/>
                </Link>
            </form>
        </>
    )
}

export default Register