import { Link} from "react-router-dom"
import {FaShoppingCart, FaRegUserCircle, FaBars, FaShoppingBag, FaClipboardList, FaPowerOff} from "react-icons/fa"
import styles from "./NavBar.module.css"
import logo from "../img/logo.png"
import MenuMobile from "../components/MenuMobile"

import {  useState, useEffect } from "react"
import { auth } from "../service/firebase"
import Login from "../TelaLogin/TelaLogin"


export default function NavBar () {

    const [user, setUser] = useState();
    
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                const {uid, displayName, photoURL, email} = user
                if (!displayName || !photoURL) {
                    throw new Error('Usuário sem Nome ou foto')
                }
                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName,
                    email
                })
            }
        })
    }, [])
    
    


    return (
        <>
        
        
        <div className={styles.container_geral}>
        <div className={styles.container_NavBar}>
                    <nav className={`${styles.navBar}`}>
                        <div className={`row ${styles.nav}`}>
                            <div className="col-1">
                                <div className={styles.cont_left}>
                                    <Link to="/"><img src={logo} className={styles.logo}/></Link>
                                </div>
                            </div>
                            <div className="col-5 ">
                                <div className={styles.cont_right}>
                                    {user && <p>{user.displayName}</p>}
            
                                        {user && user.id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" &&
                                            <Link to="/vendas/clientes"><FaClipboardList className={styles.icon}/></Link>
                                        }
                                        {user && user.id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" &&
                                            <Link to="/estoque/todos"><FaShoppingCart className={styles.icon}/></Link>
                                        }
                                        


                                        <div className={styles.cont_bag}>
                                            <Link to="/carrinho"><FaShoppingBag className={styles.icon}/></Link>
                                        </div>
                                        <div className={styles.content_icon}>
                                            <div className="dropdown">
                                                {!user ?
                                                <button
                                                type="button" 
                                                data-bs-toggle="dropdown" a
                                                ria-expanded="false"
                                                className={styles.btn}>
                                                    <FaRegUserCircle className={`${styles.icon_login}`}
                                                    />
                                                </button>:
                                                    <button 
                                                    type="button" 
                                                    data-bs-toggle="dropdown" 
                                                    aria-expanded="false"
                                                    className={styles.btn}>
                                                        <img src={user.avatar} alt="foto de usuario" className={`${styles.photo_user}`}
                                                        />
                                                    </button>
                                                }
                                                <ul className={`dropdown-menu ${styles.drop}`}>
                                                    <Login/>
                                                </ul>
                                            </div>
                                        </div>
            
                                        <div>
                                            <p>teste</p>
                                            <FaBars className={`${styles.icon_mobile} navbar-toggler`} 
                                            type="button" 
                                            data-bs-toggle="offcanvas" 
                                            data-bs-target="#offcanvasNavbar" 
                                            aria-controls="offcanvasNavbar"/>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </nav>
            </div>
        </div>



        
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="h-100%">
                <div class="overflow-auto"> 
                    <MenuMobile 
                    type="button"
                    data_bs_dismiss="offcanvas" 
                    aria_label="Close"/>
                </div>
            </div>
        </div>
        </>
    )
}