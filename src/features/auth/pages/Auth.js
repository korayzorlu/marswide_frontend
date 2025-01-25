import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


function Auth({children}) {
    const {theme} = useSelector((store) => store.auth);

    return ( 
        <div className="row">
            <div className="col-md-6 ms-auto me-auto">

            <div className="card">
                <div className="row g-0">
                    <div className="col-md-6 d-none d-md-block">
                        <img src={require("../../../images/landing/login-img-1.jpg")} className="img-fluid" alt="Marswide" loading="lazy"/>
                    </div>
                    <div className="col-md-6 login-col-">
                        
                        <div className="card-header">
                            <div className="row justify-content-center">
                                <div className="col-md-4 text-center">
                                    <img src={require(`../../../images/logo/${theme}/marswide-icon.png`)} className="" height="60" alt="Marswide"/>
                                </div>
                            </div>
                        </div>

                        <Outlet />

                    </div>
                </div>
                
            </div>

            </div>
        </div>
    );
}

export default Auth;