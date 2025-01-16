import { useEffect } from "react";
import { Input as MDBInput } from "mdb-ui-kit";

function Input(props) {
    const {children,input} = props;

    useEffect(() => {
        //mdb input
        const inputs = document.querySelectorAll('.form-outline');
        inputs.forEach((input) => {
            new MDBInput(input); // Her dropdown öğesini başlat
        });

    }, []);

    return ( 
        <div className="form-outline" data-mdb-input-init>
            <input type={input.type} id={input.id} className="form-control" value={children} required={input.required} disabled={input.disabled}/>
            <label className="form-label" for={input.id}>{input.label}</label>
        </div>
    );
}

export default Input;