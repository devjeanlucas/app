import styles from "./secondSection.module.css"
import {FaSearch, FaLink} from "react-icons/fa"

export default function secondSection () {
    return (
        <div>
            <div className={`row ${styles.container}`}>
                <div className={`col-md-7`}>
                    <div className={styles.box_left}>
                        <div className={styles.container_left}>
                            <div className="row">
                                <div className={`col-lg-8 ${styles.no_padding}`}>
                                    <div className={styles.box_img_left}>
                                        < img src="https://img.freepik.com/fotos-gratis/almofada-confortavel-branca-no-interior-da-decoracao-de-cama_74190-9524.jpg?w=740&t=st=1675009039~exp=1675009639~hmac=b95ae02ac3257e573800fe3c754218d176ffccdc57f1013839cc8e0abf96efce" className={styles.photo_left}/>
                                        </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className={styles.box_text_left}>
                                        <div className={styles.text_left}>
                                            <h4>Clean</h4>
                                            <p>Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</p>
                                            <button className={styles.btn_view}>Visitar <FaLink/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                


                <div className={`col-md-4`}>
                    <div className={styles.box_right}>
                        <div className="row">
                            <div className="col-6 col-sm-6 col-md-12">
                                <div className={styles.box}>
                                    <img src="https://img.freepik.com/psd-gratuitas/mobilia-moderna-da-sala-de-banho_176382-990.jpg?w=740&t=st=1675010134~exp=1675010734~hmac=a868c42bdfe1c1f17e0db9739ac646c559932497ea5577d3ee6427c6e7fe9f3e"/>
                                    <FaSearch className={styles.icon}/>
                                </div>
                            </div>
                            <div className="col-6 col-sm-6 col-md-12">
                                <div className={styles.box}>
                                    <img src="https://img.freepik.com/psd-gratuitas/toalha-de-mesa-e-guardanapos_176382-1692.jpg?w=740&t=st=1675012971~exp=1675013571~hmac=6f8dde4221f162ed83d60e15f2777c48dcf2244d2fa6e5d7f3d265e3685fd011"/>
                                    <FaSearch className={styles.icon}/>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className={`col-sm-1`}>
                    
                    <div className={styles.contball}>
                        <div className={styles.balls}>
                            <div className={styles.ball}></div>
                            <div className={styles.ball}></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        )
    }