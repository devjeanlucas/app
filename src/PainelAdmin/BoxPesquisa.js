import styles from "./FormularioPesquisa.module.css"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import { useEffect, useState } from "react";
import '@firebase/firestore';
import App from '../components/Hooks/App';
import moment from "moment";
import {FaCircle, FaExternalLinkSquareAlt} from "react-icons/fa"
import { Link } from "react-router-dom";


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
    var email = props.busca.email





    function busca () {
        let list = []

        if (idPagamento) {
            vendas && vendas.map(item => {
                if (item.idPagamento == idPagamento) {
                    list.push(item)
                }
            })
        }
        if (email && !idPagamento) {
            vendas && vendas.map(item => {
                if (item.email == email) {
                    if (!props.busca.data) {
                        if (!status || status == "--") {
                            list.push(item)
                        }
                        if (status && status == item.status) {
                            list.push(item)
                        }
                    } else {
                        if (!status || status == "--") {
                            if (item.data == dataFormatada) {
                                list.push(item)
                            }
                        } else {
                            if (status == item.status && item.data == dataFormatada) {
                                list.push(item)
                            }
                        }
                    }
                } 
            })
        }

        if (comprador && !idPagamento) {
            if (email) {
                return list.push("incompativel")
            } else {
                vendas && vendas.map(item => {
                    if (item.comprador == comprador) {
                        if (!props.busca.data) {
                            if (!status || status == "--") {
                                list.push(item)
                            } 
                            if (status && status == item.status) {
                                list.push(item)
                            }
                        } else {
                            if (!status || status == "--") {
                                if (dataFormatada == item.data) {
                                    list.push(item)
                                }
                            } else if (status == item.status && dataFormatada == item.data) {
                                list.push(item)
                            }
                        }
                        
                    }
                })
            }
            
        }
        if (!idPagamento && !comprador && !email){
            vendas && vendas.map(item => {
                if (!props.busca.data) {
                    if (item.status != "inerit") {
                        if (!status || status == "--") {
                            list.push(item)
                        } else {
                            if (status == item.status) {
                                list.push(item)
                            }
                        }
                    }
                } else {
                    if (!status || status == "--") {
                        if (dataFormatada == item.data) {
                            list.push(item)
                        }
                    } else {
                        if (status == item.status && dataFormatada == item.data) {
                            list.push(item)
                        }
                    }
                }
            })
        }

        return list.sort(function(a, b) {if(moment(a.data).format('DD-MM-YYYY') <
        moment(b.data).format('DD-MM-YYYY')) {return -1;} else {return true;}})
    }

    var list = busca()

    

    
    return (
        <>
        <div className={styles.container}>
            <ul className={styles.list}>
                {list == 5 ? <p>Pesquisar ou por Comprador ou Email</p> : list.length > 0 ? list.map(item => {
                    return (
                        <>
                            <li key={item.id}>
                                <p className={styles.date}>{item.data}</p>
                                <div className={`row`}>
                                    <div className="col-1">
                                        <p><FaCircle className={`${styles.ball} ${item.status=="pending"?styles.pending:styles.complete}`}/></p>
                                    </div>
                                    <div className={`col-10`}>
                                        <div className={styles.li}>
                                            <p>{item.comprador}</p>
                                            <p>{item.idPagamento}</p>
                                            <p className={item.status == "pending" ? styles.pending: styles.complete}>{item.status}</p>
                                        </div>
                                    </div>
                                    <div className="col-1">
                                        <Link to={`/vendas/clientes/detailsvenda/${item.id}`}>
                                            <div className={styles.btn_link}><FaExternalLinkSquareAlt/></div>
                                        </Link>
                                    </div>
                            
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