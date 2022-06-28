import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../images/knyg1.png";
import "../../App.css";

import LogoutContainer from "./LogoutContainer";

function Navigation(props) {

  return (
    <div className="pb-4">
      <nav className="navbar navbar-expand-md py-4 navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/home"} >
            <img
              className="nav-img"
              src={logo}
              alt="logotipas"
              loading="lazy"
            />
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mynav1">
              <li className="nav-item me-2">
                <NavLink
                  className="nav-link nav1"
                  activeClassName="current"

                  id="navAdminUserList"
                  to={"/books"}
                >
                  Knygos
                </NavLink>
              </li>

              <li className="nav-item me-2">
                <NavLink
                  className="nav-link nav1"
                  activeClassName="current"

                  id="navAdminUserList"
                  to={"/users"}
                >
                  Naudotojai
                </NavLink>
              </li>

              <li className="nav-item nav-item ms-2" style={{position: "absolute", right:"20px"}}>
                <LogoutContainer />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div>{props.children}</div>
    </div>
  );
}

export default Navigation;
