import styles from "./MinhasCompras.module.css"
import { Outlet } from "react-router-dom";
import Box_person from "./Box_person";


export default function Minhascompras () {

    return (
        <>
        <div className={styles.container}>
            <div className="row">
                <div className="col-sm-4">
                    <div className={styles.person}>
                        <Box_person/>
                    </div>
                </div>
                <div className="col-sm-8">
                    <ul className={`row ${styles.cont_list}`}>
                        <Outlet/>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}