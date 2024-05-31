import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Message.css";

function Message({ infos, changePage }) {
    const [error, setError] = useState({
        value: false,
        message: ""
    });

    const [messageData, setMessageData] = useState({});

    useEffect(() => {
        setMessageData(infos);
        // console.log("je suis dans message, voila les infos", infos);
        // console.log(infos.infos.content);
    }, [infos]);

    axios.defaults.baseURL = "http://localhost:8000";

    let goUserProfile = (e) => {
        e.preventDefault();
        console.log("go to user selected", infos);
        changePage(prev => ({ ...prev, num: 7, user_visit: infos.author }));
    };

    return (
        <div className="message-container">
            {messageData.content ? (
                <div>
                    <div className="message-header">
                        <a href='' onClick={goUserProfile}>Author: {messageData.author}</a>
                        <p>Date: {messageData.date}</p>
                    </div>
                    <div className="message-content">
                        <p>{messageData.content}</p>
                    </div>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
            {error.value && typeof error.message === 'string' && <p className="message-error">{error.message}</p>}
        </div>
    );
}

export default Message;
