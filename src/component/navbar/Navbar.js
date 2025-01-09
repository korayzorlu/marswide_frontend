import React, { useEffect, useState, useContext } from 'react';
import "bootstrap/js/dist/dropdown.js";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import { Link } from 'react-router-dom';
import esmsLogo from "../../images/landing/esms-logo.png";
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';
import NavbarContext from '../../context/navbar';
import AuthContext from '../../context/auth';
import SidebarContext from '../../context/sidebar';
import { ReactComponent as NavbarLogo } from '../../images/logo/light/marswide-logo.svg';


function Navbar() {
    const {handleCollapse,handleSideBarBackgroundColor} = useContext(SidebarContext);
    const {user,sourceCompanyName,sourceCompanyId,userSourceCompanies,changeSourceCompany} = useContext(AuthContext);

    useEffect(() => {
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach((dropdown) => {
            new Dropdown(dropdown); // Her dropdown öğesini başlat
        });
    }, []);

    //theme
    
    const [dark, setTheme] = useState(false);
    const [logo, setLogo] = useState(require(`../../images/logo/light/marswide-logo-full.png`));
    useEffect(() => {
        if(dark){
            document.documentElement.setAttribute("data-mdb-theme", "dark");
        }else{
            document.documentElement.setAttribute("data-mdb-theme", "light");
        };
        
    }, [dark]);

    const handleChangeTheme = (event) => {
        event.preventDefault();
        console.log(dark);
        setTheme(!dark);

        if(!dark){
            setLogo(require(`../../images/logo/dark/marswide-logo-full.png`));
        }else{
            setLogo(require(`../../images/logo/light/marswide-logo-full.png`));
        };

        handleSideBarBackgroundColor(!dark);
    };

    //theme-end

    const [collapse, setCollapse] = useState(false)
    const [toggle, setToggle] = useState(false)
    
    const handleToggle = (event) => {
        event.preventDefault();
        setCollapse(!collapse);
        setToggle(!toggle);
        
        handleCollapse(collapse,toggle);
    };

    const handleChaneSourceCompany = (event) => {
        event.preventDefault();
        changeSourceCompany(event.target.value);
    };

    
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-body-tertiary" style={{"height":"40px"}}>
        
            <div className="container-fluid">
                <button data-mdb-collapse-init className="navbar-toggler d-block" type="button" data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={handleToggle}>
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand mt-2 mt-lg-0" href="/">
                        <img src={logo} height="18" alt="Marswide" loading="lazy" />
                    </a>
                </div>
                <div className="d-flex align-items-center">
                    <div className="dropdown">
                        <a data-mdb-dropdown-init data-mdb-ripple-init className="link-secondary me-3 dropdown-toggle"
                        href="/"id="navbarDropdownMenuLink" role="button" aria-expanded="false">
                            {sourceCompanyName + " "}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                            {
                                userSourceCompanies.map((userSourceCompany,index) => {
                                    return (
                                        <li key={index}>
                                            <button className="dropdown-item" onClick={handleChaneSourceCompany} value={userSourceCompany.id}>{userSourceCompany.name}</button>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="dropdown">
                        <a data-mdb-dropdown-init className="link-secondary me-3 dropdown-toggle hidden-arrow" href="/"id="navbarDropdownMenuLink"
                        role="button" aria-expanded="false">
                            <i className="fas fa-bell"></i>
                            <span className="badge rounded-pill badge-notification bg-danger">1</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                            <li>
                                <a className="dropdown-item" href="#/">Some news</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#/">Another news</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#/">Something else here</a>
                            </li>
                            <li>
                                <button className='btn btn-light w-100' onClick={handleChangeTheme}>Change Theme</button>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <a data-mdb-dropdown-init className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#/"
                        id="navbarDropdownMenuAvatar" role="button" aria-expanded="false" >
                            <img src={"http://marswide_backend:8000" + user["image"]} className="rounded-circle" height="25" alt="" loading="lazy" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                            <li>
                                <a className="dropdown-item" href="#/">{user["name"]}</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#/">Settings</a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#/">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        
        </nav>
        
        
  
    );
}

export default Navbar;