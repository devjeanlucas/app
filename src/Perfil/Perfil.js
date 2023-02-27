import User from "../components/Hooks/User"
import styles from "./Perfil.module.css"
import App from "../components/Hooks/App"
import {FaRegEnvelope} from "react-icons/fa"

export default function Perfil () {
    return (
        <>
            {User[0] ? 
            <div className={styles.container}>
                <div className={`row ${styles.header}`}>
                    <div className="col-sm-3">
                        <div className={styles.cont_img}><img src={User[0].avatar} className={styles.avatar}/></div>
                    </div>
                    <div className="col-sm-7">
                        <div className={styles.title_name}>
                            <div className={styles.title}>
                                <h1>{User[0].name}</h1>
                                <h3 className={styles.email}><span><FaRegEnvelope/></span>{User[0].email}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.body} row`}>
                    <div>
                        
                    </div>
                </div>

            </div>







            : <h1>Faça login para ver seu perfil</h1>}
            
        </>
    )
}