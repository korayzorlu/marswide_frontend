import Card from "../../../component/card/Card";
import CardBody from "../../../component/card/CardBody";
import CardHeader from "../../../component/card/CardHeader";
import Input from "../../../component/input/Input";

function Auth(props) {
    const {auth} = props;

    return ( 
        <div className="row">
            <div className="col-md-3">
                <Card>
                    <CardBody>
                        <Input input={auth.input}>{auth.email}</Input>
                    </CardBody>
                </Card>
            </div>
        </div>
        
        
    );
}

export default Auth;