function Col(props) {
    const {children,addClass,size} = props;

    return (
        <div className={size ? `col-md-${size} ${addClass ? addClass : ""}` : `col ${addClass ? addClass : ""}`}>
            {children}
        </div>
    )
}

export default Col
