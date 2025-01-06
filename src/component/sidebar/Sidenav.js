import React, { useEffect, useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import SidebarContext from "../../context/sidebar";

import cardIcon from "../../images/icons/sidebar/fill/bank.svg";

function Sidenav() {
    const {collapse, toggle, mobile,handleOpenTab} = useContext(SidebarContext);

    var collapsed = collapse
    var sideBarWidth = "200px";

    if (mobile){
        collapsed = false;
        sideBarWidth = "300px";
    }else{
        collapsed = collapse;
    };

    const handleClick = (event, component) => {
        handleOpenTab(
            {
                name: event.currentTarget.name,
                component: component
            }
        );
       
    };

    return ( 
        <Sidebar collapsed={collapsed} toggled={toggle} breakPoint="lg" width={sideBarWidth} collapsedWidth="60px"
        rootStyles={{"height":"100%","backgroundColor":"white"}}>
            <Menu>
                <SubMenu label="Card" icon={<i className="fa-solid fa-clipboard"></i>}>
                    
                </SubMenu>
                <SubMenu label="Data" icon={<i className="fa-solid fa-database"></i>}>
                    <MenuItem name="maker" onClick={handleClick} icon={<i className="fa-solid fa-bookmark"></i>}> Makers </MenuItem>
                    <MenuItem name="part" onClick={handleClick} icon={<i className="fa-solid fa-screwdriver-wrench"></i>}> Parts </MenuItem>
                </SubMenu>
                <MenuItem> Calendar </MenuItem>
                <MenuItem rootStyles={{"marginTop":"auto"}}> Company </MenuItem>
            </Menu>
            <div className="row p-2" style={{ textAlign: 'center', borderTop: '1px solid #ccc' }}>
                <div className="col-md-12">
                    <img src={require("../../images/landing/ntg-logo.png")} height="25" alt="MichoApp" loading="lazy" />
                </div>
            </div>
        </Sidebar>
        
     );
}

export default Sidenav;