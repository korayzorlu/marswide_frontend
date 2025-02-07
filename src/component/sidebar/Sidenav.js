import React, { useEffect, useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useSelector } from "react-redux";


//import { ReactComponent as DataIcon } from '../../images/icons/sidebar/light/database-filled.svg';

function Sidenav() {
    const {collapse,toggle,mobile} = useSelector((store) => store.sidebar);

    const navigate = useNavigate();
    const location = useLocation();

    const DashboardIcon = require(`../../images/icons/sidebar/light/dashboard-filled.svg`).ReactComponent;
    const CardIcon = require(`../../images/icons/sidebar/light/badge-filled.svg`).ReactComponent;
    const CompanyIcon = require('../../images/icons/sidebar/light/home-work.svg').ReactComponent;
    const HandshakeIcon = require('../../images/icons/sidebar/light/handshake.svg').ReactComponent;
    const DataIcon = require('../../images/icons/sidebar/light/database-filled.svg').ReactComponent;
    const OrganizationIcon = require('../../images/icons/sidebar/light/home-filled.svg').ReactComponent;

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
            <Menu menuItemStyles={{button: {[`&.active`]: {backgroundColor: '#13395e',color: '#b6c8d9',},},}}>
                <MenuItem className={location.pathname === "/" ? "active" : ""} name="dashboard" component={<Link to="/"></Link>} icon={<DashboardIcon className="sideBarIcon" height="24" alt="" loading="lazy" disabled/>}>Dashboard</MenuItem>
                <SubMenu rootStyles={{"marginTop":"auto"}} label="Organization" icon={<OrganizationIcon className="sideBarIcon" height="24" alt="" loading="lazy"/>}>
                    <MenuItem className={location.pathname.startsWith("/companies") ? "active" : ""} name="companies" component={<Link to="/companies"></Link>} icon={<CompanyIcon className="sideBarIcon" height="24" alt="" loading="lazy" disabled/>}>Companies</MenuItem>
                </SubMenu>
                <SubMenu label="Card" icon={<CardIcon className="sideBarIcon" height="24" alt="" loading="lazy"/>}>
                        <MenuItem className={location.pathname === "/partners" ? "active" : ""} name="partners" component={<Link to="/partners"></Link>} icon={<HandshakeIcon className="sideBarIcon" height="24" alt="" loading="lazy"/>}>Partners</MenuItem>
                </SubMenu>
                <SubMenu label="Data" icon={<DataIcon className="sideBarIcon" height="24" alt="" loading="lazy"/>}>
                    <MenuItem name="maker" onClick={handleClick} icon={<i className="fa-solid fa-bookmark"></i>}> Makers </MenuItem>
                    <MenuItem name="part" onClick={handleClick} icon={<i className="fa-solid fa-screwdriver-wrench"></i>}> Parts </MenuItem>
                </SubMenu>
            </Menu>
            
        </Sidebar>
        
    );
}

export default Sidenav;