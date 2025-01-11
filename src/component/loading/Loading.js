import { useContext } from "react";
import AuthContext from "../../context/auth";

function Loading() {
    const {theme} = useContext(AuthContext)
    return ( 
        <div className="row">
            <div className="col-md-12 w-100 vh-100 text-center d-flex justify-content-center align-items-center">

                <img src={require(`../../images/logo/${theme}/marswide-icon.png`)} height="120" alt=""/>

            </div>
        </div>
     );
}

export default Loading;