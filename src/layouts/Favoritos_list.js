import {Swiper,SwiperSlide  }from "swiper/react"
import styles from "./Favoritos_list.module.css"
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import App from "../components/Hooks/App";
import { Link } from "react-router-dom";

export default function Favoritos () {

    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "produtos")

    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };

                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])

    var reduced = [];

    produtos &&  produtos.forEach((item) => {
        var duplicated  = reduced.findIndex(redItem => {
            return item.categorie == redItem.categorie;
        }) > -1;

        if(!duplicated) {
            reduced.push(item);
        }
    });

    
    
    
    return (
        <div id="favorites">
            <div>
                <div className={styles.container_list}>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className={styles.container_text}>
                                <div className={styles.text}>
                                    <h2>Navegue <span className={styles.text_small}>por</span></h2>
                                    
                                    <h1>Categorias</h1>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-9">
                            <div className={styles.container_items}>
                            <Swiper
                            spaceBetween={30}
                            slidesPerView={3}
                            >
                                {reduced && reduced.map(item => {
                                    return (
                                        <SwiperSlide key={item.id}>
                                            <div className={styles.content_categorie}>
                                                <Link to={`/estoque/${item.categorie}`}>{item.categorie}</Link>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}