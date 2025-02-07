function Card(props) {
    const {children} = props;
    return ( 
        <div className="card">
            {children}
        </div>
    );
}

export default Card;
