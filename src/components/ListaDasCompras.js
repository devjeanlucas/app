import styles from "./MinhasCompras.module.css"
import { useEffect, useState } from "react";
import {firebase, auth} from "../service/firebase"
import { collection, getDocs, getFirestore, addDoc} from "@firebase/firestore";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"
import {FaExclamation,FaCheck,FaCircle,FaQuestion} from "react-icons/fa"




const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)

export default function ListaDasCompras () {


    const db = getFirestore(app)
    const UserCollection = collection(db, "testeusers")

    const [produtos, setProdutos] = useState([])
    const [user, setUser] = useState();


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
        <div className={styles.container_compras}>
            { produtos && produtos.map(item => {
                if (item.iduser === user.id) {
                    return (
                        <li key={item.id} className="col-12 col-sm-12 col-md-6">
                            <div className={styles.cont_compra}>
                                    <div className={`row ${styles.header}`}>
                                        <div className="col-2">
                                            <img src={logo} alt="logo jb" className={styles.logo}/>
                                        </div>
                                    <div className="col-4">
                                        <div className={styles.cont_horario}>
                                            <p>data: <span>{item.data}</span></p>
                                            <p>hora: <span>{item.horario}</span></p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className={styles.content_compra}>
                                            <p className={styles.status}>{item.status == "pending" ? <FaExclamation className={styles.exclamation}/>: <FaCheck className={styles.check}
                                            />}Pedido: {item.status == "pending" && <span className={styles.pending}>pendente</span>} <FaCircle className={styles.separator}/> <span>Nº {item.idPagamento}</span></p>
                                        </div>
                                        <div className={`row ${styles.cont_buttons}`}>
                                            <div className="col-6">
                                                <button><span><FaQuestion/></span> Ajuda</button>
                                            </div>
                                            <div className="col-6">
                                            <Link to={`/Compras/MinhasCompras/DetalhesDaCompra/${item.id}`} className={styles.link}><button>Ver compra</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                }
            })}
        </div>
    </>
    )
}