import styles from "./Produtos.module.css"
import { useParams } from "react-router-dom"
import { FaAngleLeft, FaRegFrown } from "react-icons/fa"
import { Link } from "react-router-dom"
import Loading from "../components/loading"
import User from "../components/Hooks/User"
import App from "../components/Hooks/App"
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function ViewPage() {

    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(App)
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

    function Add (id, produto) {

        let produtosSalvos = new Array()

        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }

        let index = produtosSalvos.findIndex(prop => prop.id == id)
        if (index < 0) {
            produtosSalvos.push({
                id: id,
                nome: produto.nome,
                imagem: produto.imagem,
                preco: produto.preco,
                qtd: 1
            })
            localStorage.setItem("itenscarrinho",JSON.stringify(produtosSalvos))
            toast.success("Adicionando a sacola")
        } else {
            const obj = produtosSalvos[index]
            obj['qtd'] += 1 
            localStorage.setItem("itenscarrinho",JSON.stringify(produtosSalvos))
            toast.success("Adicionando mais um a sacola")
        }
    }



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

                                    <div className={styles.cont_img_active}>
                                        <img src={prod.imagem} className={styles.img_active}/>
                                    </div>
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
                                        {prod.estoque == 0 ? 
                                        <div className={styles.cont_button}>
                                            <p>Produto em falta no momento <span><FaRegFrown/></span></p>
                                            <button className={`${styles.disabled} ${styles.btn_buy}`}
                                            disabled>Comprar</button>
                                        </div>
                                        :
                                        <button className={styles.btn_buy}
                                        onClick={()=> {Add(prod.id, prod)}}>Comprar</button>
                                    
                                        }
                                        <ToastContainer/>
                                    </div>
                                </div>
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