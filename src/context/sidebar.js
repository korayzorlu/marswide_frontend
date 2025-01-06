import { createContext, useState } from "react";

const SidebarContext = createContext();

function SidebarProvider(props){
    const {children} = props;

    const [mobile, setMobile] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [contentWidth, setContentWidth] = useState({sidebar:"200px",page:"calc(100% - 200px)"});
    const [tabNavItems, setTabNavItems] = useState([]);
    const [tabNavContents, setTabNavContents] = useState([]);

    //open&close sidebar with button
    const handleCollapse = (collapseTerm,toggleTerm) => {
        setCollapse(collapseTerm);
        setToggle(toggleTerm);
        var element = document.querySelector('.ps-sidebar-root');

        if (element && element.classList.contains('ps-broken')) {
            setMobile(true);
            if (collapseTerm){
                setContentWidth({sidebar:"0",page:"100%"});
            }else{
                setContentWidth({sidebar:"0",page:"100%"});
            };
        } else {
            setMobile(false);
            if (collapseTerm){
                setContentWidth({sidebar:"60px",page:"calc(100% - 60px)"});
            }else{
                setContentWidth({sidebar:"200px",page:"calc(100% - 200px)"});
            };
        };
    
    };

    //check mobile in opening
    const checkMobile = () => {
        const element = document.querySelector('.ps-sidebar-root');

        if (element && element.classList.contains('ps-broken')) {
            setMobile(true);
            setContentWidth({sidebar:"0",page:"100%"});
        }else{
            setMobile(false);
            setContentWidth({sidebar:"200px",page:"calc(100% - 200px)"});
        };
    };

    //with window resize
    const handleResize = () => {
        const element = document.querySelector('.ps-sidebar-root');

        if (element && element.classList.contains('ps-broken')) {
            setMobile(true);
            setContentWidth({sidebar:"0",page:"100%"});
        } else {
            setMobile(false);
            setContentWidth({sidebar:"200px",page:"calc(100% - 200px)"});
        }
    };

    const handleOpenTab = (term) => {
        //tab item
        const updatedTabNavItems = tabNavItems.map(item => ({
            ...item,
            class: ""
        }));

        const openedTabNavItems = [
            ...updatedTabNavItems,
            {
                name: term.name,
                class: "active"
            }
        ];

        //tab content
        const updatedTabNavContents = tabNavContents.map(item => ({
            ...item,
            class: ""
        }));

        const openedTabNavContents = [
            ...updatedTabNavContents,
            {
                name: term.name,
                class: "show active",
                component: term.component
            }
        ];

        //set
        setTabNavItems(openedTabNavItems);
        setTabNavContents(openedTabNavContents);
    };

    const sharedValuesAndMethods = {
        mobile,
        collapse,
        toggle,
        contentWidth,
        tabNavItems,
        tabNavContents,
        handleCollapse,
        checkMobile,
        handleResize,
        handleOpenTab
    };

    return (
        <SidebarContext.Provider value={sharedValuesAndMethods}>
            {children}
        </SidebarContext.Provider>
    );
};

export {SidebarProvider};
export default SidebarContext;