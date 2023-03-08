import styles from "./Box_Confirm.module.css"
import { FaTimes } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"

import firebase from 'firebase/compat/app';
import '@firebase/firestore';
import { getFirestore, doc, updateDoc, deleteDoc, collection, getDocs} from "@firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import App from "../components/Hooks/App"


export default function Box_confirm (props) {

    
    const {id} = useParams()
    const [compra, setCompra] = useState([])
    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const UserSubCollection = collection(db, `testeusers/${id}/compra`)
    const produtosCollection= collection(db, 'produtos')

    useEffect (()=>{
        try{
            const getUsers = async () => {
                    const datasub = await getDocs(UserSubCollection);
                    setCompra((datasub.docs.map((doc) => ({...doc.data(), id: doc.id}))))

                    const produtosCol = await getDocs(produtosCollection);
                    setProdutos((produtosCol.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                };
    
                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])
    
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

    function deletarVenda() {
        const Doc = doc(db, 'testeusers', `${props.item.id}`);
        deleteDoc(Doc)
        toast.success('Venda deletada com sucesso!')
    }
    
    

    var count=0
    async function confirmaPagamento () {

        produtos && produtos.map(dados => {
            compra && compra.map(item=> {

                if (item.idproduto == dados.id) {
                    if (dados.estoque < item.qtd) {
                        toast.error(`${dados.nome} não tem estoque suficiente`)
                        count+=1
                    } 
                    if (count < 1) {
                        updateDoc(doc(db, "produtos", dados.id), {
                            estoque: dados.estoque - item.qtd
                        })
                        updateDoc(doc(db, "testeusers", id), {
                            status: 'concluido'
                        });
                        toast.success('Pagamento concluido com sucesso!')
                        window.location.reload()
                    }
                }
            })
        })
    }
    const notify = () => {
        toast.error(`superior ao estoque`)
    }

    
    return (
        <>
        <div className="allign">
            <div className="container">
                    <div className={styles.icon_close}>
                        <p>{props.config ? props.config.title : props.title}</p>
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

                            {props.ação == "Apagar Compra Expirada" && 
                            <>
                                <div className={styles.cont_down}>
                                    <button 
                                    type={props.type}
                                    data-bs-dismiss={props.dismiss}
                                    aria-label={props.arial_label}
                                    className={styles.cancel}>
                                        
                                        {props.yes}

                                    </button>
                                    <button className={styles.confirm}
                                    type={props.type}
                                    data-bs-dismiss={props.dismiss}
                                    aria-label={props.arial_label}
                                    onClick={()=> deletarVenda()}
                                    >
                                        {props.no}
                                    </button>

                                </div>
                            </>
                            }

                            {props.config && props.config.ação == "Check Out Form" && 
                            <>
                                <div className={styles.cont_down}>
                                    <button 
                                    type={props.type}
                                    data-bs-dismiss={props.dismiss}
                                    aria-label={props.arial_label}
                                    className={styles.cancel}>
                                        
                                        {props.no}

                                    </button>
                                    {props.count ? 
                                    <Link to="/checkout/usuario">
                                        <button className={styles.confirm}
                                        type={props.type}
                                        data-bs-dismiss={props.dismiss}
                                        aria-label={props.arial_label}
                                        >{props.yes}</button>
                                    </Link> 
                                    : 
                                        <button className={styles.confirm}
                                        type={props.type}
                                        data-bs-dismiss={props.dismiss}
                                        aria-label={props.arial_label}
                                        onClick={() => notify()}
                                        >{props.yes}</button>
                                        }
                                    
                                </div>
                            </>
                            }

                            {props.config && props.config.ação == "Finalizar no Wpp" && 
                            <>
                                <div className={styles.cont_down}>
                                    <button 
                                    type={props.type}
                                    data-bs-dismiss={props.dismiss}
                                    aria-label={props.arial_label}
                                    className={styles.cancel}>
                                        {props.no}
                                    </button>
                                        <button className={styles.confirm}
                                        type={props.type}
                                        data-bs-dismiss={props.dismiss}
                                        aria-label={props.arial_label}
                                        >{props.yes}</button>
                                    
                                </div>
                            </>
                            }
                        
                    
                </div>
        </div>
        <ToastContainer/>
        </>
    )
}