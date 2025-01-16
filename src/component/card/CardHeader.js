function CardHeader(props) {
    const {children} = props;
    return ( 
        <div className="card-header">
            {children}
        </div>
    );
}

export default CardHeader;