import { createContext, useState, useEffect, useContext } from "react";
import SidebarContext from "./sidebar";

const ThemeContext = createContext();

function ThemeProvider(props){
    const {children} = props;

    const [dark, setDark] = useState(false);
    const [theme, setTheme] = useState("light");
    const [logo, setLogo] = useState(require(`../images/logo/light/marswide-logo-full.png`));
    useEffect(() => {
        if(dark){
            document.documentElement.setAttribute("data-mdb-theme", "dark");
        }else{
            document.documentElement.setAttribute("data-mdb-theme", "light");
        };
        
    }, [dark]);

    const handleChangeTheme = (darkTerm) => {
        console.log(darkTerm);
        setDark(darkTerm);

        if(darkTerm){
            setTheme("dark");
            setLogo(require(`../images/logo/dark/marswide-logo-full.png`));
        }else{
            setTheme("light");
            setLogo(require(`../images/logo/light/marswide-logo-full.png`));
        };

       
    };


    const sharedValuesAndMethods = {
     dark,
     theme,
     logo,
     handleChangeTheme
    };

    return (
        <ThemeContext.Provider value={sharedValuesAndMethods}>
            {children}
        </ThemeContext.Provider>
    );
};

export {ThemeProvider};
export default ThemeContext;