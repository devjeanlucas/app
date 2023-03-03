import { FaDollyFlatbed } from "react-icons/fa"
import { Link } from "react-router-dom"
import styles from "./BoxOptions.module.css"


export default function BoxAcompanhaEstoque() {
    return (
    <>
        <div className={` ${styles.container}`}>
            <Link className={styles.cont_view_estoque} to="/meuestoque">
                <FaDollyFlatbed className={styles.icon_estoque}/>
                <h4>Ver meu estoque</h4>
            </Link>
        </div>
    </>
    )
}