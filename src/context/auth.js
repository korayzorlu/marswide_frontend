import { createContext } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import LoadingContext from "./loading/loading";

import axios from "axios";

const AuthContext = createContext();

function AuthProvider(props){
    const {children} = props;
    const {loading,handleLoading} = useContext(LoadingContext)
    
    const [user, setUser] = useState();
    const [sourceCompanyName, setSourceCompanyName] = useState("");
    const [sourceCompanyId, setSourceCompanyId] = useState(0)
    const [userSourceCompanies, setUserSourceCompanies] = useState([]);
    const [status, setStatus] = useState(false)
    const [csrfToken, setCSRFToken] = useState("");
    const [authMessage, setAuthMessage] = useState({color:"",icon:"",text:""});
    const [wrongPath, setWrongPath] = useState(false)
    const navigate = useNavigate();

    const [dark, setDark] = useState(false);
    const [theme, setTheme] = useState(Cookies.get("theme") ? Cookies.get("theme") : "light");
    const [logo, setLogo] = useState(require(`../images/logo/light/marswide-logo-full.png`));

    const fetchTheme = () => {
        
        document.documentElement.setAttribute("data-mdb-theme", theme);
        setTheme(theme);
        setLogo(require(`../images/logo/${theme}/marswide-logo-full.png`));
        document.cookie = `theme=${theme}; path=/; ${process.env.REACT_APP_SAME_SITE}`
    };

    const handleChangeTheme = async (darkTerm) => {
        setDark(darkTerm);

        if(darkTerm){
            setTheme("dark");
            setLogo(require(`../images/logo/dark/marswide-logo-full.png`));
            document.cookie = `theme=dark; path=/; ${process.env.REACT_APP_SAME_SITE}`
        }else{
            setTheme("light");
            setLogo(require(`../images/logo/light/marswide-logo-full.png`));
            document.cookie = `theme=light; path=/; ${process.env.REACT_APP_SAME_SITE}`
        };

        if(user){
            try {
                await axios.put(`/users/api/user_profiles/${user["profile"]}/`, 
                    {
                        pk : user["profile"],
                        theme : darkTerm ? "dark" : "light"
                    },
                    {withCredentials: true},
                );
            } catch (error) {
                
            };
        };
       
    };

    const fetchUser = async () => {
        try {
            const responseUser = await axios.get(`/users/api/users/type_current/`, {withCredentials: true});
            setUser(responseUser.data[0]);
            setStatus(true);
            setDark(responseUser.data[0]["theme"] === "light" ? false : true);
            setTheme(responseUser.data[0]["theme"]);
            document.cookie = `theme=${responseUser.data[0]["theme"]}; path=/; ${process.env.REACT_APP_SAME_SITE}`
        } catch (error) {

        } finally {
            
        }
        handleLoading(false);
        
    };

    const fetchCSRFToken = async () => {
        try {
            const responseToken = await axios.get(`/users/csrf_token_get`, {withCredentials: true});
            setCSRFToken(responseToken.data.csrfToken);
            //axios.defaults.xsrfHeaderName = "X-CSRFToken";
            axios.defaults.headers['X-CSRFToken'] = responseToken.data.csrfToken;
            axios.defaults.withCredentials = true
            //document.cookie = `csrftoken=${responseToken.data.csrfToken}; path=/;`;
        } catch (error) {
            
        };
        
    };

    const loginAuth = async (email, password, remember) => {
        handleLoading(true);
        try {
            const responseLogin = await axios.post('/users/login/', { 
                email:email,
                password:password,
                remember:remember
            },{ withCredentials: true, });
            if (responseLogin.status === 200) {
                fetchCSRFToken();
                fetchUser();
                setStatus(true);
                setTheme(responseLogin.data.theme);
                handleChangeTheme(theme === "dark" ? true : false);
                navigate('/');
            };
        } catch (error) {
            if(error.status === 401){
                fetchUser();
                setStatus(false);
                setAuthMessage({color:"text-red-500",icon:"",text:error.response.data.message})
            }else {
                setAuthMessage({color:"text-red-500",icon:"fas fa-triangle-exclamation",text:"Sorry, something went wrong!"})
            };
        } finally {
            handleLoading(false);
        };
    };

    const logoutAuth = async () => {
        handleLoading(true);
        try {
            const responseLogout = await axios.post('/users/logout/', { withCredentials: true, headers: { "X-CSRFToken": csrfToken } });
            if (responseLogout.status === 200) {
                fetchUser();
                setStatus(false);
                navigate('/auth/login');
            };
        } catch (error) {

        } finally {
            setAuthMessage({color:"",icon:"",text:""})
            handleLoading(false);
        };
    };

    const registerAuth = async (email, password, passwordConfirmation, firstName, lastName, refCode) => {
        handleLoading(true);
        try {
            const responseLogin = await axios.post('/users/register/', { 
                email:email,
                password:password,
                passwordConfirmation:passwordConfirmation,
                firstName:firstName,
                lastName:lastName,
                refCode:refCode
            },{ withCredentials: true, });
            if (responseLogin.data.success) {
                fetchCSRFToken();
                fetchUser();
                setStatus(true);
                navigate('/');

            };
        } catch (error) {
            if(error.status === 400){
                fetchUser();
                setStatus(false);
                setAuthMessage({color:"text-red-500",icon:"",text:error.response.data.message})
            }else {
                fetchUser();
                setStatus(false);
                setAuthMessage({color:"text-red-500",icon:"fas fa-triangle-exclamation",text:"Sorry, something went wrong!"})
            };
        } finally {
            handleLoading(false);
        };
    };

    const clearAuthMessage = () => {
        setAuthMessage({color:"",icon:"",text:""})
    };

    const handleWrongPath = () => {
        setWrongPath();
    };
 

    const sharedValuesAndMethods = {
        user,
        sourceCompanyName,
        sourceCompanyId,
        userSourceCompanies,
        status,
        csrfToken,
        dark,
        theme,
        logo,
        authMessage,
        wrongPath,
        fetchTheme,
        handleChangeTheme,
        fetchUser,
        fetchCSRFToken,
        loginAuth,
        logoutAuth,
        registerAuth,
        clearAuthMessage,
        handleWrongPath
    }

    return (
        <AuthContext.Provider value={sharedValuesAndMethods}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthProvider};
export default AuthContext;