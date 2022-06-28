import React from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import '../../App.css';

import apiEndpoint from '../05Services/endpoint';
import AuthContext from "../05Services/AuthContext";

export default function LogoutContainer() {

    const { dispatch } = React.useContext(AuthContext);
    const history = useHistory();

    const handleLogout = e => {
      axios.post(`${apiEndpoint}/logout`)
      .then(response => {
        dispatch({ 
          type: "LOGOUT"
        })
        history.push("/")
      })
      .catch(error => {
        //console.log("Error on logout", error);
      });        

    }

    return (
        <div>
            <button onClick={handleLogout} id="btnLogout" className="btn btn-outline-primary" >Atsijungti</button>
        </div>
    )
}
