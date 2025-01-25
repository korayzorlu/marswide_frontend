function Nav(props) {
    const {children, nav} = props;

    return ( 
        <ul className="nav nav-pills m-0 mb-2" role="tablist">
            {children}
        </ul>
    );
}

export default Nav;