import User from "../components/Hooks/User";
import App from "../components/Hooks/App";
import { useEffect, useState} from "react";
import {FaSistrix} from "react-icons/fa"
import { collection,  getFirestore, getDocs, setDoc, doc, deleteDoc} from "@firebase/firestore";
import styles from "../PagesCategories/stylesBox.module.css"
import { Link } from "react-router-dom";
import ButtonFavorite from "../components/ButtonFavorite";
import CarrinhoVazio from "../components/CarrinhoVazio"


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


    console.log(FavoritosUSer)

    return (
        <>
            <ul className={`row ${styles.container_list}`}>
                {FavoritosUSer.length >= 1 ? FavoritosUSer.map(prod => {
                    return (
                        <>
                            <li className="col-6 col-sm-6 col-md-6 col-lg-4" key={prod.id} id={prod.id}>
                        
                                <div className={styles.box} >
                                    <Link to={`/produtos/${prod.idproduto}`}>
                                        <div className={styles.contImagem}>
                                            <img src={prod.foto} className={styles.imagem}/>
                                        </div>
                                    </Link>

                                    <div className={styles.box_info}>
                                            <div className={styles.info}>

                                                <div className={styles.info_item}>

                                                    <div className={styles.cont_name_item}>
                                                        <h4>{prod.produto}</h4>
                                                        <div onClick={reset}>
                                                            <ButtonFavorite prod={prod} id={prod.id} key={seed}/>
                                                        </div>
                                                    </div>

                                                    <div className={styles.line}></div>
                                                    <div className={styles.cont_price_item}>
                                                        <p>R${prod.preço},00 <span className={styles.avista}>à vista</span></p>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </>
                    )
                }): <CarrinhoVazio text="Ainda não tem nenhum favorito"/>}
            </ul>
        </>
    )
}