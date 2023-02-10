import foto from "../img/sofa.png"
import styles from "./SectionMainHome.module.css"
import { Link } from "react-router-dom"

export default function Main () {
    return(
        <div className={`row ${styles.container}`}>
                <div className={`col-md-6 order-2 order-md-1 ${styles.text}`}>
                    <h1>Style up with us Refresh your space</h1>
                    <h4>Art will make life more colorful. Color your day with furniture from experienced and trusted designers</h4>
                    <Link to="/estoque/todos"><button className={styles.btn_est}>Explore Rooms</button></Link>
                </div>
                <div className={`col-md-6 order-1 order-md-2`}>
                    <div className={styles.box}>
                
                        <img src={foto} alt="Foto de Familia"
                        className={styles.photo}/>
                    </div>
                </div>
            </div>
    )
}