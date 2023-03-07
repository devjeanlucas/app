import { SwiperSlide, Swiper } from "swiper/react"
import BtnAddItem from "../PainelAdmin/BtnAddItem"
import All from "./all"
import styles from "./ContCategorie.module.css"
import { useEffect, useState } from "react";
import '@firebase/firestore';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import App from "../components/Hooks/App";
import { Link } from "react-router-dom";



export default function ContCategorie () {
    
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
        } catch (e) {
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
        <>
        <BtnAddItem/>
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.BoxNavigation}>
                    <nav id="navbar-example3">
                        <nav className={`nav-pills ${styles.list_categories}`}>
                        <Swiper
                        breakpoints={{
                        320: {
                            width: 320,
                            slidesPerView: 2,
                        },
                        576: {
                            width: 576,
                            slidesPerView: 3,
                        },
                        966: {
                            width: 966,
                            slidesPerView: 3,
                        },
                        }}
                        spaceBetween={40}
                        className={styles.nav}
                        >
                            {reduced && reduced.map(item => {
                                return (
                                    <SwiperSlide key={item.id}><Link className={`${styles.cate} nav-link`} to={`/estoque/${item.categorie}`}>{item.categorie}</Link></SwiperSlide>
                                )
                            })}
                        </Swiper>
                        </nav>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabindex="0">
                        <div className={styles.cont_produtos}>
                            <All/>
                        </div>

                    </div>
            
            
                </div>
            </div>
        </div>
        </>
    )
}