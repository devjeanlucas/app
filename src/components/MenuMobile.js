import { Link } from "react-router-dom"
import styles from "./MenuMobile.module.css"
import User from "../components/Hooks/User"
import { FaPowerOff } from "react-icons/fa"




export default function MenuMobile () {

    return (
        <div id="menu">
            <div className={`${styles.container_mob}`}>
                <div className={styles.header}>
                    <h4>{User[0] && User[0].name}</h4>
                    <p>{User[0] && User[0].email}</p>
                    {User[0] && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" && 
                        <div>
                            <span><FaPowerOff/>Admin </span>
                            <Link to="/vendas/clientes">Vendas</Link>
                        </div>
                    }
                </div>
                <ul className={styles.categories}>
                    <Link to="/Perfil">Perfil</Link>
                    <Link to="/estoque/todos">Estoque</Link>
                    <Link>Sobre</Link>
                </ul>
            </div>
        </div>
    )
}