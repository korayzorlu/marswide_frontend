import { Link, Outlet } from "react-router-dom";
import Card from "../../../../component/card/Card";
import CardBody from "../../../../component/card/CardBody";
import Form from "../../../../component/form/Form";
import Input from "../../../../component/input/Input";
import CardFooter from "../../../../component/card/CardFooter";
import Button from "../../../../component/button/Button";

function AuthSettings(props) {
    const {user} = props;
    
 
    return ( 
        <div className="row g-0">
            <div className="col-md-12">
                <Outlet/>
            </div>
        </div>
    );
}

export default AuthSettings;