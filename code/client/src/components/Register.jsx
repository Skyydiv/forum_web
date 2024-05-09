import {useState} from "react";
import axios from "axios";

function Register({changePage}){
    const url = "http://localhost:8000";

    const [infos,setInfos] = useState({
        "username":"",
        "password":"",
        "privilege":"user",
        "adminRequest":"false"
    });

    const [confirmP,setConfirmP] = useState(true);

    const handleChange = (e => {
        setInfos((prev) => (
            {...prev, [e.target.name]: e.target.value}
        ));
    })

    const handleSubmit = ( e =>{
        e.preventDefault(); 
        if(infos.username!="" && infos.password!="" && confirmP){
            axios.post(`${url}/Register`,infos)
            .then((response) =>{
                console.log("succes subscription");
            })
            .catch(err =>{
                console.error("error inscription", err);
            })
        }
        
    });

    const testP = (e => {
        setConfirmP(e.target.value == infos.password);
    })

    return(
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="usr">Username</label>
                <input id="user" name="username" onChange={handleChange}/>

                <label htmlFor="mdp">Mot de passe</label>
                <input id="mdp" name="password" type="password" onChange={handleChange}/>

                <label htmlFor="confirm">Confirmer mot de passe</label>
                <input id="confirm" name="confirm" type="password" onChange={testP}/>

                <input type="submit" value="S'inscrire"/>

                <input type="button" value="Page de connexion" onClick={() => changePage({"num":0})}/>
                
            </form>
            
            {confirmP? <></> : <p>Password don't match</p>}
        </>
    )
}

export default Register