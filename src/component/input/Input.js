import { useEffect } from "react";
import { Input as MDBInput } from "mdb-ui-kit";

function Input(props) {
    const {children,type,id,name,required,disabled,label,addClass,onChange,size,autoComplete} = props;

    useEffect(() => {
        //mdb input
        const inputs = document.querySelectorAll('.form-outline');
        inputs.forEach((input) => {
            new MDBInput(input); // Her dropdown öğesini başlat
        });

    }, []);

    return ( 
        <div className={`form-outline mb-3 ${addClass}`} data-mdb-input-init>
            <input
            className={`form-control ${size ? "form-control-" + size : ""}`}
                type={type}
                id={id}
                name={name}
                value={children}
                onChange={onChange}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
            />
            <label className="form-label" htmlFor={id}>{label}</label>
        </div>
    );
}

export default Input;