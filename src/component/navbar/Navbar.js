import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/js/dist/dropdown.js";
import { Dropdown } from "mdb-ui-kit";
import { Link } from 'react-router-dom';
import { ReactComponent as NavbarLogo } from '../../images/logo/light/marswide-logo.svg';
//import { ReactComponent as DarkModeIcon } from '../../images/icons/navbar/dark-mode.svg';
//import { ReactComponent as LightModeIcon } from '../../images/icons/navbar/light-mode.svg';
import ProgressBar from '../progress/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, logoutAuth } from '../../store/slices/authSlice';
import { setSidebar } from '../../store/slices/sidebarSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Badge, Divider, IconButton, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '../button/Button';
import { setActiveCompany } from '../../store/slices/organizationSlice';
import axios from 'axios';
import { changeNotifications, fetchNotifications, readNotifications, setAlert, setUnreadNotifications } from '../../store/slices/notificationSlice';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Navbar() {
    const {user,dark,logo} = useSelector((store) => store.auth);
    const {companies,activeCompany} = useSelector((store) => store.organization);
    const {collapse,toggle} = useSelector((store) => store.sidebar);
    const {progress} = useSelector((store) => store.process);
    const {unreadNotifications} = useSelector((store) => store.notification)
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState(user.image);

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

    const handleChaneActiveCompany = async (event) => {
        event.preventDefault();
        const selectedCompany = companies.find(({id}) => id === Number(event.target.value));
        dispatch(setActiveCompany(selectedCompany));
        
        try {
            await axios.put(`/companies/api/user_companies/${activeCompany.id}/`, 
                {
                    id : activeCompany.id,
                    is_active : false,
                    is_admin : activeCompany.is_admin
                },
                {withCredentials: true},
            );

            const response = await axios.put(`/companies/api/user_companies/${selectedCompany.id}/`, 
                {
                    id : selectedCompany.id,
                    is_active : true,
                    is_admin : selectedCompany.is_admin
                },
                {withCredentials: true},
            );
            if (response.status === 200){
                dispatch(setAlert({color:"secondary",text:"Successfully changed!",icon:"check-circle"}));
            };
        } catch (error) {
            dispatch(setAlert({color:"danger",text:"Sorry, something went wrong!",icon:"times-circle"}));
        };
    };
    
    const handleLogoutAuth = async (event) => {
        event.preventDefault();
        
        try {
            await dispatch(logoutAuth()).unwrap();
            navigate('/auth/login');
        } catch (error) {

        };
    };

    const handleNotifications = async () => {
        navigate("/notification");

        await dispatch(readNotifications()).unwrap();
        await dispatch(fetchNotifications()).unwrap();
    }

    function notificationsLabel(count) {
        if (count === 0) {
          return 'no notifications';
        }
        if (count > 99) {
          return 'more than 99 notifications';
        }
        return `${count} notifications`;
      }

    
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
                    {
                        companies.length > 0 && activeCompany
                            ?
                                <div className="dropdown">
                                    <a
                                    data-mdb-dropdown-init
                                    className={`link-secondary me-3 dropdown-toggle ${dark ? "text-white" : "text-dark"}`}
                                    href="/"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    aria-expanded="false"
                                    data-mdb-offset="0,12"
                                    >
                                        {companies.length > 0 ? activeCompany.company.name : ""}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                        {
                                            companies.map((company,index) => {
                                                return (
                                                    <li key={index}>
                                                        <button
                                                        className="dropdown-item"
                                                        value={company.id}
                                                        onClick={handleChaneActiveCompany}
                                                        >
                                                            {company.id === activeCompany.id ? <i className="fas fa-check"></i> : <i className="fas fa-check invisible"></i> }
                                                            &nbsp;{company.company.name}
                                                        </button>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            :
                                <></>
                    }
                    <IconButton className='p-0 me-3' onClick={() => handleNotifications()}>
                        <Badge
                        badgeContent={unreadNotifications}
                        variant="dot"
                        color="error"
                        >   
                            <NotificationsIcon
                            color="action"
                            />
                        </Badge>
                    </IconButton>
                    
                    <div className="dropdown ms-3 d-none">
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
                            <img
                            src={user.image ? user.image : require('../../images/icons/navbar/user-2.png')}
                            className="rounded-circle" height="25" width="25" alt="" loading="lazy"
                            style={{objectFit:"cover"}}
                            />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end shadow-4-strong" elevation={0} aria-labelledby="navbarDropdownMenuAvatar">
                            <li>
                                <div className="dropdown-header text-center p-3">{user.name} <br/> {user.subscription}</div>
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
                        </div>
                        {/* <List
                        className="dropdown-menu dropdown-menu-end"
                        sx={{ width: '100%', maxWidth: 360, bgcolor: '#1b1f23' }}
                        aria-labelledby="navbarDropdownMenuAvatar"
                        elevation={3}
                        subheader={
                            <ListSubheader disablePadding component="div" id="nested-list-subheader">
                              {user.name} <br/> {user.subscription}
                            </ListSubheader>
                        }
                        >   
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate(`/profile/${user["username"]}`)}>
                                    <ListItemText inset primary="Profile" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate(`/settings/auth`)}>
                                    <ListItemText inset primary="Settings" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleToggleTheme}>
                                    <ListItemIcon>
                                        {dark ? <LightModeIcon /> : <DarkModeIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={dark ? "Light" : "Dark"} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleLogoutAuth}>
                                    <ListItemText inset primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </List> */}
                    </div>
                </div>
            </div>
        
        </nav>
        
        
  
    );
}

export default Navbar;