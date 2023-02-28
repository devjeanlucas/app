import styles from "./TelaLogin.module.css"
import {firebase, auth} from "../service/firebase"
import {  useState, useEffect } from "react"
import { FaHouseUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import User from "../components/Hooks/User";

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


    const handleClickLogOut = () => {
        firebase.auth().signOut()
        .then(() => {window.location.href = "/"})
        .catch(() => {alert('não foi possivel sair da conta')})
    }
    
    
    
    return (
    <>
        <div>
            {User[0] ? 
            <ul className={styles.content_btn_login}>
                <li className={styles.box_person}>
                    <div>
                        <h4>{User[0].name}</h4>
                        <p>{User[0].email}</p>
                    </div>
                </li>
                <div className={styles.myperfil}>
                    <Link to="/Home/MinhasCompras/todas"><FaHouseUser className={styles.icon_home}/> Meu perfil </Link>
                </div>
                <li>
                    <button onClick={handleClickLogOut}
                    ><span>Sair</span><FaSignOutAlt 
                    className={styles.logOut}/></button>
                </li>
            </ul>:
                <button onClick={HandleClickLoginGoogle} className={styles.btn_login}><span>Gmail<img src="https://static.vecteezy.com/system/resources/previews/016/716/465/non_2x/gmail-icon-free-png.png" alt="logo facebook" className={styles.icon}/></span></button>
            }
        </div>
    </>
    )
}