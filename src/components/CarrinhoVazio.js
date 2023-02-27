import { Link } from "react-router-dom"
import styles from"./CarrinhoVazio.module.css"

export default function Empty (props) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>{props.text}</h2>
                <Link to="/estoque/todos"><button>Clique aqui para explorar</button></Link>
            </div>
        </div>
    )
}