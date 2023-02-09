import {FaAngleRight} from "react-icons/fa"
import styles from "./MenuCategories.module.css"
import {Link} from "react-router-dom"

export default function MenuCategories () {
    return (
        <ul className={styles.list_categories}>
            <h4>Categorias</h4>
            <Link to="/estoque/todos"><p>Todos</p><FaAngleRight/></Link>
            <Link to="/estoque/capas"><p>Capas</p><FaAngleRight/></Link>
            <Link to="/estoque/cortinas"><p>Cortinas</p><FaAngleRight/></Link>
            <Link to="/estoque/edredons"><p>Edredons</p><FaAngleRight/></Link>
            <Link to="/estoque/lençois"><p>Lençois</p><FaAngleRight/></Link>
            <Link to="/estoque/toalhas"><p>Toalhas</p><FaAngleRight/></Link>
            <Link to="/estoque/vasos"><p>Vasos</p><FaAngleRight/></Link>
            <Link to="/estoque/tapetes"><p>Tapetes</p><FaAngleRight/></Link>
        </ul>
    )
} 