import {useEffect, useState} from "react"
import axios from "axios"
import Message from "./Message";

function MessagesList ({objMethod}){
    //props peut être un id d'user, un id de message, 
    //la date de création du message ou tout autre élément stocké dans
    //un document de la collection "messages" sous la forme {champ : valeur}

    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [messagesList, setMessagesList] = useState([]);
    axios.defaults.baseURL = "http://localhost:8000";

    let bool = true;

    const postToServer = async () => {
        try {
            bool = false;
            console.log("je fais une requête pour accéder à tous les messages écrits selon le critère du props");
            const res = await axios.post("/MessagesList", objMethod); //props
            setMessagesList(res.data);
            // console.log(messagesList);
        } catch (err) {
            setError({
                value: true,
                message: "Erreur lors de la requête."
            });
            console.log(err.message);
        }
    };

    useEffect(() => {
        if (bool){
            postToServer();
        }
    }, []);

    return (
        <div>
            

            {/* {console.log("render list: ",messagesList)}
            <ul>
                { messagesList.map( mess => {
                    console.log("message : ", mess);
                    <li> <p>ok</p> </li>
                    // <Message infos={mess}/>
                }
                )}
            </ul> */}

            <ul>
                {messagesList.map(mess => (
                    <li> <Message infos={mess}/></li>
                ))}
            </ul>
        </div>
    )
}

export default MessagesList;