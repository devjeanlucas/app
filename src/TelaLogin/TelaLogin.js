import styles from "./TelaLogin.module.css"
import {firebase, auth} from "../service/firebase"
import {  useState } from "react"

export default function Login () {

    const [user, setUser] = useState();
    
    const HandleClickLoginGoogle = async() => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider);
        if (!result.user) {
            const {uid, displayName, photoURL} = result.user
            if (!displayName && !photoURL) {
                throw new Error('Usuário sem Nome ou foto')
            }
            setUser({
                id: uid,
                avatar: photoURL,
                name: displayName
            })
        }
    }
    
    return (
    <>
        <div className={styles.container}>
            <div className={`row ${styles.box}`}>
                <div className="col-sm-6">
                    <div className={styles.text}>
                        <h3>Faça Login com:</h3>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className={styles.content_btn_login}>
                        <button onClick={HandleClickLoginGoogle}>Gmail<img src="https://static.vecteezy.com/system/resources/previews/016/716/465/non_2x/gmail-icon-free-png.png" alt="logo facebook" className={styles.icon}/></button>
                    </div>
                </div>
            </div>   
        </div>
    </>
    )
}