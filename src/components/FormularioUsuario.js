import styles from "./FormularioUsuario.module.css"
import {  useState,  } from "react"
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import User from "../components/Hooks/User"


export default function Form () {
    
    const [nome,setNome] =useState()
    const [email,setEmail] = useState()
    const [phone, setPhone] = useState()
    const [rua,setRua] = useState()
    const [bairro, setBairro] = useState()
    const [cidade,setCidade]= useState()
    const [n_casa, setN_casa] = useState()
    const [pontRef, setPontRef] =useState()
    const [cep, setCep] = useState()


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


    function pegaDados() {
    let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
        produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
    }
    return produtosSalvos
    }
    var total = pegaPreco()
    var itens = pegaDados()
    var qtdItens = itens.length

    const [active, setActive] = useState(false)


    const notify = () => {
        toast.error('Preencha todos os campos do formulário')
    }
    
    

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.content_title}>
                        <h3>Vamos finalizar os detalhes</h3>
                    </div>
                </div>
                <div className={styles.body}>
                    <form>
                        <div className={styles.item}>
                            <label>Nome Completo *</label><br/>
                            <input type="text" required onChange={(el) => setNome(el.target.value)}/>
                        </div>
                        <div className={styles.item}>
                            <label>Email *</label><br/>
                            <input type="text" required onChange={(el) => setEmail(el.target.value)}/>
                        </div>
                        <div className={styles.item}>
                            <label>Telefone *</label><br/>
                            <input type="number" required onChange={(el) => setPhone(el.target.value)}/>
                        </div>
                        <div className={styles.item}>
                            <label>Endereço</label><br/>
                            <div className="row">
                                <div className="col-6">
                                    <label>Nome da rua *</label>
                                    <input type="text" required onChange={(el) => setRua(el.target.value)}/>
                                    <label>Bairro *</label>
                                    <input type="text" required onChange={(el) => setBairro(el.target.value)}/>
                                    <label>Cidade *</label>
                                    <input type="text" required onChange={(el) => setCidade(el.target.value)}/>
                                </div>
                                <div className="col-6">
                                    <label>Nº da casa *</label>
                                    <input type="number" required onChange={(el) => setN_casa(el.target.value)}/>
                                    <label>Ponto de referência</label>
                                    <input type="text" onChange={(el) => setPontRef(el.target.value)}/>
                                    <label>CEP *</label>
                                    <input type="text" required onChange={(el) => setCep(el.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            {active && 
                            <div>
                                <ul className={styles.list_itens}>
                                    {itens && itens.map(item => {
                                        return (
                                            <li className="row">
                                                <div className="col-1 ">
                                                    <p>{item.qtd}x</p>
                                                </div>
                                                <div className="col-9 col-sm-8 col-md-9">
                                                    <p>{item.nome}</p>
                                                </div>
                                                <div className="col-1">
                                                    <p>R${item.preco.toFixed(2)}</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div className={styles.cont_total}>
                                    <p>Total R$ {total.toFixed(2)}</p>
                                </div>
                                <div>
                                    <button
                                    onClick={()=> setActive(!active)}
                                    className={styles.close}
                                    >fechar</button>
                                </div>
                            </div>
                            }
                        </div>
                        <div className={styles.navigation}>
                            {User.length > 0 && qtdItens &&   
                            nome &&
                            email && 
                            phone && 
                            n_casa &&
                            rua && 
                            bairro &&
                            cep &&
                            cidade ?
                            <div>
                                {!active ? 
                                <div className={styles.cont_buttons}>
                                    <Link to="/carrinho"><button>retornar</button></Link>
                                        <button className={`
                                        ${styles.avançar} ${styles.active}`} 
                                        onClick={(el) => {
                                            el.preventDefault()
                                            setActive(!active)
                                        }}
                                        >confirmar itens</button>
                                </div>:
                                <div className={styles.cont_buttons}>
                                    <Link to="/carrinho"><button>retornar</button></Link>

                                    <Link to="/Payament">
                                        <button className={`
                                        ${styles.avançar} ${styles.active}`}
                                        >avançar</button>
                                    </Link>
                                </div>
                                }
                            </div> :
                            <div className={styles.cont_buttons}>
                                <Link to="/carrinho"><button>retornar</button></Link>
                                    <button className={`
                                    ${styles.avançar} ${styles.await}`}
                                    onClick={(el)=> {
                                        el.preventDefault()
                                        notify()
                                    }}
                                    >confirmar itens</button>
                            </div>
                            }
                            
                            
                        </div>

                    </form>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}