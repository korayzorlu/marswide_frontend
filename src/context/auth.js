import { createContext } from "react";
import { useState } from "react";

import axios from "axios";

const AuthContext = createContext();

function AuthProvider(props){
    const {children} = props;

    const [user, setUser] = useState({"sourceCompany":""});
    const [sourceCompanyName, setSourceCompanyName] = useState("");
    const [sourceCompanyId, setSourceCompanyId] = useState(0)
    const [userSourceCompanies, setUserSourceCompanies] = useState([]);
    const [status, setStatus] = useState(false)
    
    

    const fetchUser = async () => {
        const responseUser = await axios.get(`/users/api/users/type_current/`, {withCredentials: true});
        setUser(responseUser.data[0]);
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
    
    const loginAuth = () => {
        setStatus(!status);
    };

    const sharedValuesAndMethods = {
        user,
        sourceCompanyName,
        sourceCompanyId,
        userSourceCompanies,
        status,
        fetchUser,
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