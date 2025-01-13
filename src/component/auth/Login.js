import { useEffect, useContext, useState } from "react";
import { Input } from "mdb-ui-kit";
import AuthContext from "../../context/auth";
import { Link } from "react-router-dom";


function Login() {
    const {theme,loginAuth,authMessage,clearAuthMessage} = useContext(AuthContext)
    

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    useEffect(() => {
        //mdb input
        const inputs = document.querySelectorAll('.form-outline');
        inputs.forEach((input) => {
            new Input(input); // Her dropdown öğesini başlat
        });

        //clear message
        clearAuthMessage();
    }, []);

    
    const handleLoginAuth = (event) => {
        event.preventDefault();
        
        loginAuth(username, password);
    };

    return ( 
        <>
            <form className="card-body text-center"onSubmit={handleLoginAuth}>
                <h5 className="card-title mb-3">Log in</h5>
                <div data-mdb-input-init className="form-outline mb-3">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="formOutline-user-login-email" className="form-control" required />
                    <label className="form-label" for="formOutline-user-login-email-">Email address</label>
                </div>
                <div data-mdb-input-init className="form-outline mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="formOutline-user-login-password" className="form-control" required />
                    <label className="form-label" for="formOutline-user-login-password-">Password</label>
                </div>
                <div className="row mb-3">
                    <div className="col d-flex justify-content-center">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form-remember"/>
                        <label className="form-check-label" for="form-remember"> Remember me </label>
                    </div>
                    </div>

                    <div className="col">
                    <Link to="/dashboard" className="text-blue-500 fw-bold">Forgot password?</Link>
                    </div>
                </div>
                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Sign in</button>
                <span className={`text-start btn-block ${authMessage.color}`}><i className={authMessage.icon}></i> {authMessage.text}</span>
            </form>
            <div className="card-footer">
            Don't have an account? <Link to="/auth/register" className="text-blue-500 fw-bold">Sign up</Link>
            </div>
        </>
    );
}

export default Login;