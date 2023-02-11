import "./Box_Confirm.css"
import { FaTimes } from "react-icons/fa"

export default function Box_confirm (props) {
    
    function salva(namelist, list) {
        localStorage.setItem(namelist, JSON.stringify(list))
    }
   
    function remove() {

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
                    <div className="icon_close">
                        <p>{!props.id['nome'] ? <span>Deseja excluir tudo?</span>: <span> Deseja retirar? </span>}</p>
                        <span>
                        <FaTimes
                        type={props.type}
                        data-bs-dismiss={props.dismiss}
                        aria-label={props.arial_label}
                        className="icon"/>
                        </span>
                    </div>
                    <h4 className="name">{props.id['nome']}</h4>
                    <div className="cont_down">
                        <button className="confirm" onClick={() => remove()}>Excluir</button>
                        <button className="cancel"
                        type={props.type}
                        data-bs-dismiss={props.dismiss}
                        aria-label={props.arial_label}
                        >Cancelar</button>
                    </div>
                </div>
        </div>
        </>
    )
}