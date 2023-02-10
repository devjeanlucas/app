import "./Box_Confirm.css"
import { FaTimes } from "react-icons/fa"

export default function Box_confirm (props) {
    
    function pegaExcluido() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty("idExcluido")) {
            produtosSalvos = JSON.parse(localStorage.getItem("idExcluido"))
        }

        return produtosSalvos
    }


    function salva(namelist, list) {
        localStorage.setItem(namelist, JSON.stringify(list))
    }
   
    function remove() {
        const item = pegaExcluido()
        const id = item[0]
        const vazio = []
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            produtosSalvos = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        let index = produtosSalvos.findIndex(i => i.id == id)
        produtosSalvos.splice(index, 1) 
        salva("itenscarrinho", produtosSalvos)
        if (item.length > 1) {
            salva("idExcluido", vazio)
        }
        salva("idExcluido", vazio)
        window.location.reload()
    }

    function limpaLista() {
        const item = pegaExcluido()
        const vazio = []
        if (item.length > 1) {
            salva("idExcluido", vazio)
        }
        salva("idExcluido", vazio)
    }

    return (
        <>
        <div className="container">
                <div className="icon_close">
                    <h4><FaTimes
                    type={props.type}
                    data-bs-dismiss={props.dismiss}
                    aria-label={props.arial_label}
                    onClick={() => limpaLista()}/>
                    </h4>
                </div>
                <h3>Tem Certeza que deseja excluir este item?</h3>
                <div className="cont_down">
                    <button className="confirm" onClick={() => remove()}>Excluir</button>
                    <button className="cancel"
                    type={props.type}
                    data-bs-dismiss={props.dismiss}
                    aria-label={props.arial_label}
                    onClick={() => limpaLista()}
                    >Cancelar</button>
                </div>
            </div>
        </>
    )
}