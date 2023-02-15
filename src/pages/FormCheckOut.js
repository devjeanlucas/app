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
                <p onClick={retornar}><span><FaCaretSquareLeft/></span>Retornar</p>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-5">
                        <div className={styles.btn_return}>
                            <div className={styles.cont_sacola}>
                                <ItensCarrinho/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6">
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