import styles from "./FormularioPesquisa.module.css"
import { collection,  getFirestore, getDocs, setDoc, doc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import '@firebase/firestore';
import App from '../components/Hooks/App';
import moment from "moment";


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
    var comprador = props.busca.comprador || ""
    var idPagamento = props.busca.idpagamento || ""

    


    function retornaEletronico (value){
        if (comprador == "" && value.idPagamento == idPagamento) 
        return value
        if (idPagamento == "" && comprador == "" && value.data == dataFormatada) 
        return value
        if (value.comprador == comprador)
        return value;
    }
    var produtosEletronico = produtos.filter(retornaEletronico);

    console.log(produtosEletronico)
    

    return (
        <>
        <p className={styles.date}>data: <strong>{dataFormatada}</strong></p>
        <div className={styles.container}>
            {produtosEletronico && produtosEletronico.map(item => {
                return (
                    <>
                    <div className={styles.li}>
                        <p>{item.comprador}</p>
                        <p>{item.idPagamento}</p>
                        <p>{item.status}</p>
                    </div>
                    </>
                )
            })}
        </div>
        </>
    )
}