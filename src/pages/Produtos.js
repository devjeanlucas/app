import styles from "./Produtos.module.css"
import { useParams } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa"
import Message from "../components/Message"
import { Link } from "react-router-dom"
import Loading from "../components/loading"



import firebase from 'firebase/compat/app';
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";


import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)


export default function ViewPage() {

    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(app)
    const UserCollection = collection(db, "produtos")
  
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

    
    
    
    
    const {id} = useParams()

    
    function adicionaOuRemove(id, list, produto) {
        let lista = list
        
        let index = lista.findIndex(val => val.id == id);
        if(index < 0) {
            lista.push(
                {
                    id,
                    nome: produto.nome,
                    imagem: produto.imagem,
                    preco: produto.preco,
                    qtd: 1
                }
                )
                notify(200)
            } else {
                notify(300)
            }
            localStorage.setItem("itenscarrinho",JSON.stringify(lista))
        }

    const [state, setState] = useState('')
        
    function addCompra(id, produto) {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        adicionaOuRemove(id, produtosSalvos, produto)
    }

    const notify = (status) => {
        if (status == 200) {
            toast.success("Adicionado a sacola")
        }
        else {
            toast.error("Item já está na sua sacola")
        }
    };


    return (
        <div>
           {produtos && produtos.map(prod => {
                if (prod.iden == id) {
                    return (
                        <>
                            <div className={styles.header}>
                                <Link to="/estoque/todos"><FaAngleLeft/>Retornar ao estoque</Link>
                            </div>
                            <div className={`${styles.container} row`}>
                                <div className="col-md-7">
                                    <div className={styles.cont_img_active}><img src={prod.imagem} className={styles.img_active}/></div>
                                </div>
                                <div className="col-md-5">
                                    <div className={styles.container_text}>
                                        <h1>{prod.title}</h1>
                                        <p>Este produto é vendido e entregue por: <a href="">JB presentes</a></p>
                                        <div className={styles.description}>
                                            <h4>descrição do produto:</h4>
                                            <p>Marca : <span>{prod.marca}</span></p>
                                            <p>Material : <span>{prod.material}</span></p>
                                        </div>

                                        <p className={styles.par_price}>por: <span className={styles.price}>R$ {prod.preco},00</span> à vista</p>

                                        <div className={styles.price_card}>
                                            <p>ou <span>R$ {prod.preco},00</span> em 1x <span>R$ {prod.preco},00</span> no Mercado Pago</p>
                                            <div className={styles.line}></div>
                                        </div>
                                        <button className={styles.btn_buy}
                                        onClick={()=> {addCompra(prod.iden, prod)}}>Comprar</button>
                                        <ToastContainer/>
                                    </div>
                                </div>
                                {state === "add"? <Message type="sucess" msg="Item adicionado"/>: state === "nan" && <Message type="error" msg="Já existe"/>
                                }
                            </div>
                            
                        </>
                    )
                }
            
                
            })
        }
        {!loader && 
            <div className={styles.cont_loader}>
                <Loading/>
            </div>
        }
            
            
        </div>
    )
}