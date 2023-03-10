import styles from "./BoxPesquisaCompras.module.css"
import { useEffect, useState } from "react";
import { collection,  getFirestore, getDocs, doc, deleteDoc} from "@firebase/firestore";
import { Link, useParams } from "react-router-dom";
import {FaExclamationCircle,FaCheck,FaCircle,FaQuestion, FaSearch, FaCheckCircle, FaPlusCircle} from "react-icons/fa"
import User from "../components/Hooks/User"
import App from "../components/Hooks/App"
import Loading from "../components/loading";
import CarrinhoVazio from "../components/CarrinhoVazio"
import moment from "moment";


export default function BoxPesquisaCompras (props) {


    const db = getFirestore(App)
    const UserCollection = collection(db, "testeusers")
    const {status} = useParams()
    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))

                setLoader(true)
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])


    produtos.sort(function(a, b) {if(moment(a.data).format('DD-MM-YYYY') >
    moment(b.data).format('DD-MM-YYYY')) {return -1;} else {return true;}})
    
    var busca = props.busca
    

    function filter () {
        let list = []
        if (!busca.idPag) {
            if (!busca.status || busca.status == "--") {
                if (!props.busca.date) {
                    produtos && produtos.map(item => {
                        list.push(item)
                    })
                } else {
                    produtos && produtos.map(item => {
                        if (item.data == moment(busca.date).format('DD/MM/YYYY')) {
                            list.push(item)
                        }
                    })
                }
            } else {
                if (!props.busca.date) {
                    produtos && produtos.map(item => {
                        if (item.status == busca.status) {
                            list.push(item)
                        }
                    })
                } else {
                    produtos && produtos.map(item => {
                        if (item.status == busca.status && item.data == moment(busca.date).format('DD/MM/YYYY')) {
                            list.push(item)
                        }
                    })
                }
            }
        }

        if (busca.idPag) {
            produtos && produtos.map(item => {
                if (item.idPagamento == busca.idPag) {
                    list.push(item)
                }
            })
        }
        return list
    }

    var list = filter()




    return (
    <>{produtos && produtos.length <= 1 ? 
    <>
        <CarrinhoVazio text="Ainda n??o tem nenhum compra"/>
    </>: User.length > 0 &&

    

    <div className={styles.container}>
        <h4>Minhas Compras</h4>
        <ul className={styles.list}>
            {list.length > 0 ? list.map(dados => {
                if (User[0].id == dados.iduser) {
                            return (
                                <li key={dados.id}>
                                    <div>
                                        <p className={styles.date}>{dados.data}</p>
                                        <div className={styles.item}>
                                            <div className={styles.header}>
                                                <h4></h4>
                                            </div>
                                            <div className={styles.body}>
                                                <div className={styles.cont_img}>
                                                    <img src={dados.foto1}/>
                                                    {dados.foto2 ? <img src={dados.foto2}/> : <></>}
                                                </div>
            
                                                <p><span className={dados.status == "pending" && `${styles.margin_right} ${styles.pending}`  ||
                                                    dados.status == "concluido" && `${styles.margin_right} ${styles.concluido}`||
                                                    dados.status == "expirado" && `${styles.margin_right} ${styles.expirado}`
                                                }
            
                                                >{dados.status == "pending"? <FaExclamationCircle/> : <FaCheckCircle/>}
                                                </span><span className={styles.margin_right}>Pedido</span>
            
                                                <span className={dados.status == "pending" && `${styles.margin_right} ${styles.pending}` ||
                                                 dados.status == "concluido" && `${styles.margin_right} ${styles.concluido}`||
                                                 dados.status == "expirado" &&  `${styles.margin_right} ${styles.expirado}`
                                                 }>{dados.status}</span>
                                                 &bull; N&ordm; {dados.idPagamento}</p>
                                            </div>
                                            <div className={styles.line}></div>
                                            <div className={styles.footer}>
                                                <div className={styles.cont_buttons}>
                                                    <button>Ajuda</button>
                                                    <Link to={`/Home/MinhasCompras/DetalhesDaCompra/${dados.id}`}><button>Ver Detalhes</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    }):
                    <div>
                        <h4>Sem resultados para esta pesquisa</h4>
                    </div>
                    }
                </ul>
            </div>




    }
    {!loader && 
        <div className={styles.cont_loader}>
            <Loading/>
        </div>}
        
    </>
    )
}