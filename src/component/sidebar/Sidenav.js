import React, { useEffect, useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import SidebarContext from "../../context/sidebar";

import { ReactComponent as CardIcon } from '../../images/icons/sidebar/light/badge-filled.svg';
import { ReactComponent as DataIcon } from '../../images/icons/sidebar/light/database-filled.svg';

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
        <Sidebar collapsed={collapsed} toggled={toggle} breakPoint="lg" width={sideBarWidth} collapsedWidth="78px"
        rootStyles={{"height":"100%","backgroundColor":"white"}}>
            <Menu>
                <SubMenu label="Card" icon={<CardIcon class="sidebariconh" height="24" alt=""/>}>
                    
                </SubMenu>
                <SubMenu label="Data" icon={<DataIcon class="sidebariconh" height="24" alt=""/>}>
                    <MenuItem name="maker" onClick={handleClick} icon={<i className="fa-solid fa-bookmark"></i>}> Makers </MenuItem>
                    <MenuItem name="part" onClick={handleClick} icon={<i className="fa-solid fa-screwdriver-wrench"></i>}> Parts </MenuItem>
                </SubMenu>
                <MenuItem> Calendar </MenuItem>
                <MenuItem rootStyles={{"marginTop":"auto"}}> Company </MenuItem>
            </Menu>
            <div className="row p-2" style={{ textAlign: 'center', borderTop: '1px solid #ccc' }}>
                <div className="col-md-12">
                    <img src={require("../../images/logo/light/marswide-icon.png")} height="20" alt="MichoApp" loading="lazy" />
                </div>
            </div>
        </Sidebar>
        
     );
}

export default Sidenav;