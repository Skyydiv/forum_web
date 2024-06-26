import {useEffect, useState} from "react"
import axios from "axios"
import Message from "./Message";

function MessagesList ({criteria, changePage, userLogged,page}){
    
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [messagesList, setMessagesList] = useState([]);
    const [del, setDel] = useState(false);
    axios.defaults.baseURL = "http://localhost:8000";

    useEffect(() => {
        const postToServer = async () => {
            try {
                const res = await axios.post("/MessagesList", criteria);
                setMessagesList(res.data);
            } catch (err) {
                setError({
                    value: true,
                    message: "Erreur lors de la requête."
                });
                console.error(err.message);
            }
        };

        postToServer();
    }, [criteria]);

   

    const DeleteMessage = async (Message) => {
        try {
            console.log(Message);
            const res = await axios.post("/DeleteMessage", Message);
            changePage(prev => ({...prev, "num":page }));
        } catch (err) {
            console.error(err.message);
        }
    }
    
    
    return (
        //<li key ={message.id}>{message.content}</li>
        <div>
            <p>Liste des messages:</p>
            {messagesList.map(message => (
                <div>
                    <Message infos={message} changePage={changePage}/>
                    {(userLogged.privilege === "admin" || userLogged.username === message.author) && !del && 
                        (<button onClick={() => setDel(true)}>delete message</button>)}

                   {del && (
                        <> 
                            <div role="group" aria-labelledby="sharedL">
                                <label id="sharedL">Are you sure</label>
                                <button onClick={() => DeleteMessage(message)}>yes</button>
                                <button onClick={() => setDel(false)}>no</button>
                            </div>
                        </>
                    )}
                    
                </div>
            ))}
            
        </div>
    );
}

export default MessagesList;