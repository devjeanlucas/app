import styles from "./Favoritos_list.module.css"


export default function Favoritos () {
    
    
    return (
        <div id="favorites">
            <div>
                <div className={styles.container_list}>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className={styles.container_text}>
                                <div className={styles.text}>
                                    <h2>Top</h2>
                                    <h1>Favoritos</h1>
                                    <p>confira</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-9">
                            <div className={styles.container_items}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}