import styles from "./TelaLogin.module.css"
import {firebase, auth} from "../service/firebase"
import {  useState, useEffect } from "react"
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login () {

    const [userLogin, setUserLogin] = useState();
    
    const HandleClickLoginGoogle = async() => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider);
        if (!result.user) {
            const {uid, displayName, photoURL} = result.user
            if (!displayName && !photoURL) {
                throw new Error('Usuário sem Nome ou foto')
            }
            setUserLogin({
                id: uid,
                avatar: photoURL,
                name: displayName
            })
        }
    }



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

    const handleClickLogOut = () => {
        firebase.auth().signOut()
        .then(() => {window.location.href = "/"})
        .catch(() => {alert('não foi possivel sair da conta')})
    }
    
    
    
    return (
    <>
        <div className={styles.cont_geral}>
            <div className="row">
                <div className="col-12">
                    <div className={`${styles.container}`}>
                        <div className={styles.content_btn_login}>
                                {user ? <div className={styles.cont_logOut}>
                                            <p>
                                                <Link to={`Compras/${user.id}/MinhasCompras`}>Minhas Compras</Link>
                                            </p>
                                            <p>
                                                <span>{user.name}</span>
                                                <button onClick={handleClickLogOut}
                                                className={styles.logOut}
                                                ><FaSignOutAlt/></button>
                                            </p>
                                        </div>
                                :
                                <button onClick={HandleClickLoginGoogle}><span>Gmail<img src="https://static.vecteezy.com/system/resources/previews/016/716/465/non_2x/gmail-icon-free-png.png" alt="logo facebook" className={styles.icon}/></span></button>
                                }
                                
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}