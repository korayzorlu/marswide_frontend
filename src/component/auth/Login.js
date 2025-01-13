import { useEffect, useContext, useState } from "react";
import { Input } from "mdb-ui-kit";
import AuthContext from "../../context/auth";
import { Link } from "react-router-dom";


function Login() {
    const {theme,loginAuth,authMessage,clearAuthMessage} = useContext(AuthContext)
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    

    useEffect(() => {
        //mdb input
        const inputs = document.querySelectorAll('.form-outline');
        inputs.forEach((input) => {
            new Input(input); // Her dropdown öğesini başlat
        });

    }, []);

    
    const handleLoginAuth = (event) => {
        event.preventDefault();
        
        loginAuth(email, password, remember);
    };

    const handleRemember = (event) => {
        setRemember(event.target.checked);
    };

    return ( 
        <>
            <form className="card-body text-center"onSubmit={handleLoginAuth}>
                <h5 className="card-title mb-3">Log in</h5>
                <div data-mdb-input-init className="form-outline mb-3">
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="formOutline-user-login-email" className="form-control" required />
                    <label className="form-label" for="formOutline-user-login-email-">Email address</label>
                </div>
                <div data-mdb-input-init className="form-outline mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="formOutline-user-login-password" className="form-control" required />
                    <label className="form-label" for="formOutline-user-login-password-">Password</label>
                </div>
                <div className="row mb-3">
                    <div className="col d-flex justify-content-center">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={remember} onChange={handleRemember} id="formOutline-user-rememberMe"/>
                        <label className="form-check-label" for="formOutline-user-rememberMe"> Remember me </label>
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
            Don't have an account? <Link to="/auth/register" onClick={() => clearAuthMessage()} className="text-blue-500 fw-bold">Sign up</Link>
            </div>
        </>
    );
}

export default Login;