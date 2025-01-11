import { useEffect, useContext, useState } from "react";
import { Input, initMDB } from "mdb-ui-kit";
import ThemeContext from "../../context/theme";
import AuthContext from "../../context/auth";


function Login() {
    const {theme} = useContext(ThemeContext)
    const {fetchCSRFToken,loginAuth} = useContext(AuthContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    useEffect(() => {
            const inputs = document.querySelectorAll('.form-outline');
            inputs.forEach((input) => {
                new Input(input); // Her dropdown öğesini başlat
            });
    }, []);

    
    const handleLoginAuth = (event) => {
        event.preventDefault();
        
        loginAuth(username, password);
    };

    return ( 
        <div className="row">
            <div className="col-md-6 ms-auto me-auto">

                <div className="card">
                    <div className="row">
                        <div className="col-md-6 login-img-">
                            <img src={require("../../images/landing/login-img-1.jpg")} className="img-fluid" alt="Marswide"/>
                        </div>
                        <div className="col-md-6 login-col-">
                            
                            <div className="card-header">
                                <div className="row justify-content-center">
                                    <div className="col-md-4 text-center">
                                        <img src={require(`../../images/logo/${theme}/marswide-icon.png`)} className="" height="60" alt="Marswide"/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body text-center">
                                <h5 className="card-title">Login</h5>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} id="formOutline-user-email" className="form-control" />
                                    <label className="form-label" for="formOutline-user-email-">Email address</label>
                                </div>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="formOutline-user-password" className="form-control" />
                                    <label className="form-label" for="formOutline-user-password-">Password</label>
                                </div>
                                <div className="row mb-4">
                                    <div className="col d-flex justify-content-center">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="form-remember"/>
                                        <label className="form-check-label" for="form-remember"> Remember me </label>
                                    </div>
                                    </div>

                                    <div className="col">
                                    <a href="#!">Forgot password?</a>
                                    </div>
                                </div>
                                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block" onClick={handleLoginAuth}>Sign in</button>
                            </div>

                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
     );
}

export default Login;