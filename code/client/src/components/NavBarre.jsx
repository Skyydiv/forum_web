import "../styles/nav.css"

function NavBarre({curr,changePage}) {
    return(
        <nav className="nav">
            <ul>
                <li>
                    <input className="buttonS" type="button" value="Home" onClick={
                        ()=>changePage({...curr,"num":2, "topic":{}})
                    }/>
                </li>
                <li>
                    <input placeholder="Research a topic"/>
                    <input type="button" value="search"/>
                </li>
                <li>
                    <button className="buttonS" onClick={
                        () => changePage({...curr,"num":4})
                    }
                    >Profile</button>
                </li>
            </ul>
        </nav>
    )
}

export default NavBarre;