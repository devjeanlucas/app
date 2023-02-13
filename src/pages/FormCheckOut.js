import styles from "./FormCheckOut.module.css"
import ItensCarrinho from "../components/ItensCarrinho";
import FormularioCompra from "../components/FormularioCompra"
import {FaCaretSquareLeft} from "react-icons/fa"

import {  useState, useEffect } from "react"
import { auth } from "../service/firebase"
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

    /*const db = getFirestore(app)
    const UserCollection = collection(db, "testeusers")

    const[name, setName] = useState()
    const[email, setEmail] = useState()

    const criaruser = async() => {
        setName(user.name)
        setEmail(user.email)
        const add = await addDoc(UserCollection, {
            name,
            email
        })
    }*/

    const retornar = () => {
        window.history.back()
    }

    return (
        <>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-sm-5">
                    <div className={styles.btn_return}>
                        <p onClick={retornar}><span><FaCaretSquareLeft/></span>Retornar</p>
                    </div>

                        <ItensCarrinho/>
                    </div>
                    <div className="col-sm-7">
                        <FormularioCompra/>
                    </div>
                </div>
            </div>
        
        </>
    )
}