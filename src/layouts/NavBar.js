import { Link} from "react-router-dom"
import {FaShoppingCart, FaUser, FaBars, FaSignOutAlt} from "react-icons/fa"
import styles from "./NavBar.module.css"
import logo from "../img/logo.png"

export default function NavBar () {

    return (
        <>
        <nav className={`${styles.navBar} row`}>
            <div className="col-4">
                <div className={styles.cont_left}>
                    <img src={logo} className={styles.logo}/>
                    <div className={styles.content_desk}>
                        <Link to="/">home</Link>
                        <Link to="/estoque">estoque</Link>
                        <Link to="/sobre">sobre</Link>
                    </div>
                </div>
            </div>
            <div className="col-4 col-sm-2">
                <div className={styles.cont_right}>
                    <div><FaUser className={styles.icon}/></div>
                    <Link to="/carrinho"><FaShoppingCart className={styles.icon}/></Link>
                </div>
            </div>
        </nav>
        </>
    )
}