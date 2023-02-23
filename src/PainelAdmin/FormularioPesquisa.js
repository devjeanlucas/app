import styles from "./FormularioPesquisa.module.css"
import {FaSearch} from "react-icons/fa"
import { useState } from "react"
import BoxPequisa from "./BoxPesquisa"

export default function FormPesquisa () {

    const [idpagamento, setIdpagamento] = useState()
    const [comprador, setComprador] = useState()
    const [status, setStatus] = useState()
    const [data, setData] = useState()
    const [state, setState] = useState(false)
    const [busca, setBusca] = useState([])


    const pesquisa = () => {
        setBusca({
            idpagamento,
            comprador,
            data
        })

        setState(true)
    }

    return (
        <>
        <form>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-sm-6">
                        <p>Id Pagamento:</p>
                        <input type="text" onChange={(el) => setIdpagamento(el.target.value)} value={idpagamento}/>
                    </div>
                    <div className="col-sm-6">
                        <div className={styles.cont_status}>
                            <p>status:</p>
                            <select>
                                <option>pendente</option>
                                <option>concluido</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <p>Comprador:</p>
                        <input type="text" onChange={(el)=> setComprador(el.target.value)} value={comprador}/>
                    </div>
                    <div className="col-sm-6">
                        <p>Data de Compra:</p>
                        <input type="date" onChange={(el)=> setData(el.target.value)} value={data}/>
                    </div>
                    <div className="col-12">
                        <div className={styles.button_cont}>
                            <button onClick={(event)=> {
                                event.preventDefault()
                                pesquisa()
                            }}>
                                <span className={styles.icon_search}>
                                <FaSearch />
                                </span>
                            <p>buscar</p></button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        {state && <BoxPequisa busca={busca}/>}
        </>
    )
}