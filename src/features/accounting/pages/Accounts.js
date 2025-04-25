import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLastTab } from '../../../store/slices/accounting/accountSlice';
import { Tab, Tabs } from '@mui/material';
import PanelContent from '../../../component/panel/PanelContent';
import TabPanel from '../../../component/tab/TabPanel';
import Receivable from '../components/Receivable';
import Payable from '../components/Payable';

function Accounts() {
    const {lastTab} = useSelector((store) => store.account);

    const dispatch = useDispatch();

    const [tabValue, setTabValue] = useState(lastTab);
    
    useEffect(() => {
        dispatch(setLastTab(0));
    }, [])

    const handleChangeTabValue = (event, newTabValue) => {
        dispatch(setLastTab(newTabValue));
        setTabValue(newTabValue);
    };

    return (
        <PanelContent>
            <Tabs
            value={tabValue}
            variant='scrollable'
            scrollButtons="auto"
            onChange={handleChangeTabValue}
            slotProps={{
                indicator:{
                    sx:{
                        display: 'none',
                        backgroundColor: 'opposite.main'
                    }
                }
            }}
            >
                <Tab
                label="Receivable"
                value={0}
                iconPosition="start"
                sx={{
                    '&.Mui-selected' : {
                        backgroundColor: 'panelbox.main',
                        color: 'opposite.main'
                    }
                }}
                />
                <Tab
                label="Payable"
                value={1}
                iconPosition="start"
                sx={{
                    '&.Mui-selected' : {
                        backgroundColor: 'panelbox.main',
                        color: 'opposite.main'
                    }
                }}
                />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <Receivable/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <Payable/>
            </TabPanel>
            
        </PanelContent>
    )
}

export default Accounts
