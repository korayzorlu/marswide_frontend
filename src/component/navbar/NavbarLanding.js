import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as DarkModeIcon } from '../../images/icons/navbar/dark-mode.svg';
import { ReactComponent as LightModeIcon } from '../../images/icons/navbar/light-mode.svg';
import AuthContext from "../../context/auth";

function NavbarLanding() {
    const {dark,theme,logo,handleChangeTheme,clearAuthMessage} = useContext(AuthContext)

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
                    <Link className="nav-link" to="/auth/login" onClick={() => clearAuthMessage()}>Log in</Link>
                </div>
            </div>
                
        </nav>
     );
}

export default NavbarLanding;