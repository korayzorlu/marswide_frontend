function CardFooter(props) {
    const {children} = props;

    return ( 
        <div className="card-footer">
            {children}
        </div>
    );
}

export default CardFooter;