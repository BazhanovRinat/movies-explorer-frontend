import { NavLink } from 'react-router-dom';

function NavBar(props) {

    return (
        <NavLink className={props?.className} to={`/${props?.path}`} onClick={props?.signOut} >{props?.name}</NavLink>
    )
}

export default NavBar