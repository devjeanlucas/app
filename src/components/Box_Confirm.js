import styles from "./Box_Confirm.module.css"
import { FaTimes } from "react-icons/fa"
import Payament from "../Payment/Payment"
import { Link } from "react-router-dom"

export default function Box_confirm (props) {
    
    function salva(namelist, list) {
        localStorage.setItem(namelist, JSON.stringify(list))
    }
    


    function remove() {
        console.log(props.po)
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        if (!props.id['id']) {
            salva("itenscarrinho", [])
            window.location.reload()
            return
        }
        let index = produtosSalvos.findIndex(i => i.id === props.id['id'])
        produtosSalvos.splice(index, 1) 
        salva("itenscarrinho", produtosSalvos)
        window.location.reload()
    }
    
    
    return (
        <>
        <div className="allign">
            <div className="container">
                    <div className={styles.icon_close}>
                        <p>{props.title}</p>
                        <span>
                        <FaTimes
                        type={props.type}
                        data-bs-dismiss={props.dismiss}
                        aria-label={props.arial_label}
                        className="icon"/>
                        </span>
                    </div>
                    <h4 className={styles.name}>{props.id && props.id['nome']}</h4>
                        
                            {props.no == "continuar" ? 
                            <div className={styles.cont_down}>
                                <button className={styles.cancel} 
                                type={props.type}
                                data-bs-dismiss={props.dismiss}
                                aria-label={props.arial_label}>{props.yes}
                                </button>
                                <Link to="/payament">
                                    <button
                                    type={props.type}
                                    data-bs-dismiss={props.dismiss}
                                    aria-label={props.arial_label}
                                    className={styles.confirm}
                                    >{props.no}
                                    </button>
                                </Link>
                            </div>:
                            <div className={styles.cont_down}>
                            <button onClick={() => remove()} className={styles.cancel}>{props.yes}</button>
                            <button
                            type={props.type}
                            data-bs-dismiss={props.dismiss}
                            aria-label={props.arial_label}
                            className={styles.confirm}
                            >{props.no}</button>
                            </div>
                            }
                        
                    
                </div>
        </div>
        </>
    )
}