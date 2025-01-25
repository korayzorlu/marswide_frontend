import React, { useEffect, useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useSelector } from "react-redux";


//import { ReactComponent as DataIcon } from '../../images/icons/sidebar/light/database-filled.svg';

function Sidenav() {
    const {collapse,toggle,mobile} = useSelector((store) => store.sidebar);

    const navigate = useNavigate();

    const CardIcon = require(`../../images/icons/sidebar/light/badge-filled.svg`).ReactComponent;
    const CompanyIcon = require('../../images/icons/sidebar/light/home-work.svg').ReactComponent;
    const HandshakeIcon = require('../../images/icons/sidebar/light/handshake.svg').ReactComponent;
    const DataIcon = require('../../images/icons/sidebar/light/database-filled.svg').ReactComponent;
    

    var collapsed = collapse
    var sideBarWidth = "200px";

    if (mobile){
        collapsed = false;
        sideBarWidth = "300px";
    }else{
        collapsed = collapse;
    };

    const handleClick = (event) => {
        navigate(event.currentTarget.name)
       
    };

    /*
    <div className="row p-2" style={{ textAlign: 'center', borderTop: '1px solid #ccc' }}>
                <div className="col-md-12">
                    <img src={require("../../images/logo/light/marswide-icon.png")} height="20" alt="MichoApp" loading="lazy" />
                </div>
            </div>
            */

    return ( 
        <Sidebar collapsed={collapsed} toggled={toggle} customBreakPoint="1024px" width={sideBarWidth} collapsedWidth="78px"
        rootStyles={{"height":"100%","border":"none"}}>
            <Menu>
                <SubMenu label="Card" icon={<CardIcon className="sideBarIcon" height="24" alt="" loading="lazy"/>}>
                        <MenuItem name="companies" component={<Link to="/companies"></Link>} icon={<CompanyIcon className="sideBarIcon" height="24" alt="" loading="lazy" disabled/>}>Companies</MenuItem>
                        <MenuItem name="data" component={<Link to="/data"></Link>} icon={<HandshakeIcon className="sideBarIcon" height="24" alt="" loading="lazy"/>}>Partners</MenuItem>
                </SubMenu>
                <SubMenu label="Data" icon={<DataIcon className="sideBarIcon" height="24" alt="" loading="lazy"/>}>
                    <MenuItem name="maker" onClick={handleClick} icon={<i className="fa-solid fa-bookmark"></i>}> Makers </MenuItem>
                    <MenuItem name="part" onClick={handleClick} icon={<i className="fa-solid fa-screwdriver-wrench"></i>}> Parts </MenuItem>
                </SubMenu>
                <MenuItem> Calendar </MenuItem>
                <MenuItem rootStyles={{"marginTop":"auto"}}> Company </MenuItem>
            </Menu>
            
        </Sidebar>
        
    );
}

export default Sidenav;