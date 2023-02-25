import styles from "./FormularioPesquisa.module.css"
import { collection,  getFirestore, getDocs, setDoc, doc,  query, orderBy, limit, where} from "@firebase/firestore";
import { useEffect, useState } from "react";
import '@firebase/firestore';
import App from '../components/Hooks/App';
import moment from "moment";
import {FaCircle} from "react-icons/fa"


export default function BoxPequisa (props) {


    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "testeusers")
    
    
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))

                
                    };
    
                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])

    var dataFormatada = moment(props.busca.data).format('DD/MM/YYYY')
    var comprador = props.busca.comprador 
    var idPagamento = props.busca.idpagamento

    
    const[result, setResult] = useState([])



    

    async function retornaEletronico (){
        
        if (idPagamento && !comprador) {
            const list = []
            produtos.map(item => {if (item.idPagamento == idPagamento) list.push(item)})
            return setResult(list)
        }
        
        if (!comprador && !idPagamento) {
            const q = query(UserCollection, orderBy("horario", "desc"), limit(6));
            const te = await getDocs(q);
            return setResult((te.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        }
        
    }

    var produtosEletronico = produtos.filter(retornaEletronico);




    

    return (
        <>
        <p className={styles.date}>data: <strong>{dataFormatada}</strong></p>
        <div className={styles.container}>
            {result && result.map(item => {
                return (
                    <>
                    <div className={styles.li}>
                        <div className={`${styles.ball} ${item.status == "pending" ? styles.pending: styles.complete}`}><FaCircle/></div>
                        <p>{item.comprador}</p>
                        <p>{item.idPagamento}</p>
                        <p className={`${item.status == "pending" ? styles.pending: styles.complete}`}>{item.status}</p>
                    </div>
                    </>
                )
            })}
        </div>
        </>
    )
}