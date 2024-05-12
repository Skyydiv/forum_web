import {useEffect, useState, ObjectID} from "react"
import ResearchProfile from "./ResearchProfile"
import ResearchMessages from "./ResearchMessages"
import ResearchTopics from "./ResearchTopics"

function ShowResultsResearch ({changePage, content, userLogged}) {
    console.log("je suisi dans Show results", content)
    let dataMessageContent = {
        "content" : content
    }
    return(
        <div>
        <ResearchProfile content = {content} userLogged = {userLogged} changePage = {changePage}/>
        <ResearchMessages content={dataMessageContent}  userLogged = {userLogged} changePage={changePage}/>
        <ResearchTopics content={dataMessageContent}  userLogged = {userLogged} changePage={changePage} />
        </div>
    )
}

export default ShowResultsResearch