import styles from "./FormularioCompra.module.css"
import {  useState, useEffect } from "react"
import { auth } from "../service/firebase"
import Message from "./MessageFinal";

import firebase from 'firebase/compat/app';
import '@firebase/firestore';
import { collection,  getFirestore, addDoc} from "@firebase/firestore";

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




    const db = getFirestore(app)
    const UserCollection = collection(db, "testeusers")

    const [nome, setNome] = useState();
    const[email, setEmail] = useState();
    const[pag, setPag] = useState();

    const criaruser = async() => {
        const pagamento = document.querySelector('#pag')
        setPag(pagamento.value)

        const add = await addDoc(UserCollection, {
            comprador: nome,
            email:email,
        })
    }


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
                            <div className="col-sm-5">
                                <label>Nome</label><br/>
                                <input type="text"
                                onChange={(e) => setNome(e.target.value)}
                                value={nome}
                                /><br/>
                                <label>Email</label><br/>
                                <input type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                /><br/>
                                <p>Met. Pagamento</p>
                                <select id="pag">
                                    <option>Crédito</option>
                                    <option>Débito</option>
                                    <option>À vista</option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <div className={styles.cont_adress}>
                                </div>
                            </div>
                        </div>
                        <button className={styles.btn_submit}
                        onClick={() => criaruser()}
                        type="button" data-bs-toggle="modal" data-bs-target={`#MessageFinal`}>Confirmar</button>
                    </form>
                </div>
            </div>
            <div className="modal fade" id="MessageFinal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <Message
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}