import { useContext, useEffect, useState } from "react";


import PanelContent from "../../../component/panel/PanelContent";
import Nav from "../../../component/tab/Nav";
import NavItem from "../../../component/tab/NavItem";
import TabContent from "../../../component/tab/TabContent";
import TabPane from "../../../component/tab/TabPane";
import SettingsContext from "../../../context/settings/settings";
import AuthSettings from "../auth/components/AuthSettings";
import { useSelector } from "react-redux";
import Row from "../../../component/grid/Row";
import Col from "../../../component/grid/Col";
import { Tab, Tabs } from "@mui/material";
import TabPanel from "../../../component/tab/TabPanel";
import Card from "../../../component/card/Card";
import CardHeader from "../../../component/card/CardHeader";
import CardBody from "../../../component/card/CardBody";


function Settings() {
    const {user} = useSelector((store) => store.auth);

    const [tabValue, setTabValue] = useState(0);

    const handleChangeTabValue = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    useEffect(() => {
        //mdb input
        const tabs = document.querySelectorAll('.nav-item a');
        tabs.forEach((tab) => {
            new Tab(tab); // Her dropdown öğesini başlat
        });
    }, []);

    return ( 
        // <PanelContent>
        //     <Row addClass="m-0">
        //         <Col size="6" addClass="ms-auto me-auto">
        //             <Nav addClass="nav-justified">
        //                 <NavItem navItem={{id:"authSettingsNav",target:"authSettingsTab",active:"active"}} addClass="me-2" btnClass="w-100">Auth</NavItem>
        //                 <NavItem navItem={{id:"test2",target:"esk2",active:""}} addClass="me-2"  btnClass="w-100">Company</NavItem>
        //                 <NavItem navItem={{id:"test2",target:"esk2",active:""}} btnClass="w-100 me-0">Plan</NavItem>
        //             </Nav>

        //             <TabContent>
        //                 <TabPane tabPane={{id:"authSettingsTab",label:"authSettingsNav",active:"show active"}}>
        //                     <AuthSettings user={user}></AuthSettings>
        //                 </TabPane>
        //                 <TabPane tabPane={{id:"esk2",label:"test2",active:""}}>
        //                     Company settings
        //                 </TabPane>
        //             </TabContent>
        //         </Col>
        //     </Row>
        // </PanelContent>

        <PanelContent>
            <Row addClass="m-0">
                <Col size="6" addClass="ms-auto me-auto">
                    <Card>
                        <CardBody>
                            <Tabs value={tabValue} onChange={handleChangeTabValue} aria-label="settings-tabs">
                                <Tab label="Auth" value={0}/>
                                <Tab label="Company" value={1}/>
                                <Tab label="Plan" value={2}/>
                            </Tabs>
                            <TabPanel value={tabValue} index={0}>
                                <AuthSettings user={user}></AuthSettings>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                Company settings
                            </TabPanel>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </PanelContent>
    );
}

export default Settings;