import styles from "./FormCheckOut.module.css"
import ItensCarrinho from "../components/ItensCarrinho";
import {FaCaretSquareLeft} from "react-icons/fa"
import { Outlet } from "react-router-dom";

export default function Form () {
    
    const retornar = () => {
        window.history.back()
    }

    return (
        <>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-sm-5">
                        <div className={styles.btn_return}>
                            <p onClick={retornar}><span><FaCaretSquareLeft/></span>Retornar</p>
                            <ItensCarrinho/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div>
                            <Outlet/>
                        </div>
                    <div>
                </div>
            </div>
                </div>
            </div>
        
        </>
    )
}