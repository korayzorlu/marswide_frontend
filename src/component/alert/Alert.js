import { useEffect } from "react";
import { Alert as MDBAlert} from 'mdb-ui-kit';
import { useSelector } from "react-redux";

function Alert(props) {
    const {color,text,icon} = props;
    const {mobile} = useSelector((store) => store.sidebar);

    useEffect(() => {
        //mdb input
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach((alert) => {
            new MDBAlert(alert); // Her dropdown öğesini başlat
        });
    
    }, []);

    

    return ( 
        <div className="alert alert-dismissible fade mt-3 shadow-2" id="mainAlert" role="alert"
        data-mdb-alert-init
        data-mdb-color={color}
        data-mdb-position="bottom-right"
        data-mdb-hidden="true"
        data-mdb-autohide="true"
        data-mdb-width={mobile ? "75%" : "25%"}
        data-mdb-delay="2000"
        >
            <i className={`fas fa-${icon} me-3`}></i>
            {text}
            <button type="button" className="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

export default Alert;