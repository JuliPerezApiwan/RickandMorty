import style from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const Nav = ({ onSearch }) => {
    return(
        <nav className={style.Nav} >
                <Link to='/' className={style.logout}>LOGOUT</Link>
                <Link to='/home' className={style.link}>Home</Link>
                <Link to='/favorites' className={style.link}>Favorites</Link>
                <img className={style.logo} src="https://hbomax-images.warnermediacdn.com/2022-08/tt.png?host=wme-hbomax-drupal-prod.s3.amazonaws.com"/>

            <SearchBar onSearch={onSearch} />
        </nav>
    )
}

export default Nav;