import styles from "./FormularioPesquisa.module.css"
import { collection,  getFirestore, getDocs, setDoc, doc,  query, orderBy, limit, where} from "@firebase/firestore";
import { useEffect, useState } from "react";
import '@firebase/firestore';
import App from '../components/Hooks/App';
import moment from "moment";
import {FaCircle} from "react-icons/fa"


export default function BoxPequisa (props) {


    const [vendas, setVendas] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "testeusers")
    
    
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setVendas((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
    
                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])

    var dataFormatada = moment(props.busca.data).format('DD/MM/YYYY')
    var status = props.busca.status
    var comprador = props.busca.comprador
    var idPagamento = props.busca.idpagamento


    function busca () {
        const list = []

        /*if (!idPagamento && !comprador && status && props.busca.data) {
            const add =() => {
                vendas.map(item => {
                    if (item.data == dataFormatada && item.status == status) {
                        list.push(item)
                    }
                })
            }
            add()
        }

        if (!idPagamento && !comprador && !status || status == "--" && props.busca.data) {
            const add =() => {
                vendas.map(item => {
                    if (item.data == dataFormatada) {
                        list.push(item)
                    }
                })
            }
            add()
        }
        if (!idPagamento && !comprador && !status || status == "--" && !props.busca.data || props.busca.data == "") {
            const add =() => {
                vendas.map(item => {
                    list.push(item)
                    list.splice(0,1)
                    list.push(item)
                })
            }
            add()
        } */

        if (!idPagamento && !comprador && !status || status == "--" && !props.busca.data) {
            const add =() => {
                vendas.map(item => {
                    list.push(item)
                    list.splice(0,1)
                    list.push(item)
                })
            }
            add()
        }
        if (!idPagamento && !comprador && !status || status == "--" || status && props.busca.data) {
            const add =() => {
                vendas.map(item => {
                    if (status) {
                        if (item.data == dataFormatada && status == item.status) {
                            list.push(item)
                        }
                    }
                    if (!status || status == "--") {
                        if (item.data == dataFormatada) {
                            list.push(item)
                        }
                    }
                    
                })
            }
            add()
        }
        if (idPagamento) {
            const add =() => {
                vendas.map(item => {
                    if (item.idPagamento == idPagamento) {
                        list.push(item)
                    }
                })
            }
            add()
        }
        if (comprador && !idPagamento) {
            const add =() => {
                vendas.map(item => {
                    if (!status || status == "--") {
                        if (item.data == dataFormatada && item.comprador == comprador) {
                            list.push(item)
                        }
                        if (!props.busca.data && item.comprador == comprador) {
                            list.push(item)
                        }
                    }
                    if (status || status != "--") {
                        if (item.data == dataFormatada && item.comprador == comprador && item.status == status) {
                            list.push(item)
                        }
                        if (!props.busca.data && item.comprador == comprador && item.status == status) {
                            list.push(item)
                        }
                    }
                    
                    
                    
                })
            }
            add()
        }

        return list
    }


    var list = busca()
    console.log(comprador)
    console.log(list)

    
    return (
        <>
        <div className={styles.container}>
            <ul className={styles.list}>
                {list && list.length > 0 ? list.map(item => {
                    return (
                        <>
                        <li key={item.id}>
                            <p className={styles.date}>{item.data}</p>
                            <div className={styles.li}>
                                <p>{item.comprador}</p>
                                <p>{item.idPagamento}</p>
                                <p>{item.status}</p>
                            </div>
                        </li>
                        </>
                    )
                }):
                <p>Sem resultados para sua pesquisa</p>
            }
            </ul>
        </div>
        </>
    )
}