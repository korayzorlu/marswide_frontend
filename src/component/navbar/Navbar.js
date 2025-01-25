import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/js/dist/dropdown.js";
import { Dropdown } from "mdb-ui-kit";
import { Link } from 'react-router-dom';
import { ReactComponent as NavbarLogo } from '../../images/logo/light/marswide-logo.svg';
import { ReactComponent as DarkModeIcon } from '../../images/icons/navbar/dark-mode.svg';
import { ReactComponent as LightModeIcon } from '../../images/icons/navbar/light-mode.svg';
import ProgressBar from '../progress/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, logoutAuth } from '../../store/slices/authSlice';
import { setSidebar } from '../../store/slices/sidebarSlice';

function Navbar() {
    const {user,dark,logo} = useSelector((store) => store.auth);
    const {collapse,toggle} = useSelector((store) => store.sidebar);
    const {progress} = useSelector((store) => store.process);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach((dropdown) => {
            new Dropdown(dropdown); // Her dropdown öğesini başlat
        });
    }, []);

    //theme

    const handleToggleTheme = (event) => {
        event.preventDefault();

        dispatch(changeTheme(!dark))
    };

    //theme-end

    //const [collapse, setCollapse] = useState(false)
    //const [toggle, setToggle] = useState(false)
    
    const handleToggle = (event) => {
        event.preventDefault();
        //setCollapse(!collapse);
        //setToggle(!toggle);
        
        dispatch(setSidebar({collapseTerm:!collapse,toggleTerm:!toggle}));
    };

    const handleChaneSourceCompany = (event) => {
        event.preventDefault();
        //changeSourceCompany(event.target.value);
    };
    
    const handleLogoutAuth = async (event) => {
        event.preventDefault();
        
        try {
            await dispatch(logoutAuth()).unwrap();
            navigate('/auth/login');
        } catch (error) {

        };
    };

    
    
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-body-tertiary" style={{"height":"40px"}}>
            <ProgressBar value={progress.value} display={progress.display}></ProgressBar>
        
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
                <div className="d-flex align-items-end">
                    <div className="dropdown d-none">
                        <a data-mdb-dropdown-init data-mdb-ripple-init className="link-secondary me-3 dropdown-toggle"
                        href="/"id="navbarDropdownMenuLink" role="button" aria-expanded="false">
                            {user.sourceCompanyName + " "}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                            {
                                user.userSourceCompanies.map((userSourceCompany,index) => {
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
                        role="button" aria-expanded="false" data-mdb-offset="0,10">
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
                        </ul>
                    </div>
                    <div className="dropdown">
                        <a data-mdb-dropdown-init className="dropdown-toggle d-flex align-items-center" href="#/"
                        id="navbarDropdownMenuAvatar" role="button" aria-expanded="false" data-mdb-offset="0,10">
                            <img src={user["image"] ? require(user["image"]) : require('../../images/icons/navbar/user-2.png')}
                            className="rounded-circle" height="25" alt="" loading="lazy" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                            <li>
                                <div className="dropdown-header text-center p-3">{user.name}</div>
                            </li>
                            <li><hr className="dropdown-divider m-0"/></li>
                            <li>
                                <Link className="dropdown-item" to={`/profile/${user["username"]}`}>Profile</Link>
                            </li>
                            <li>
                            <Link className="dropdown-item" to={`/settings/auth`}>Settings</Link>
                            </li>
                            <li>
                                <a className='dropdown-item' href="#/" onClick={handleToggleTheme} style={{"cursor":"pointer"}}>
                                    {dark ? <><LightModeIcon/> Light</>: <><DarkModeIcon/> Dark</>}
                                </a>
                            </li>
                            <li><hr className="dropdown-divider m-0"/></li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={handleLogoutAuth}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        
        </nav>
        
        
  
    );
}

export default Navbar;