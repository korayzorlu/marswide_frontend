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
import { Divider, Paper, Stack, Tab, Tabs } from "@mui/material";
import TabPanel from "../../../component/tab/TabPanel";
import Card from "../../../component/card/Card";
import CardHeader from "../../../component/card/CardHeader";
import CardBody from "../../../component/card/CardBody";
import Grid from '@mui/material/Grid2';
import FormHeader from "../../../component/header/FormHeader";
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';

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

        // <PanelContent>
        //     <Row addClass="m-0">
        //         <Col size="6" addClass="ms-auto me-auto">
        //             <Card>
        //                 <CardBody>
        //                     <Tabs value={tabValue} onChange={handleChangeTabValue} aria-label="settings-tabs">
        //                         <Tab label="Auth" value={0}/>
        //                         <Tab label="Company" value={1}/>
        //                         <Tab label="Plan" value={2}/>
        //                     </Tabs>
        //                     <TabPanel value={tabValue} index={0}>
        //                         <AuthSettings user={user}></AuthSettings>
        //                     </TabPanel>
        //                     <TabPanel value={tabValue} index={1}>
        //                         Company settings
        //                     </TabPanel>
        //                 </CardBody>
        //             </Card>
        //         </Col>
        //     </Row>
        // </PanelContent>
        
        <Stack spacing={2}>
            <Grid container spacing={2} sx={{justifyContent:'center',alignItems:'center'}}>
                <Grid size={{xs:12,sm:6}}>
                    <Paper elevation={0} sx={{p:2}} square>
                        <Stack spacing={2}>
                            <FormHeader
                            title="SETTINGS"
                            />
                            <Divider></Divider>
                            <Stack spacing={2}>
                                <Grid
                                container
                                spacing={{xs:2,sm:0}}
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <Grid>
                                        <Tabs
                                        value={tabValue}
                                        variant='scrollable'
                                        scrollButtons="auto"
                                        onChange={handleChangeTabValue}
                                        >
                                            <Tab label="Auth" value={0} icon={<PersonIcon/>} iconPosition="start"/>
                                            <Tab label="Organization" value={1} icon={<ApartmentIcon/>} iconPosition="start"/>
                                        </Tabs>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <TabPanel value={tabValue} index={0}>
                                <AuthSettings user={user}></AuthSettings>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                Organization Settings
                            </TabPanel>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Settings;