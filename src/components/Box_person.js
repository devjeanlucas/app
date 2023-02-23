import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {auth} from "../service/firebase"
import styles from "./MinhasCompras.module.css"

export default function Box_person () {
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
        {<div className={styles.cont_person}>
            {!user ? <h2>Você não está logado para ver suas compras</h2>:
                <>
                <div>
                    <div className={styles.perfil}>
                        <img src={user.avatar} alt="foto de usuario" className={styles.avatar}/>
                        <h4>{user.name}</h4>
                    </div>
                    <div className={styles.cont_options}>
                        <ul className={styles.list_options}>
                            <li><Link to="/Home/MinhasCompras">Todas as compras</Link></li>
                            <li><Link to="/Home/MeusFavoritos">Meus Favoritos</Link></li>
                            <li><Link to="/Home/MinhasCompras">Compras Pendentes</Link></li>
                            <li><Link to="/Home/MinhasCompras">Compras Finalizadas</Link></li>
                        </ul>
                    </div>
                </div>
                </>
            }
        </div>
    }
    </>
    )
        
}