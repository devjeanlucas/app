import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { useParams } from 'react-router-dom';
import {firebase, auth} from "../service/firebase"
import styles from "./DetailsMinhaCompra.module.css"




const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };

const app = firebase.initializeApp(firebaseConfig)

export default function DetailCompra () {
    
    
    const [user, setUser] = useState();
    const [details, setDetails] = useState([])
    const {compra} = useParams()
    const db = getFirestore(app)

    const UserSubCollection = collection(db,`testeusers/${compra}/compra`)

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
                const data = await getDocs(UserSubCollection);
                setDetails((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };

                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])

    const retornar_pag =() => {
        window.history.back()
    }
    

    return (
        <>
        <button onClick={() => retornar_pag()}>Retornar</button>
        <ul className={styles.cont_list}>
            {details && details.map(item=> {
                return (
                    <li>
                        <div className="container">
                            <p>{item.produto}</p>
                            <p>qtd: x{item.qtd}</p>
                            <p>preço: R${item.preço.toFixed(2)}</p>
                        </div>
                    </li>
                )
            })}
        </ul>
        </>
    )
}