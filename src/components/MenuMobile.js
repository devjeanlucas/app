import { Link } from "react-router-dom"
import styles from "./MenuMobile.module.css"
import {FaArrowRight} from "react-icons/fa"

import {  useState, useEffect } from "react"
import { auth } from "../service/firebase"
import Login from "../TelaLogin/TelaLogin"





export default function MenuMobile (props) {

    const [user, setUser] = useState();
    
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                const {uid, displayName, photoURL} = user
                if (!displayName || !photoURL) {
                    throw new Error('Usuário sem Nome ou foto')
                }
                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName
                })
            }
        })
    }, [])
    

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
                    {user && user.id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" && 
                        <Link to="/vendas/clientes">Vendas</Link>
                    }
                    <Link>Sobre</Link>
                </ul>
                <div className={styles.footer}>
                    <h4>Log Out</h4>
                </div>
            </div>
        </div>
    )
}