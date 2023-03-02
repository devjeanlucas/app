import styles from "./all.module.css"
import { Link } from "react-router-dom"
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



export default function All (props) {
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
            <Swiper
            breakpoints={{
            320: {
                width: 320,
                slidesPerView: 1,
            },
            576: {
                width: 576,
                slidesPerView: 2,
            },
            966: {
                width: 966,
                slidesPerView: 3,
            },
            }}
            spaceBetween={40}
            
            >
                {produtos && produtos.map(prod => {
                    if (props.categoria) {
                        if (props.categoria == prod.categorie) {
                            return (
                                <SwiperSlide key={prod.id}>

                                        {User.length > 0 && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" &&<Link to={`/edit/${prod.id}`} className={styles.btn_edit}><FaPenSquare/></Link>}

                                        <div className={styles.contImagem}>
                                            <Link to={`/produtos/${prod.iden}`}><img src={prod.imagem}/></Link>
                                        </div>

                                        <div className={styles.body}>
                                            <div className={styles.cont_name_item}>
                                                <h4>{prod.nome}</h4>
                                                <div onClick={reset}>
                                                    <BtnFavorite prod={prod} id={prod.id} key={seed}/>
                                                </div>
                                            </div>
                                            <div className={styles.line}></div>
                                            <div className={styles.cont_price_item}>
                                                <p>{"R$ "+ prod.preco+",00" }</p>
                                                <p className={styles.avista}>à vista</p>
                                            </div>
                                        </div>
                                </SwiperSlide>
                            )
                        }
                    }
                })}

            </Swiper>
        </div>


        




        {!loader && 
        <div className={styles.cont_loader}>
            <Loading/>
        </div>
        }

        </>
    )
}