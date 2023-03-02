import styles from "./Box_Confirm.module.css"
import { FaTimes } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"

import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs, setDoc, doc, updateDoc,where, query} from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };

const app = firebase.initializeApp(firebaseConfig)


export default function Box_confirm (props) {
    
    function salva(namelist, list) {
        localStorage.setItem(namelist, JSON.stringify(list))
    }
    
    function limpaCarrinho () {
        const ArrayEmpty = []
        salva("itenscarrinho", ArrayEmpty)
        window.location.reload()
    }

    function RetiraItemSacola () {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        let index = produtosSalvos.findIndex(i => i.id === props.id['id'])
        produtosSalvos.splice(index, 1) 
        salva("itenscarrinho", produtosSalvos)
        window.location.reload()
    }

    const {id} = useParams()

    const db = getFirestore(app)
    
    async function confirmaPagamento () {
        await updateDoc(doc(db, "testeusers", id), {
            status: 'concluido'
        });
        window.location.reload()

    }

    
    
    return (
        <>
        <div className="allign">
            <div className="container">
                    <div className={styles.icon_close}>
                        <p>{props.title}</p>
                        <span>
                        <FaTimes
                        type={props.type}
                        data-bs-dismiss={props.dismiss}
                        aria-label={props.arial_label}
                        className="icon"/>
                        </span>
                    </div>
                    <h4 className={styles.name}>{props.id && props.id['nome']}</h4>
                        
                            {props.ação == "retirar item sacola" &&
                            <div className={styles.cont_down}>
                                
                                <button 
                                className={styles.cancel} 
                                type={props.type}
                                data-bs-dismiss={props.dismiss}
                                aria-label={props.arial_label}
                                onClick={()=> RetiraItemSacola()}
                                >
                                    {props.yes}
                                </button>
                                <button
                                type={props.type}
                                data-bs-dismiss={props.dismiss}
                                aria-label={props.arial_label}
                                className={styles.confirm}>
                                    {props.no}
                                </button>

                            </div>}


                            {props.ação == "limpar carrinho" && 
                                <div className={styles.cont_down}>
                                    <button onClick={() => limpaCarrinho()} className={styles.cancel}>{props.yes}</button>

                                    <button
                                    type={props.type}
                                    data-bs-dismiss={props.dismiss}
                                    aria-label={props.arial_label}
                                    className={styles.confirm}
                                    >{props.no}</button>
                                </div>}
                            {props.ação == "Mudar status pagamento" && 
                            <>
                            <div className={styles.cont_down}>
                                <button 
                                type={props.type}
                                data-bs-dismiss={props.dismiss}
                                aria-label={props.arial_label}
                                className={styles.cancel}>{props.no}</button>
                                <button className={styles.confirm}
                                onClick={()=> {confirmaPagamento()}}
                                >{props.yes}</button>
                            </div>
                            </>
                            }

                            {props.ação == "Ir para pagamento" && 
                            <>
                                <div className={styles.cont_down}>
                                    <button 
                                    type={props.type}
                                    data-bs-dismiss={props.dismiss}
                                    aria-label={props.arial_label}
                                    className={styles.cancel}>
                                        
                                        {props.yes}

                                    </button>

                                    <Link to="/Payament">
                                        <button className={styles.confirm}
                                        type={props.type}
                                        data-bs-dismiss={props.dismiss}
                                        aria-label={props.arial_label}
                                        >{props.no}</button>
                                    </Link>
                                </div>
                            </>
                            }
                        
                    
                </div>
        </div>
        </>
    )
}