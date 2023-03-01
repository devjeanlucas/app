import { SwiperSlide, Swiper } from "swiper/react"
import BtnAddItem from "../PainelAdmin/BtnAddItem"
import All from "./all"
import styles from "./ContCategorie.module.css"


export default function ContCategorie () {
    
    

    return (
        <>
        <BtnAddItem/>
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.BoxNavigation}>
                    <nav id="navbar-example3">
                        <nav className={`nav-pills ${styles.list_categories}`}>
                        <Swiper
                        breakpoints={{
                        320: {
                            width: 320,
                            slidesPerView: 2,
                        },
                        576: {
                            width: 576,
                            slidesPerView: 5,
                        },
                        966: {
                            width: 966,
                            slidesPerView: 7,
                        },
                        }}
                        spaceBetween={40}
                        >
                            <SwiperSlide><a className="nav-link" href="#tapetes">Tapetes</a></SwiperSlide>
                            <SwiperSlide><a className="nav-link" href="#vasos">Vasos</a></SwiperSlide>
                            <SwiperSlide><a className="nav-link" href="#cortinas">Cortinas</a></SwiperSlide>
                            <SwiperSlide><a className="nav-link" href="#edredons">Edredons</a></SwiperSlide>
                        </Swiper>
                        </nav>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabindex="0">
                        <div className={styles.cont_produtos}>
                            <div id="tapetes">
                                <h4>Tapetes</h4>
                                <All categoria="Tapetes"/>
                            </div>
                            <div id="vasos">
                                <h4>Vasos</h4>
                                <All categoria="Vasos"/>
                            </div>
                            <div id="cortinas">
                                <h4>Cortinas</h4>
                                <All categoria="Cortinas"/>
                            </div>
                            <div id="edredons">
                                <h4>Edredons</h4>
                                <All categoria="Edredons"/>
                            </div>
                        </div>

                    </div>
            
            
                </div>
            </div>
        </div>
        </>
    )
}