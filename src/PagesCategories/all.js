import styles from "./all.module.css"
import { Link, useParams } from "react-router-dom"
import Loading from "../components/loading"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import BtnFavorite from "../components/ButtonFavorite"
    

import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import App from "../components/Hooks/App";
import { FaPenSquare } from "react-icons/fa";
import User from "../components/Hooks/User";



export default function All () {
    const [produtos, setProdutos] = useState([])
    const [loader, setLoader] = useState(false)
    const db = getFirestore(App)
    const UserCollection = collection(db, "produtos")
    const {categoria} = useParams()

  
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

    var sorteados = [];
    var valorMaximo = 1000;

    const [seed,setSeed] = useState()
    const reset = () => {
        var sugestao = Math.ceil(Math.random() * valorMaximo); 
        while (sorteados.indexOf(sugestao) >= 0) { 
            sugestao = Math.ceil(Math.random() * valorMaximo);
        }
        sorteados.push(sugestao); 
        setSeed(sugestao)
    }

    



    return (
        <>
        <div className={`row ${styles.container_list}`}>
                {produtos && produtos.map(prod => {
                        if (categoria == "todos") {
                            return (
                                <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                                    {User.length > 0 && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" &&<Link to={`/edit/${prod.id}`} className={styles.btn_edit}><FaPenSquare/></Link>}
                                    <div className={styles.contImagem}>
                                        <Link to={`/produtos/${prod.nome}`}><img src={prod.imagem}/></Link>
                                        {prod.estoque == 0 &&
                                        <div className={styles.poucasUnid}><p>Esgotado</p></div> ||
                                        prod.estoque < 10 &&
                                        <div className={styles.poucasUnid}><p>Poucas unidades</p></div>
                                        }
                            
                                    </div>
                                    <div className={styles.body}>
                                        <div className={styles.cont_name_item}>
                                            <h4>{prod.nome}</h4>
                                            <div onClick={reset}>
                                                <BtnFavorite prod={prod} id={prod.id} key={seed}/>
                                            </div>
                                        </div>
                                        <div className={styles.line}></div>
                                        {!prod.precoDesconto ?
                                        <div>
                                            <div className={styles.cont_price_item}>
                                                    <p>{"R$ "+ prod.preco.toFixed(2)}</p>
                                                    <p className={styles.avista}>à vista</p>
                                            </div>
                                            <div>
                                                <p className={styles.parcelamento}>ou até{
                                                prod.preco <= 100 && <span>1x</span> ||
                                                prod.preco >= 100 && <span>2x</span> || 
                                                prod.preco >= 300 && <span>3x</span> ||
                                                prod.preco >= 600 && <span>6x</span>
                                                }de
                                                {
                                                prod.preco <= 100 && <span>{"R$ "+prod.preco.toFixed(2)}</span> ||
                                                prod.preco >= 100 && <span>{"R$ "+prod.preco.toFixed(2)/2}</span> || 
                                                prod.preco >= 300 && <span>{"R$ "+prod.preco.toFixed(2)/3}</span> ||
                                                prod.preco >= 600 && <span>{"R$ "+prod.preco.toFixed(2)/6}</span>
                                                }com juros
                                                </p>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className={styles.price_desconto}>
                                                <p><strong>De: </strong><s>R$ {prod.preco.toFixed(2)}</s></p>
                                            </div>
                                            <div className={styles.cont_price_item}>
                                                <p><strong>Por: </strong>{"R$ "+ prod.precoDesconto.toFixed(2)}</p>
                                                <p className={styles.avista}>à vista</p>
                                            </div>
                                            <div>
                                                <p className={styles.parcelamento}>ou até{
                                                prod.precoDesconto <= 100 && <span>1x</span> ||
                                                prod.precoDesconto >= 100 && <span>2x</span> || 
                                                prod.precoDesconto >= 300 && <span>3x</span> ||
                                                prod.precoDesconto >= 600 && <span>6x</span>
                                                }de
                                                {
                                                prod.precoDesconto <= 100 && <span>{"R$ "+prod.precoDesconto.toFixed(2)}</span> ||
                                                prod.precoDesconto >= 100 && <span>{"R$ "+prod.precoDesconto.toFixed(2)/2}</span> || 
                                                prod.precoDesconto >= 300 && <span>{"R$ "+prod.precoDesconto.toFixed(2)/3}</span> ||
                                                prod.precoDesconto >= 600 && <span>{"R$ "+prod.precoDesconto.toFixed(2)/6}</span>
                                                }com juros
                                                </p>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            )
                        }
                        if (categoria == prod.categorie) {
                            return (
                                <div className="col-6 col-sm-4">
                                    {User.length > 0 && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" &&<Link to={`/edit/${prod.id}`} className={styles.btn_edit}><FaPenSquare/></Link>}
                                    <div className={styles.contImagem}>
                                        <Link to={`/produtos/${prod.nome}`}><img src={prod.imagem}/></Link>
                                        {prod.estoque == 0 &&
                                        <div className={styles.poucasUnid}><p>Esgotado</p></div> ||
                                        prod.estoque < 10 &&
                                        <div className={styles.poucasUnid}><p>Poucas unidades</p></div>
                                        }
                            
                                    </div>
                                    <div className={styles.body}>
                                        <div className={styles.cont_name_item}>
                                            <h4>{prod.nome}</h4>
                                            <div onClick={reset}>
                                                <BtnFavorite prod={prod} id={prod.id} key={seed}/>
                                            </div>
                                        </div>
                                        <div className={styles.line}></div>
                                        {!prod.precoDesconto ?
                                        <div className={styles.content_item}>
                                            <div className={styles.cont_price_item}>
                                                <p className={styles.price}>{"R$ "+ prod.preco.toFixed(2)}</p>
                                                <p className={styles.avista}>à vista</p>
                                            </div>
                                            <div>
                                                <p className={styles.parcelamento}>ou até{
                                                prod.preco <= 100 && <span>1x</span> ||
                                                prod.preco >= 100 && <span>2x</span> || 
                                                prod.preco >= 300 && <span>3x</span> ||
                                                prod.preco >= 600 && <span>6x</span>
                                                }de
                                                {
                                                prod.preco <= 100 && <span>{"R$ "+prod.preco.toFixed(2)}</span> ||
                                                prod.preco >= 100 && <span>{"R$ "+prod.preco.toFixed(2)/2}</span> || 
                                                prod.preco >= 300 && <span>{"R$ "+prod.preco.toFixed(2)/3}</span> ||
                                                prod.preco >= 600 && <span>{"R$ "+prod.preco.toFixed(2)/6}</span>
                                                }com juros
                                                </p>
                                            </div>

                                        </div>
                                        :
                                        <div className={styles.content_item}>
                                            <div className={styles.price_desconto}>
                                                <p><strong>De: </strong><s>R$ {prod.preco.toFixed(2)}</s></p>
                                            </div>

                                            <div className={styles.cont_price_item}>
                                                <p><strong>Por: </strong><span className={styles.price}>{"R$ "+ prod.precoDesconto.toFixed(2)}</span></p>
                                                <p className={styles.avista}>à vista</p>
                                            </div>
                                            <div>
                                                <p className={styles.parcelamento}>ou até{
                                                prod.precoDesconto <= 100 && <span>1x</span> ||
                                                prod.precoDesconto >= 100 && <span>2x</span> || 
                                                prod.precoDesconto >= 300 && <span>3x</span> ||
                                                prod.precoDesconto >= 600 && <span>6x</span>
                                                }de
                                                {
                                                prod.precoDesconto <= 100 && <span>{"R$ "+prod.precoDesconto.toFixed(2)}</span> ||
                                                prod.precoDesconto >= 100 && <span>{"R$ "+prod.precoDesconto.toFixed(2)/2}</span> || 
                                                prod.precoDesconto >= 300 && <span>{"R$ "+prod.precoDesconto.toFixed(2)/3}</span> ||
                                                prod.precoDesconto >= 600 && <span>{"R$ "+prod.precoDesconto.toFixed(2)/6}</span>
                                                }com juros
                                                </p>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            )
                        }
                })}

        </div>


        




        {!loader && 
        <div className={styles.cont_loader}>
            <Loading/>
        </div>
        }

        </>
    )
}