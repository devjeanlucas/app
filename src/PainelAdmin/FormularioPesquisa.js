import styles from "./FormularioPesquisa.module.css"
import {FaFilter} from "react-icons/fa"
import BoxPequisa from "./BoxPesquisa"
import { collection,  getFirestore, getDocs, doc, updateDoc} from "@firebase/firestore";
import { useEffect, useState } from "react";
import '@firebase/firestore';
import App from '../components/Hooks/App';
import moment from "moment";


export default function FormPesquisa () {

    const [vendas, setVendas] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "testeusers")
    var listNomes = []
    var listEmail = []




    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setVendas((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
    
                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])


    vendas && vendas.map(item => listEmail.push(item.email))

    const [idpagamento, setIdpagamento] = useState("")
    const [status, setStatus] = useState("")
    const [data, setData] = useState("")
    const [state, setState] = useState(false)
    const [busca, setBusca] = useState([])
    

//filtrando nomes
    vendas && vendas.map(item => {
        listNomes.push(item.comprador)
        listNomes.splice(0,1)
        listNomes.push(item.comprador)
    })

    const filteredNome = listNomes.filter((item, index) => listNomes.indexOf(item) === index);


//filtrando emails
    vendas && vendas.map(item => {
        listEmail.push(item.email)
        listEmail.splice(0,1)
        listEmail.push(item.email)
    })

    
    const filteredEmail = listEmail.filter((item, index) => listEmail.indexOf(item) === index);


    const pesquisa = () => {
        const nome = document.querySelector("#comprador")
        const comprador = nome.value
        const setemail = document.querySelector('#email')
        const email = setemail.value

        setBusca({
            idpagamento,
            comprador,
            data,
            status,
            email
        })

        setState(true)
    }

    const vencidas =  vendas && vendas.filter(item => 
        moment(item.vencimento).format('DD-MM-YYYY') < moment().format('DD-MM-YYYY')
    )
    function mostraExpirados () {
        vencidas && vencidas.map(item => {
            if (item.status == "pending") {
                updateDoc(doc(db, "testeusers", item.id), {
                    status: "expirado" 
                })
            }
        })
    }
    mostraExpirados()



    //const listFilterAlter = []

    /*produtos && produtos.map(dado=> {

        itens &&itens.map(item => {
            if (item.id == dado.id) {
                listFilterAlter.push(item)
            }
        })
    })
    listFilterAlter && listFilterAlter.map(dado => {
        produtos && produtos.map(item => {
            if (item.iden == dado.id) {
                updateDoc(doc(db, "produtos", dado.id), {
                    estoque: item.estoque - dado.qtd
                })
            }
        })
    })*/





    



    return (
        <>
        <form>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-sm-6">
                        <p>Id Pagamento:</p>
                        <input type="text" onChange={(el) => setIdpagamento(el.target.value)}/>
                    </div>
                    <div className="col-sm-6">
                        <p>Email:</p>
                        <input type="text" list="emails" id="email"/>

                        <datalist id="emails">
                            {filteredEmail.map(nome => {
                                return (
                                    <option value={nome}></option>
                                )
                            })}
                        </datalist>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className={styles.cont_input_nome}>
                            <p>Comprador:</p>
                            <input type="text" list="nomes" id="comprador"/>
                            <datalist id="nomes">
                                {filteredNome.map(nome => {
                                    return (
                                        <option value={nome}></option>
                                    )
                                })}
                            </datalist>
                                
                            
                            
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div>
                            <div className="row">
                                <div className="col-6">
                                    <div className={styles.cont_status}>
                                        <p>status:</p>
                                        <select onChange={(el) => setStatus(el.target.value)}>
                                            <option >--</option>
                                            <option>pending</option>
                                            <option>concluido</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className={styles.cont_status}>
                                        <p>Data</p>
                                        <input type="date" onChange={(el)=> setData(el.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    

                    <div className="col-12">
                        <div className={styles.button_cont}>
                            <button onClick={(event)=> {
                                event.preventDefault()
                                pesquisa()
                            }}>
                                <span className={styles.icon_search}>
                                <FaFilter />
                                </span>
                            <p>Filtrar</p></button>
                        </div>
                    </div>
            </div>
        </form>
        {state && <BoxPequisa busca={busca}/>}
        </>
    )
}