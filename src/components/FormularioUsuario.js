import styles from "./FormularioUsuario.module.css"
import {  useState, useEffect } from "react"
import { auth } from "../service/firebase"
import Message from "./MessageFinal";

import firebase from 'firebase/compat/app';
import '@firebase/firestore';
import { collection,  getFirestore, addDoc, getDocs, setDoc, doc} from "@firebase/firestore";
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


export default function Form () {
    //pega usuario logado
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

    //pega id usuario comprador
    const db = getFirestore(app)
   
    
    var listIDs = []
    const [Ids, SetIds] = useState([])
    const UsuarioCollection = collection(db, "testeusers");
    if (Ids) {
        Ids.map(item => listIDs.push(parseInt(item.id)))
    }
    useEffect(()=> {
        const pegaIDS = async () => {
            const data = await getDocs(UsuarioCollection);
            SetIds((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        }
        pegaIDS()
    }, [])

    var max = listIDs.reduce(function(a, b) {
        return Math.max(a, b);
      }, -Infinity);


    const id = max+1
    
    

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.content_title}>
                        <h3>Vamos finalizar os detalhes</h3>
                    </div>
                </div>
                <div className={styles.body}>
                    <form className={styles.form}>
                        <div className="row">
                            <div className="col-12">
                                <div className={styles.content}>
                                    {user ? <div className="row">
                                        <div className="col-sm-6">
                                            <h4>Nome</h4>
                                            <input type="text"
                                            value={user && user.name}
                                            />
                                        </div>
                                    
                                        <div className="col-sm-6">
                                            <h4>Email</h4>
                                            <input type="email"
                                            value={user && user.email}
                                            />
                                        </div>
                                    </div>:
                                    <div>
                                        <h4>Fazer login para continuar</h4>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.navigation}>
                {user ? 
                <Link to={`/checkout/confirmItens/${id}`} className={styles.active}>avançar</Link>
                :
                <button disabled className={styles.btn_disabled}>avançar</button>
                }
                
            </div>
        </>
    )
}