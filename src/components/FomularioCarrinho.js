import styles from "./FormularioCarrinho.module.css"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { auth } from "../service/firebase"
import firebase from 'firebase/compat/app';
import '@firebase/firestore';
import { collection,  getFirestore, addDoc, getDocs, setDoc, doc} from "@firebase/firestore";
import Congratulation from "./Congratulations";

const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)



export default function ConfirmaCarrinho () {
    const [state, setState] = useState(false)

    const AlterStateTrue = () => {
        setState(true)
    }
    const AlterStateFalse = () => {
        setState(false)
    }


    //autenticando usuario
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

    

    //pega itens do carrinho
    function pegaDados() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        
        return produtosSalvos
    }
    const itens = pegaDados()
    


    //variavel que faz as conexões
    const db = getFirestore(app)


    
    //pega usuarios das compras
    
    var listIDs = []
    const [Ids, SetIds] = useState([])
    const UsuarioCollection = collection(db, "testeusers");
    if (Ids) {
        Ids.map(item => listIDs.push(parseInt(item.id)))
    }

    const UserCollection = collection(db, "testeusers")
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
    

    const addcompra = async() => {
        itens && itens.map((item, index)=>{
            setDoc(doc(db, `testeusers/${max}/compra`, `${index}`), {
                id:item.id,
                produto:item.nome,
                preço: item.preco,
                qtd: item.qtd
            });
        })
    }


    return (
        <>
        <div className="container">
            <h3>Você confirma os itens que estão no carrinho?</h3>
            <div>
                
                <button className={state ? styles.press : styles.btn_confirm} onClick={AlterStateTrue} id="confirm">{state ? <span>confirmado</span> : <span>confirmar</span>}</button>
                <button className={styles.btn_cancel} onClick={AlterStateFalse}>Cancelar</button>
            </div>
        </div>
        <div className={styles.navigation}>
            <Link to="/checkout/usuario"><button>Voltar</button></Link>
            {state && <button onClick={()=> addcompra()} type="button" data-bs-toggle="modal" data-bs-target="#Congratulations">Avançar</button>}
        </div>

        <div className="modal fade" id="Congratulations" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`modal-dialog modal-sm`}>
                        <div className="modal-content">
                            <Congratulation type="button"
                            dismiss="modal"
                            aria_label="Close"/>
                        </div>
                    </div>
                </div>
        </>
    )
}