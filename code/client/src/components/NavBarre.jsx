import "../styles/nav.css"
import {useState, useEffect} from "react"
import MessagesList from "./MessagesList";

function NavBarre({curr,changePage}) {
    const [research, setResearch] = useState();
    const handleChange = (event) => {
        
        setResearch(event.target.value)
        console.log(research)
    }

    return(
        <nav className="nav">
            <ul>
                <li>
                    <input className="buttonS" type="button" value="Home" onClick={
                        ()=>changePage({...curr,"num":2, "topic":{}})
                    }/>
                </li>

                <li>
                    <input placeholder="Research a topic" value ={research} onChange={handleChange}/>
                    <input type="button" value="search"onClick={
                        ()=>changePage({...curr,"num":9, "content":{research}})}/>
                    
                </li>
                <li>
                    <button className="buttonS" onClick={
                        () => changePage({...curr,"num":4})}>Profile</button>
                </li>

                <li>
                    <input className="buttonS" type="button" value="Log out" onClick={
                        ()=>changePage({"num":0, "topic":{}, "user" :{}})
                    }/>
                </li>
            </ul>
        </nav>
    )
}

export default NavBarre;