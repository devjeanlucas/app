import styles from "./DetailsCompras.module.css"
import App from '../components/Hooks/App';
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import { useEffect, useState } from "react";
import '@firebase/firestore';
import User from "../components/Hooks/User"
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Box_confirm from "../components/Box_Confirm";
import { FaPenSquare } from "react-icons/fa";

export default function DetalhesCompra() {


    const {id} = useParams()
    const [compra, setCompra] = useState([])
    const db = getFirestore(App)
    const UserSubCollection = collection(db, `testeusers/${id}/compra`)
    const UserCollection = collection(db, "testeusers")
    const [comprador, setComprador] = useState([])
    
    
    useEffect (()=>{
        try{
            const getUsers = async () => {
                
                    const datasub = await getDocs(UserSubCollection);
                    setCompra((datasub.docs.map((doc) => ({...doc.data(), id: doc.id}))))

                    const data = await getDocs(UserCollection);
                    setComprador((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                
                };
    
                getUsers()
        } catch (error) {
            <button> tentar novamente </button>
        }
    },[])
    const[ação, setAção] = useState({})

    return (
        <>
        {User.length > 0  && User[0].id == "GNsCbjSqjmU7H7oMzK5UKHcDxV13" && comprador &&
            comprador.map(dados => {
                if (dados.id == id) {
                    return (
                        <div className={styles.container}>
                            <h3>Detalhes da Compra</h3>
                            <div className={styles.line}></div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p>Comprador: <strong>{dados.comprador}</strong></p>
                                    <p>Email: <strong>{dados.email}</strong></p>
                                    <p>Id.Pagamento: <strong>{dados.idPagamento}</strong></p>
                                    <p>status Pag.: <strong>{dados.status}</strong></p>
                                </div>  
                                <div className="col-sm-6">
                                    <p>Data da compra: <strong>{dados.data}</strong></p>
                                    <p>Horario: <strong>{dados.horario}</strong></p>
                                    <p>Data de Venc.: <strong>{moment(dados.vencimento).format('DD/MM/YYYY')}</strong></p>
                                </div>
                            </div>
                            <div className={styles.line}></div>
                            <h4>Produtos da compra</h4>
                            <div>
                                <ul className={styles.cont_detalhe_compra}>
                                    {compra && compra.map(item=> {
                                        return (
                                            <>
                                                <li key={item.id}>
                                                    <div className={`${styles.item} row`}>
                                                        <div className={`col-1 ${styles.no_padding}`}>
                                                            <Link to={`/edit/${item.idproduto}`}><FaPenSquare/></Link>
                                                        </div>
                                                        <div className="col-1">
                                                            <p>{item.qtd}x</p>
                                                        </div>
                                                        <div className="col-7">
                                                            <p>{item.produto}</p>
                                                        </div>
                                                        <div className={`col-3 ${styles.no_padding}`}>
                                                            <div className={styles.item}>
                                                                <p>R$</p>
                                                                <p>{item.preço.toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>


                            <div className={styles.cont_price}>
                                <div className={styles.price}>
                                    <p>Total: </p>
                                    <p className={styles.total}><strong>R$ {dados.total.toFixed(2)}</strong></p>
                                </div>
                            </div>
                            <div className={styles.line}></div>
                            <div className={`${dados.status == "pending" && styles.bg_pending ||
                            dados.status == "concluido" && styles.bg_success ||
                            dados.status == 'expirado' && styles.bg_expired
                            } 
                            ${styles.cont_status}`}>
                                <p>status: {dados.status}</p>
                            </div>


            <div className={styles.cont_buttons}>
                        {dados.status == "pending" &&
                                <button type="button" 
                                data-bs-toggle="modal" 
                                data-bs-target="#confirmPag"
                                onClick={()=> setAção({
                                    title:"Confirmar Pagamento?",
                                    ação: "Mudar status pagamento",
                                    yes:"confirmar",
                                    no:"cancelar",
                                })}
                                >Pago</button>
                        } 
                        {dados.status == "concluido" && 
                                <button disabled>Pago</button>
                        } 
                       {dados.status == "expirado" && 
                            <button type="button" 
                            data-bs-toggle="modal" 
                            data-bs-target="#confirmPag"
                            onClick={()=> setAção({
                                title:"Quer realmente apagar a venda?",
                                ação: "Apagar Compra Expirada",
                                no:"confirmar",
                                yes:"cancelar",
                                item:dados
                            })}
                            >Apagar</button>
                        }
                <Link to="/vendas/clientes"><button>retornar</button></Link>

            </div>
            </div>
                    )
                }
            })
        }
        <div className="modal fade" id="confirmPag" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <Box_confirm type="button"
                        dismiss="modal"
                        aria_label="Close"
                        yes={ação.yes}
                        no={ação.no}
                        title={ação.title}
                        ação={ação.ação}
                        item={ação.item}
                        />
                    </div>
                </div>
            </div>
            

            
        </>
    )
}