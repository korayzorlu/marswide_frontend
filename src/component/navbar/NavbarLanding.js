import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DarkModeIcon } from '../../images/icons/navbar/dark-mode.svg';
import { ReactComponent as LightModeIcon } from '../../images/icons/navbar/light-mode.svg';
import AuthContext from "../../context/auth";

function NavbarLanding() {
    const {dark,theme,logo,handleChangeTheme} = useContext(AuthContext)

    const navigate = useNavigate();
    

     //theme

     const handleToggleTheme = (event) => {
        event.preventDefault();

        handleChangeTheme(!dark)
    };

    //theme-end


    return ( 
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-body-tertiary" style={{"height":"40px"}}>
                
            <div className="container-fluid">
                <a className="navbar-brand mt-lg-0 p-0" href="/">
                    <img src={logo} height="18" alt="Marswide" loading="lazy" />
                </a>
                <div className="d-flex align-items-center">
                    <button className="nav-link me-3" onClick={handleToggleTheme}>{theme === "dark" ? <><LightModeIcon/></>: <><DarkModeIcon/></>}</button>
                    <button className="nav-link" onClick={()=>navigate("/login")}>Login</button>
                </div>
            </div>
                
        </nav>
     );
}

export default NavbarLanding;