function Nav(props) {
    const {children, nav} = props;

    return ( 
        <ul className="nav nav-pills m-0 mb-3" role="tablist">
            {children}
        </ul>
    );
}

export default Nav;