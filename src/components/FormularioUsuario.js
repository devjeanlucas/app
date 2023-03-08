import styles from "./FormularioUsuario.module.css"
import {  useState, useEffect } from "react"
import { auth } from "../service/firebase"

import firebase from 'firebase/compat/app';
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
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


    function pegaDados() {
    let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
        produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
    }
    return produtosSalvos
    }

    const itens = pegaDados()


    const [active, setActive] = useState(false)

    const qtdItens = itens.length

    const verifica = () => {
        if (!qtdItens) {
            setActive(false)
            alert('Você ainda não possui compras na sacola')
            return
        }
        setActive(true)
    }

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
                    <form>
                        <div className={styles.item}>
                            <label>Nome Completo</label><br/>
                            <input type="text"/>
                        </div>
                        <div className={styles.item}>
                            <label>Email</label><br/>
                            <input type="text"/>
                        </div>
                        <div className={styles.item}>
                            <label>Telefone</label><br/>
                            <input type="number"/>
                        </div>
                        <div className={styles.item}>
                            <label>Endereço</label><br/>
                            <div className="row">
                                <div className="col-6">
                                    <label>Nome da rua</label>
                                    <input type="text" required/>
                                    <label>Bairro</label>
                                    <input type="text" required/>
                                    <label>Cidade</label>
                                    <input type="text" required/>
                                </div>
                                <div className="col-6">
                                    <label>Nº da casa</label>
                                    <input type="text" required/>
                                    <label>Ponto de referência (opcional)</label>
                                    <input type="text"/>
                                    <label>CEP</label>
                                    <input type="text" required/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.navigation}>
                {user && qtdItens ? 

                <Link to={ `/checkout/confirmItens`} onClick={() => verifica()}><button className={styles.active} >avançar</button></Link>
                :
                <button disabled className={styles.btn_disabled}>avançar</button>
                }
                
            </div>
        </>
    )
}