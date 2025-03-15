import React, { useEffect } from 'react'
import PanelContent from '../../../component/panel/PanelContent'
import Card from '../../../component/card/Card'
import CardBody from '../../../component/card/CardBody'
import CardHeader from '../../../component/card/CardHeader'
import BackAndHeader from '../../../component/card/BackAndHeader'
import Row from '../../../component/grid/Row'
import Col from '../../../component/grid/Col'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import { fetchNotifications } from '../../../store/slices/notificationSlice'
import { useNavigate } from 'react-router-dom'
import NotificationsIcon from '@mui/icons-material/Notifications';

function Notification() {
    const {notifications} = useSelector((store) => store.notification)
    const {dark} = useSelector((store) => store.auth)

    const navigate = useNavigate();

    const handleClick = ({navigation}) => {
        if(navigation){
            navigate(navigation);
        };
        
    };
    
  return (
    <PanelContent>
        <Row addClass="m-0">
            <Col size="6" addClass="ms-auto me-auto">
                <Card>
                    <CardHeader>
                        <BackAndHeader>
                            Notifications
                        </BackAndHeader>
                    </CardHeader>
                    <CardBody>
                        <List>
                            {   
                                notifications.length > 0
                                ?
                                notifications.map((notification,index) => {
                                    return (
                                        <>  
                                            <ListItem
                                            sx={{
                                                backgroundColor:notification.is_read ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.1)",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                                                }
                                            }}
                                            onClick={() => handleClick({navigation:notification.navigation})}
                                            >   
                                                <Avatar alt="" src={notification.image} className="me-3" sx={{ width: 56, height: 56 }}/>
                                                <ListItemText
                                                secondary={
                                                    <Typography variant='body1'>
                                                        {notification.message}
                                                    </Typography>
                                                }
                                                primary={
                                                    <Typography variant='body2' sx={{color: "text.secondary",textAlign:"right"}}>
                                                        {notification.created_date}
                                                    </Typography>
                                                }
                                                />
                                                </ListItem>
                                           
                                            <Divider/>
                                        </>
                                    )
                                })
                                :
                                <>  
                                    <ListItem>
                                        <NotificationsIcon fontSize="large" className='ms-auto me-auto'></NotificationsIcon>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                        primary={
                                            <Typography variant='body2' sx={{color: "text.secondary",textAlign:"center"}}>
                                                No notifications
                                            </Typography>
                                        }
                                        />
                                    </ListItem>
                                </>
                            }
                        </List>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </PanelContent>
  )
}

export default Notification
