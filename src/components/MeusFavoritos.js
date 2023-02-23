import User from "./Hooks/User";
import App from "./Hooks/App";
import { useEffect, useState} from "react";
import {FaRegHeart, FaHeart, FaSistrix} from "react-icons/fa"
import { collection,  getFirestore, getDocs, setDoc, doc, deleteDoc} from "@firebase/firestore";
import styles from "./MeusFavoritos.module.css"
import { Link } from "react-router-dom";
import ButtonFavorite from "./ButtonFavorite";

export default function MeusFavoritos () {

    const db = getFirestore(App)

    const [Favorites, SetFavorites] = useState([])

    const FavoriteCollection = collection(db, "favoritos");
    const FavoritosUSer = []

    useEffect(()=> {
        const getFavorites = async()=> {
            const dataSub = await getDocs(FavoriteCollection);
            SetFavorites((dataSub.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        }
        getFavorites()
    }
    ,[])

    if (Favorites) {
        {Favorites && Favorites.map(fav=> {
            if (fav.iduser == User[0].id) {
                FavoritosUSer.push(fav)
            }
        })}
    }
    const [seed, setSeed] = useState(1);
    const reset = () => {
        setSeed(Math.random());
    }

    return (
        <>
            <ul className={`row ${styles.list}`}>
                {FavoritosUSer.length > 1 && FavoritosUSer.map(item => {
                    return (
                        <>
                            <li key={item.id} className="col-6">
                                <div className={styles.container}>
                                    <div>
                                        <img src={item.foto}></img>
                                    </div>
                                    <div className={styles.cont_info}>
                                        <div>
                                            <p className={styles.capitalize}>{item.produto}</p>
                                            <p>R${item.preço.toFixed(2)}</p>
                                        </div>
                                        <div className={styles.cont_button}>
                                            <div onClick={reset} className={styles.cont_button_favorite}>
                                                <ButtonFavorite id={item.idproduto} prod={item} key={seed}/>
                                            </div>
                                            <Link to={`/produtos/${item.idproduto}`}><button>Conferir <FaSistrix/></button></Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </>
                    )
                })}
            </ul>
        </>
    )
}