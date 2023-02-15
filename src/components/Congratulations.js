import {  useState, useEffect } from "react"
import { auth } from "../service/firebase"
import firebase from 'firebase/compat/app';
import '@firebase/firestore';
import { collection,  getFirestore, getDocs, setDoc, doc} from "@firebase/firestore";
import { useParams } from "react-router-dom";
import styles from "./Congratulations.module.css"
import Detalhedecompra from "./Detalhedecompra"

const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const app = firebase.initializeApp(firebaseConfig)


export default function Congratulation () {
    
    const {id} = useParams()

    const db = getFirestore(app)
    //pegando usuario comprador ##############################################
    const [user, setUser] = useState();
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                const {uid, displayName, photoURL, email} = user
                if (!displayName || !photoURL) {
                    throw new Error('Usuário sem Nome ou foto')
                }
                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName,
                    email
                })
            }
        })
    }, [])

    //pegando data e hora da compra #################################################
    function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), 
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
    }
    function time() {
        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        
        return h.toString() +":"+ m.toString()  + ":" + s.toString()
    }
    
    const data = dataAtualFormatada()
    const horario = time()





// adicionando usuario que esta comprando na tabela ########################################
    
    const getUsers = async () => {
        await setDoc(doc(db, 'testeusers', `${id}`), {
            iduser:user.id,
            comprador: user.name,
            email:user.email,
            data:data,
            horario:horario
            });
            itens && itens.map((item, index)=>{
            setDoc(doc(db, `testeusers/${id}/compra`, `${index}`), {
                id:item.id,
                foto:item.imagem,
                produto:item.nome,
                preço: item.preco,
                qtd: item.qtd
            });
        })
    };
        
    getUsers()
        
    


//pegando os itens na sacola do usuario comprador ############################################
    function pegaDados() {
        let produtosSalvos = new Array()
            if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
    return produtosSalvos
    }

    const itens = pegaDados()

    const reload = () => {
        window.location.reload()
    }




    return (
        <div className={`${styles.container}`}>
            <h1>Parabéns pela compra</h1>
            <Detalhedecompra />
        </div>
    )
}