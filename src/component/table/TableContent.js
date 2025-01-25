import { useState } from "react";

function TableContent(props) {
    const {children,width,height} = props;

    return ( 
        <div style={{width:width ? width : "100%",height:height ? height : "94vh"}}>
            {children}
        </div>
    );
}

export default TableContent;