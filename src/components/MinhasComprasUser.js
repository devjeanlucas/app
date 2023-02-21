import styles from "./MinhasCompras.module.css"
import { useEffect, useState } from "react";
import {firebase, auth} from "../service/firebase"
import { collection, getDocs, getFirestore, addDoc} from "@firebase/firestore";
import { Link } from "react-router-dom";


const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)


export default function Minhascompras () {
    const [user, setUser] = useState();
    const [produtos, setProdutos] = useState([])
    const db = getFirestore(app)
    const UserCollection = collection(db, "testeusers")

    



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

    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])
    

    



    return (
        <>
        <div className={styles.container}>
            <h2>Minhas Compras</h2>
            <ul className={styles.cont_list}>
                {produtos && produtos.map(item => {
                    if (item.iduser == user.id) {
                        return (
                            <Link to={`/Compras/${user.id}/MinhasCompras/${item.id}/DetalhesDaCompra`}>
                                <li className={styles.box}>
                                    <div>
                                        <div>
                                            <p>Pagamento:</p>
                                            <p>id: {item.idPagamento}</p>
                                            <p>status: {item.status}</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        )
                    }
                    
                })}
            </ul>
        </div>
        </>
    )
}