import styles from "./Footer.module.css"
import {FaFacebook, FaInstagram, FaMapMarkerAlt, FaWhatsapp} from "react-icons/fa"

export default function Footer () {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-sm-3">
                        <div className={styles.text}>
                        <h1>JB Presentes</h1>
                        <p>Conheça mais um pouco sobre nós. Visite um de nossos perfis ou entre em contato conosco</p>
                        <div className={styles.redes}>
                            <a href="/" className={styles.icon}>
                                <FaFacebook/>
                            </a>
                            <a href="/" className={styles.icon}>
                                <FaInstagram />
                            </a>
                            <a href="/" className={styles.icon}><FaWhatsapp/></a>
                        </div>
                        </div>   
                    </div>
                    <div className="col-sm-8 offset-sm-1">
                        <div className={styles.contLists}>
                            <div className="row">
                                <div className="col-4">
                                    <ul>
                                        <h4>Novidades</h4>
                                        <li><a href="">Capas Retrateis</a></li>
                                        <li><a href="">Cortinas 6m</a></li>
                                        <li><a href="">Capas para cadeira</a></li>
                                    </ul>
                                </div>
                                <div className="col-4">
                                    <ul>
                                        <h4>Localização</h4>
                                        <li>Salvador-BA</li>
                                        <li><a href="">Rua Stª Bernadete nº 133 <FaMapMarkerAlt/></a></li>
                                    </ul>
                                </div>
                                <div className="col-4">
                                    <ul>
                                        <h4>Contatos</h4>
                                        <li><a href="">(71) 98668-2451</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}