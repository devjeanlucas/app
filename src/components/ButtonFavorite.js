import User from "./Hooks/User";
import App from "./Hooks/App";
import { useEffect, useState} from "react";
import {FaRegHeart, FaHeart} from "react-icons/fa"
import { collection,  getFirestore, getDocs, setDoc, doc, deleteDoc} from "@firebase/firestore";
import styles from "./ButtonFavorite.module.css"


export default function ButtonFavorite(props) {


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



    const add = (item) => {

        var listIDs = []
        if (Favorites) {
            Favorites.map(item => listIDs.push(parseInt(item.id)))
        }
        var max = listIDs.reduce(function(a, b) {
            return Math.max(a, b);
        }, -Infinity);

        var idVez = max+1

        setDoc(doc(db, 'favoritos', `${idVez}`), {
            iduser:User[0].id,
            nome: User[0].name,
            email:User[0].email,
            idproduto:item.id,
            foto:item.imagem,
            produto:item.nome,
            preço: parseInt(item.preco),
            });
            
    }
    const remove = (item) => {
        let index = FavoritosUSer.findIndex(val => val.idproduto == item);
        var id = index+2
        console.log(id)
        const Doc = doc(db, 'favoritos', `${id}`);
        deleteDoc(Doc)
    }

    let index = FavoritosUSer.findIndex(val => val.idproduto == props.id);
    
    return (
        <>
            {index < 0 ? <FaRegHeart onClick={()=> {add(props.prod)}}/> : <FaHeart onClick={() => {remove(props.id)}} className={styles.positive}/>}
            

        </>
    )
}