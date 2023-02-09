import { Link} from "react-router-dom"
import {FaShoppingCart, FaUser, FaBars, FaSignOutAlt} from "react-icons/fa"
import styles from "./NavBar.module.css"
import logo from "../img/logo.png"

import {  useState, useEffect } from "react"
import {firebase, auth } from "../service/firebase"
import Login from "../TelaLogin/TelaLogin"


export default function NavBar () {

    const [state, setState] = useState(false)
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

    const handleClick = () => {
        setState(!state)
    }
    const handleClickLogOut = () => {
        firebase.auth().signOut()
        .then(() => {window.location.href = "/"})
        .catch(() => {alert('não foi possivel sair da conta')})
    }


    return (
        <>{user && <p className={styles.name_user}>usuário logado: <span>{user.name}</span></p>}
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
                <Link to="/carrinho"><FaShoppingCart className={styles.icon}/></Link>
                    {user ? 
                        <span className={styles.content_icon} onClick={handleClickLogOut}>
                            <p>LogOut</p>
                            <FaSignOutAlt className={styles.icon_login}/>
                        </span>
                        : <span className={styles.content_icon} onClick={handleClick}>
                            <p>Login</p>
                            <FaUser className={styles.icon_login} />
                        </span>
                            }
                     {state && <Login/>}
                <div>
            </div> 
                </div>
            </div>
        </nav>
        </>
    )
}