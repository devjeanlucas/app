import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore, addDoc} from "@firebase/firestore";
import Loading from "./loading"
import { useParams } from 'react-router-dom';
import styles from "./Detalhedecompra.module.css"


const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)



export default function Compra () {
    const {id} = useParams()

    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(app)
    const UserCollection = collection(db, `testeusers/${id}/compra`)
  
    useEffect (()=>{
        const getUsers = async () => {
        const data = await getDocs(UserCollection);
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setLoader(true)
        };
        getUsers()
        
    },[])

    if (loader) {
        var listPrecos = []
            var list = []

            produtos && produtos.map(item => {return listPrecos.push({qtd: item.qtd, preco: item.preço})})

            listPrecos.map(item => {return list.push(item.qtd * item.preco)})

            var soma = list.reduce((soma, i) => {return soma + i})
    }
    

    return (
       <>
        <div className={styles.container}>
            <h4>Detalhes da compra</h4>
            <ul className={styles.list}>
                {produtos && produtos.map(item => {
                    return (
                        <li>
                            <div className='row'>
                                <div className='col-sm-2'>
                                    <div className={styles.cont_foto}>
                                        <img src={item.foto} className={styles.foto}/>
                                    </div>
                                </div>
                                <div className='offset-sm-2 col-sm-8'>
                                    <div className={styles.cont_info}>
                                        <p>{item.produto}</p>
                                        <p>qtd: x{item.qtd}</p>
                                        <p>R$ {item.preço.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <h4>Total: R$ {soma.toFixed(2)}</h4>
            <a href='/'>Clique para finalizar</a>
            {!loader && 
            <div className={styles.cont_loader}>
                <Loading/>
            </div>
            }
        </div>
        
       </>
    )
}