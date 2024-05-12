import axios from 'axios';
import {useState} from "react"
import GetAdminRequests from './GetAdminRequests';
import GetNewRegistrations from './GetNewRegistrations';

function ManageUsers({changePage, curr}){
    return(
        <div>
            <h1> Users requesting to be members</h1>
            <GetNewRegistrations changePage={changePage} curr={curr}/>
            <h1> Users requesting to be admin </h1>
            <GetAdminRequests changePage={changePage} curr={curr}/>
        </div>
        
    )
    //<GetAdminRequests changePage={changePage} curr={curr}/>
}

export default ManageUsers;