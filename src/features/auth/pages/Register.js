import { useEffect, useContext, useState } from "react";
import { Input } from "mdb-ui-kit";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/auth";

function Register() {
    const {registerAuth,authMessage,clearAuthMessage} = useContext(AuthContext)
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [refCode, setRefCode] = useState("");

    useEffect(() => {
        //mdb input
        const inputs = document.querySelectorAll('.form-outline');
        inputs.forEach((input) => {
            new Input(input); // Her dropdown öğesini başlat
        });

        //clear input
        setEmail("");
        setPassword("");
        setFirstName("");
    }, []);

    const handleRegisterAuth = (event) => {
        event.preventDefault();
        
        registerAuth(email, password, passwordConfirmation, firstName, lastName, refCode);
    };

    return ( 
        <>
            <form className="card-body text-center"onSubmit={handleRegisterAuth}>
                <h5 className="card-title mb-3">Sign up to Marswide</h5>
                <div className="row">
                    <div className="col-md-6">
                        <div data-mdb-input-init className="form-outline mb-3">
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="formOutline-user-register-firstName" className="form-control" required />
                            <label className="form-label" for="formOutline-user-register-firstName">First Name</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div data-mdb-input-init className="form-outline mb-3">
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id="formOutline-user-register-lastName" className="form-control" required />
                            <label className="form-label" for="formOutline-user-register-lastName">Last Name</label>
                        </div>
                    </div>
                </div>
                <div data-mdb-input-init className="form-outline mb-3">
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="formOutline-user-register-email" className="form-control" required />
                    <label className="form-label" for="formOutline-user-register-email-">Email address</label>
                </div>
                <div data-mdb-input-init className="form-outline mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="formOutline-user-register-password" className="form-control" autocomplete="new-password" required />
                    <label className="form-label" for="formOutline-user-register-password-">Password</label>
                </div>
                <div data-mdb-input-init className="form-outline mb-3">
                    <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} id="formOutline-user-register-passwordConfirmation" className="form-control" autocomplete="new-password" required />
                    <label className="form-label" for="formOutline-user-register-passwordConfirmation-">Confirm Password</label>
                </div>
                <div data-mdb-input-init className="form-outline mb-3">
                    <input type="text" value={refCode} onChange={(e) => setRefCode(e.target.value)} id="formOutline-user-register-refCode" className="form-control" required />
                    <label className="form-label" for="formOutline-user-register-refCode-">Referance Code</label>
                </div>
                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block">Sign up</button>
                <span className={`text-start btn-block ${authMessage.color}`}><i className={authMessage.icon}></i> {authMessage.text}</span>
            </form>
            <div className="card-footer text-center">
            Have an account? <Link to="/auth/login" onClick={() => clearAuthMessage()} className="text-blue-500 fw-bold">Log in</Link>
            </div>
        </>
    );
}

export default Register;