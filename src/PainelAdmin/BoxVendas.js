import styles from "./BoxOptions.module.css"
import { collection,  getFirestore, getDocs, setDoc, doc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import '@firebase/firestore';
import App from '../components/Hooks/App';


export default function BoxVendas () {
    
    
    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "testeusers")
    const [loader, setLoader] = useState(false)

    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoader(true)
                    };
    
                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])
    
    function pegaPendentes() {
        var listPendentes = []
        produtos && produtos.map(item => {if (item.status == "pending") listPendentes.push(item)})
        return listPendentes.length
    }
    function pegaConcluidos() {
        var listConcluido = []
        produtos && produtos.map(item => {if (item.status == "concluido") listConcluido.push(item)})
        return listConcluido.length
    }


    function pegaSaldoConcluido () {
        var listConcluido = []
        produtos && produtos.map(item => {if (item.status == "concluido") listConcluido.push(item)})


        let listPrecos = []

        listConcluido.map(item => {return listPrecos.push(item.total)})

        var soma = 0
        for(var i = 0; i < listPrecos.length; i++) {
            soma += listPrecos[i];
        }

        setDoc(doc(db, `SaldoAdmin`, `Total`), {
            saldo: soma
        });

        return soma
    }

    var pendentes = pegaPendentes()
    var concluido = pegaConcluidos()
    var Saldo = pegaSaldoConcluido()

    return (
        <>
        <div className={styles.container}>
            <strong><p>Minhas Vendas</p></strong>
            <div className={styles.li}>
                <p>Pendentes: </p>
                <p>{pendentes}</p>
            </div>
            <div className={styles.li}>
                <p>Concluidas: </p>
                <p>{concluido}</p>
            </div>
            <div className={styles.li}>
                <p>Saldo:</p>
                <h4><strong>{"R$" + Saldo.toFixed(2)}</strong></h4>
            </div>
        </div>
        </>
    )
}