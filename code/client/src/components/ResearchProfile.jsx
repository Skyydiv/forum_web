import {useEffect, useState} from "react"
import axios from "axios"

function ResearchProfile ({content, changePage, userLogged}){
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [usersList, setUsersList] = useState([]);
    axios.defaults.baseURL = "http://localhost:8000";

    useEffect(() => {
        const postToServer = async () => {
            try {
                console.log("je suis la")
                const res = await axios.post("/getUsers", content);
                setUsersList(res.data);
                console.log(usersList)
            } catch (err) {
                setError({
                    value: true,
                    message: "Erreur lors de la requête."
                });
                console.error(err.message);
            }
        };

        postToServer();
    }, [content]);

    const handleChange = (user) => {
        changePage(prev => ({...prev, "num":7, "user_visit":user.username}));
        }
    
    return (
        <div>
        <p>Liste des profils correspondant à votre recherche:</p>
        {usersList.map(user => (
             <button onClick={() => handleChange(user)}>{user.username}</button>
            
        ))}
        
    </div>
    );
}

export default ResearchProfile