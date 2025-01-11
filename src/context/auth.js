import { createContext } from "react";
import { useState } from "react";

import axios from "axios";

const AuthContext = createContext();

function AuthProvider(props){
    const {children} = props;

    const [user, setUser] = useState(false);
    const [sourceCompanyName, setSourceCompanyName] = useState("");
    const [sourceCompanyId, setSourceCompanyId] = useState(0)
    const [userSourceCompanies, setUserSourceCompanies] = useState([]);
    const [status, setStatus] = useState(false)
    const [csrfToken, setCSRFToken] = useState("");
    
    

    const fetchUser = async () => {
        try {
            const responseUser = await axios.get(`/users/api/users/type_current/`, {withCredentials: true});
            setUser(responseUser.data[0]);
        } catch (error) {

        };
        
        //setSourceCompanyName(responseUser.data[0]["sourceCompany"]);
        //setSourceCompanyId(responseUser.data[0]["sourceCompanyId"]);
        //const responseCompany = await axios.get(`/administration/api/user_source_companies?userId=${responseUser.data[0]["id"]}`, {withCredentials: true});
        //setUserSourceCompanies(responseCompany.data);
    };

    const changeSourceCompany = async (term) =>{
        //const response = await axios.get(`/source/api/companies?id=${term}`, {withCredentials: true});
        //setSourceCompanyName(response.data[0]["name"]);
        //setSourceCompanyId(response.data[0]["id"]);
    };

    const fetchCSRFToken = async () => {
        try {
            const responseToken = await axios.get(`/users/csrf_token_get`, {withCredentials: true});
            setCSRFToken(responseToken.data.csrfToken);
            axios.defaults.headers['X-CSRFToken'] = responseToken.data.csrfToken;
            //document.cookie = `csrftoken=${responseToken.data.csrfToken}; path=/;`;
            console.log(axios.defaults.headers)
        } catch (error) {
            console.log(error);
        };
        
    };



    const loginAuth = async (username, password) => {
        try {
            const response = await axios.post('/users/login/', { 
                username:username,
                password:password,
                csrfCookieName: 'csrftoken',
                csrfHeaderName: 'X-CSRFTOKEN',
                withCredentials: true
            });
            if (response.data.success) {
                alert('Giriş başarılı!');
                setStatus(true);
            } else {
                alert('Hatalı kullanıcı adı veya şifre.');
                setStatus(false);
            }
        } catch (error) {
            alert('Giriş başarısız: ' + error.response.data.message);
        }

        
    };

 

    const sharedValuesAndMethods = {
        user,
        sourceCompanyName,
        sourceCompanyId,
        userSourceCompanies,
        status,
        fetchUser,
        fetchCSRFToken,
        changeSourceCompany,
        loginAuth
    }

    return (
        <AuthContext.Provider value={sharedValuesAndMethods}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthProvider};
export default AuthContext;