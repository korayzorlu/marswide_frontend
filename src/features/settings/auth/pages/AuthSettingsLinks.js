import { Link } from "react-router-dom";

function AuthSettingsLinks() {
    return ( 
        <>
            <div className="row border-bottom p-2">
                <Link to="/settings/auth/personal" className="col-md-12 p-2 fw-bold d-flex">
                    <span className="me-auto">Personal</span>
                    <i className="fas fa-arrow-right fs-5 align-content-center"></i>
                </Link>
            </div>
            <div className="row border-bottom p-2">
                <Link to="/settings/auth/email" className="col-md-12 p-2 fw-bold d-flex">
                    <span className="me-auto">Email</span>
                    <i className="fas fa-arrow-right fs-5 align-content-center"></i>
                </Link>
            </div>
            <div className="row p-2">
                <Link to="/settings/auth/password-reset" className="col-md-12 p-2 fw-bold d-flex">
                    <span className="me-auto">Password Reset</span>
                    <i className="fas fa-arrow-right fs-5 align-content-center"></i>
                </Link>
            </div>
        </>    
    );
}

export default AuthSettingsLinks;