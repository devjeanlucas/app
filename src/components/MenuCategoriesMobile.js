import styles from "./MenuCategoriesMobile.module.css"
import {Link} from "react-router-dom"
import {FaTimes} from "react-icons/fa"

export default function MenuCategories (props) {
    return (
        <ul className={styles.list_categories}>
            <div className={styles.title}>
                <h4>Categorias<span><FaTimes
                type={props.type}
                data-bs-dismiss={props.dismiss}
                aria-label={props.arial_label}/></span></h4>
            </div>
            <Link to="/estoque/todos"><p>Todos</p></Link>
            <Link to="/estoque/capas"><p>Capas</p></Link>
            <Link to="/estoque/cortinas"><p>Cortinas</p></Link>
            <Link to="/estoque/edredons"><p>Edredons</p></Link>
            <Link to="/estoque/lençois"><p>Lençois</p></Link>
            <Link to="/estoque/toalhas"><p>Toalhas</p></Link>
            <Link to="/estoque/vasos"><p>Vasos</p></Link>
            <Link to="/estoque/tapetes"><p>Tapetes</p></Link>
        </ul>
    )
}