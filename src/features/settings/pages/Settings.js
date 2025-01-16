import { useContext, useEffect } from "react";
import { Tab } from "mdb-ui-kit";

import PanelContent from "../../../component/panel/PanelContent";
import Nav from "../../../component/tab/Nav";
import NavItem from "../../../component/tab/NavItem";
import TabContent from "../../../component/tab/TabContent";
import TabPane from "../../../component/tab/TabPane";
import AuthContext from "../../../context/auth";
import SettingsContext from "../../../context/settings/settings";
import Auth from "../components/Auth";


function Settings() {
    const {user} = useContext(AuthContext)
    const {tabs,handleItem} = useContext(SettingsContext)

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
                    <NavItem navItem={{id:"test1",target:"esk1",active:"active"}}>Auth</NavItem>
                    <NavItem navItem={{id:"test2",target:"esk2",active:""}}>Company</NavItem>
                </Nav>

                <TabContent>
                    <TabPane tabPane={{id:"esk1",label:"test1",active:"show active"}}>
                        <Auth auth={{test:"test"}}></Auth>
                    </TabPane>
                    <TabPane tabPane={{id:"esk2",label:"test2",active:""}}>
                        Company settings
                    </TabPane>
                </TabContent>

        </PanelContent>
    );
}

export default Settings;