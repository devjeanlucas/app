import { Link} from "react-router-dom"
import {FaShoppingCart, FaUser, FaBars, FaShoppingBag, FaClipboardList, FaPowerOff} from "react-icons/fa"
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
    
    const [state, setState] = useState(false)

    const handleClick = () => {
        setState(!state)
    }
    

    function pegaItems() {
        let listGeral = []
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            listGeral = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        
        if (listGeral.length == 0) {
            return 0
        } else {
            let listPrecos = []
            
            listGeral.map(item => {listPrecos.push(item.qtd)})
            var soma = listPrecos.reduce((soma, i) => {return soma + i})
            return soma
        }
        
    }
    
    let qtd = pegaItems()


    return (
        <>
        {user && user.id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" && <p className={styles.id_admin}><span><FaPowerOff className={styles.power}/></span>admin</p>}
        <nav className={`${styles.navBar} row`}>
            <div className="col-1 col-sm-1 col-md-4">
                <div className={styles.cont_left}>
                    <Link to="/"><img src={logo} className={styles.logo}/></Link>
                    <div className={styles.content_desk}>
                        <Link to="/">home</Link>
                        <Link to="/estoque/todos">estoque</Link>
                        <Link to="/sobre">sobre</Link>
                    </div>
                </div>
            </div>
            <div className="col-5 col-sm-5 col-md-3">
                <div className={styles.cont_right}>
                    {user && user.id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" && 
                            <Link to="/compras/clientes"><FaClipboardList className={styles.icon}/></Link>
                        }
                    <Link to="/estoque/todos"><FaShoppingCart className={styles.icon}/></Link>
                    <div className={styles.cont_bag}>
                        <Link to="/carrinho"><FaShoppingBag className={styles.icon}/></Link>
                        
                        <div className={styles.qtd} >
                            <p>{qtd}</p>
                        </div>
                        
                        

                    </div>
                    <span className={styles.content_icon} >
                        <FaUser className={styles.icon_login} 
                        onClick={handleClick}/>
                    </span>
                    
                    <div>
                        <FaBars className={`${styles.icon_mobile} navbar-toggler`} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"/>
                    </div>

                    {state && <Login/>}

                <div>
            </div> 
                </div>
            </div>
        </nav>
        
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-sm`}>
                <div className="modal-content">
                    <MenuMobile type="button" 
                    dismiss="modal"
                    aria_label="Close"/>
                </div>
            </div>
        </div>
        </>
    )
}