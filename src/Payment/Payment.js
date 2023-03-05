import axios from "axios"
import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css"
import {firebase, auth} from "../service/firebase"
import { collection,  getFirestore, getDocs, setDoc, doc, updateDoc} from "@firebase/firestore";
import Loading from "../components/loading"
import moment from "moment";
import App from "../components/Hooks/App";

const api = axios.create({
    baseURL: "https://api.mercadopago.com"
  });

    api.interceptors.request.use(async config => {
    const token = "APP_USR-3329996845037223-021518-afe97d05b0ab1051be0318915df691d4-1196799498"
    config.headers.Authorization = `Bearer ${token}`
  
    return config
  });



export default function Payament () {

    const db = getFirestore(App)
    const [produtos, setProdutos] = useState([])


    const [responsePayment, setResponsePayment] = useState(false)
    const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState(false)
    const [user, setUser] = useState();
    const [Ids, SetIds] = useState([])
    const [loader, setLoader] = useState(false)
    const produtosCollection = collection(db, 'produtos')
    const UsuarioCollection = collection(db, "testeusers");
    const SaldoCollection = collection(db, "SaldoAdmin")
    const [saldo, SetSaldo] = useState([])

    useEffect(()=> {
        const body = {
            "transaction_amount": total,
            "description": "Total da Compra",
            "payment_method_id": "pix",
            "payer": {
                "email": "jean@gmail.com",
                "first_name": "Jean",
                "last_name": "JS python html",
                "identification": {
                "type": "CPF",
                "number": "01234567890"
                }
            },
            "notification_url": "https://eonfip22ysdmywq.m.pipedream.net"
            }
        
        
        const pay = async()=> {
            await api.post("v1/payments", body).then(response => {

            setResponsePayment(response)

            setLinkBuyMercadoPago(response.data.point_of_interaction.transaction_data.ticket_url)

            }).catch(err => {
                alert(err)
            })
            const data = await getDocs(UsuarioCollection);
            SetIds((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))

            const saldo = await getDocs(SaldoCollection)
            SetSaldo((saldo.docs.map((doc) => ({...doc.data(), id: doc.id}))))

            const produto = await getDocs(produtosCollection)
            setProdutos((produto.docs.map((doc) => ({...doc.data(), id: doc.id}))))

            PegaUser()
        }
        const PegaUser =async() => {
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
                    setLoader(true)
                }
            })
        }
        pay()
    },[])



function pegaDados() {
    let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
        produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
    }
return produtosSalvos
}
function pegaPreco() {
    let listGeral = []
    if (localStorage.hasOwnProperty("itenscarrinho")) {
        listGeral = JSON.parse(localStorage.getItem("itenscarrinho"))
    }
    if (listGeral.length === 0) {
        return 0
    } else {
        let listPrecos = []
        let list = []
        listGeral.map(item => {return listPrecos.push({qtd: item.qtd, preco: item.preco})})
        listPrecos.map(item => {return list.push(item.qtd * item.preco)})
        var soma = list.reduce((soma, i) => {return soma + i})
        
        return soma
    }
}
function salva(namelist, list) {
    localStorage.setItem(namelist, JSON.stringify(list))
}

var listIDs = []
if (Ids) {
    Ids.map(item => listIDs.push(parseInt(item.id)))
}
var max = listIDs.reduce(function(a, b) {
    return Math.max(a, b);
}, -Infinity);


const idVez = max+1
let total = pegaPreco()
const dataAtual = moment().format('DD/MM/YYYY')
const horario = moment().format('hh:mm:ss')
const itens = pegaDados()
const qr_code = responsePayment && responsePayment.data.point_of_interaction.transaction_data.qr_code;
const status = responsePayment && responsePayment.data.status;
const idPagamento = responsePayment && responsePayment.data.id;
const vencimento = responsePayment && responsePayment.data.date_of_expiration
const ft1 = itens && itens.map(item => {return item.imagem})
const ft2 = itens && itens.map(item => {return item.imagem})
const foto1 = ft1[0]
const foto2 = ft2[1]


const getUsers = async () => {
    
    await setDoc(doc(db, 'testeusers', `${idVez}`), {
        iduser:user.id,
        comprador: user.name,
        email:user.email,
        data:dataAtual,
        horario:horario,
        status,
        idPagamento,
        qr_code,
        vencimento,
        total,
        foto1,
        foto2: !foto2 ? "": foto2
        });


        itens && itens.map((item, index)=>{
        setDoc(doc(db, `testeusers/${idVez}/compra`, `${index}`), {
            idproduto:parseInt(item.id),
            foto:item.imagem,
            produto:item.nome,
            preço: parseInt(item.preco),
            qtd: item.qtd
        });

        

    })
    salva("itenscarrinho", [])
    
};


if (total && idVez && qr_code && vencimento && idPagamento && status && itens) {
    getUsers()  
}

    
    return (
    <>
    <div className={styles.container}>
        {
            
            linkBuyMercadoPago &&
            <>
                <div className={styles.content}>
                    <a href={`/Home/MinhasCompras/todas`}><button className={styles.button}>Ver Minhas Compras</button></a>
                    <iframe src={linkBuyMercadoPago} width="100%" height="100%" title="link_buy"  className={styles.iframe}/>
                </div>
                
                
            </>
            
        }
    </div>
    {!loader && 
            <div className={styles.cont_loader}>
                <Loading/>
            </div>
            }
    </>
    )
}