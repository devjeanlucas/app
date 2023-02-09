import styles from "./sectionExperience.module.css"
import cadeira from "../img/cadeira.png"
export default function Section () {
    return (
        <div>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-sm-5">
                        <div className={styles.box_left}>
                            <div className={styles.box_img}><img src={cadeira} alt="foto de cadeira"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className={styles.box_right}>
                            <h2>Experienced in making your home modern and comfortable</h2>
                            <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}