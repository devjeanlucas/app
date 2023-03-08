import styles from "./Produtos.module.css"
import { useParams } from "react-router-dom"
import { FaAngleLeft, FaPenSquare, FaRegFrown } from "react-icons/fa"
import { Link } from "react-router-dom"
import Loading from "../components/loading"
import User from "../components/Hooks/User"
import App from "../components/Hooks/App"
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SwiperSlide,Swiper } from "swiper/react"





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

    
    
    
    
    const {produto} = useParams()

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
                preco: produto.precoDesconto ? produto.precoDesconto : produto.preco,
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
                if (prod.nome == produto) {
                    return (
                        <>
                            <div className={styles.header}>
                                <button onClick={()=> window.history.back()}><FaAngleLeft/></button>
                            </div>

                            <div className={`${styles.container} row`}>

                                <div className="col-sm-6 col-lg-7">
                                    {User.length > 0 && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13"
                                    && <Link to={`/edit/${prod.id}`}><FaPenSquare/></Link> 
                                    }
                                    <div className={styles.cont_img_active}>
                                        <h4 className={styles.name}>{prod.nome}</h4>
                                        <div>
                                        <Swiper
                                        spaceBetween={10}
                                        slidesPerView={1}
                                        >
                                            <SwiperSlide>
                                                <img src={prod.imagem} className={styles.img_active}/>
                                            </SwiperSlide>
                                            {prod.img1 && 
                                            <SwiperSlide>
                                                <img src={prod.img1} className={styles.img_active}/>
                                            </SwiperSlide>}
                                            {prod.img2 && 
                                            <SwiperSlide>
                                                <img src={prod.img2} className={styles.img_active}/>
                                            </SwiperSlide>}
                                            {prod.img3 && 
                                            <SwiperSlide>
                                                <img src={prod.img3} className={styles.img_active}/>
                                            </SwiperSlide>}
                                            {prod.img4 && 
                                            <SwiperSlide>
                                                <img src={prod.img4} className={styles.img_active}/>
                                            </SwiperSlide>}
                                            
                                        </Swiper>
                                        </div>
                                    </div>
                                </div>




                                <div className="col-sm-6 col-lg-5">
                                    <div className={styles.container_text}>
                                        <p>Este produto é vendido e entregue por: <a href="">JB presentes</a></p>
                                        <div className={styles.description}>
                                            <p>Marca : <span>{prod.marca}</span></p>
                                            <p>Material : <span>{prod.material}</span></p>
                                        </div>




                                        <p className={styles.par_price}>por: <span className={styles.price}>R$ {prod.precoDesconto ? prod.precoDesconto : prod.preco},00</span> à vista</p>

                                        <div className={styles.price_card}>
                                            {prod.precoDesconto ?
                                            prod.precoDesconto <= 100 &&
                                            <p>ou 1x de <span>R$ {prod.precoDesconto.toFixed(2)}</span> sem juros</p>  ||
                                            prod.precoDesconto > 100 &&
                                            <p>ou 2x de <span>R$ {prod.precoDesconto.toFixed(2)/2}</span> com juros</p>
                                            :
                                            <div>
                                                {prod.preco <= 100 &&
                                                <p>ou 1x de <span>R$ {prod.preco.toFixed(2)}</span> sem juros</p>  ||
                                                prod.preco > 100 &&
                                                <p>ou 2x de <span>R$ {prod.preco.toFixed(2)/2} </span> com juros</p>}
                                            </div>
                                            }
                                            
                                            <div className={styles.line}></div>
                                        </div>
                                        
                                        {prod.estoque == 0 ? 
                                        <div className={styles.cont_button}>
                                            <p>Produto em falta no momento <span><FaRegFrown/></span></p>
                                            <button className={`${styles.disabled} ${styles.btn_buy}`}
                                            disabled>Comprar</button>
                                        </div>
                                        :
                                        <div className={styles.cont_button}>
                                            <p className={styles.text_small}>no estoque: ({prod.estoque})</p>
                                            <button className={styles.btn_buy}
                                            onClick={()=> {Add(prod.id, prod)}}>Adicionar a sacola</button>
                                        </div>
                                    
                                        }
                                        <ToastContainer/>
                                        <div className={`accordion accordion-flush`} id="accordionFlushExample">
                                            <div className={`accordion-item`}>
                                                <h2 className="accordion-header" id="flush-headingOne">
                                                <button className={`${styles.cont_description} accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                    Descrição do produto
                                                </button>
                                                </h2>
                                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    <p>{prod.descrição}</p>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
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