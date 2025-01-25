import { useContext, useEffect } from "react";
import { Tab } from "mdb-ui-kit";

import PanelContent from "../../../component/panel/PanelContent";
import Nav from "../../../component/tab/Nav";
import NavItem from "../../../component/tab/NavItem";
import TabContent from "../../../component/tab/TabContent";
import TabPane from "../../../component/tab/TabPane";
import SettingsContext from "../../../context/settings/settings";
import AuthSettings from "../auth/components/AuthSettings";
import { useSelector } from "react-redux";


function Settings() {
    const {user} = useSelector((store) => store.auth);

    useEffect(() => {
        //mdb input
        const tabs = document.querySelectorAll('.nav-item a');
        tabs.forEach((tab) => {
            new Tab(tab); // Her dropdown öğesini başlat
        });
    }, []);

    return ( 
        <PanelContent>
            <Nav>
                <NavItem navItem={{id:"authSettingsNav",target:"authSettingsTab",active:"active"}}>Auth</NavItem>
                <NavItem navItem={{id:"test2",target:"esk2",active:""}}>Company</NavItem>
                <NavItem navItem={{id:"test2",target:"esk2",active:""}}>Plan</NavItem>
            </Nav>

            <TabContent>
                <TabPane tabPane={{id:"authSettingsTab",label:"authSettingsNav",active:"show active"}}>
                    <AuthSettings user={user}></AuthSettings>
                </TabPane>
                <TabPane tabPane={{id:"esk2",label:"test2",active:""}}>
                    Company settings
                </TabPane>
            </TabContent>

        </PanelContent>
    );
}

export default Settings;