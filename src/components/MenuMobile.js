import { Link } from "react-router-dom"
import styles from "./MenuMobile.module.css"
import {FaArrowRight} from "react-icons/fa"




export default function MenuMobile (props) {
    

    return (
        <div id="menu">
            <div className={`${styles.container_mob}`}>
                <ul className={styles.categories}>

                    <li><FaArrowRight className={styles.btn_close}
                    type={props.type}
                    data-bs-dismiss={props.dismiss}
                    aria-label={props.arial_label}
                    /></li>

                    <Link to="/">Home</Link>
                    <Link to="/estoque/todos">Estoque</Link>
                    <Link>Sobre</Link>
                </ul>
                <div className={styles.footer}>
                    <h4>Log Out</h4>
                </div>
            </div>
        </div>
    )
}