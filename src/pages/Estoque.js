import ListCategories from "../layouts/ToggleListCategories"
import All from "../PagesCategories/all"
import Btn_Sacola from "../components/Btn_Sacola";

export default function Estoque () {
    return (
        
        <>
            <h1>Nossos Produtos</h1>
            
            <div className="row">
                <div className="col-12 col-sm-12 col-md-3 col-lg-2">
                    <ListCategories/>
                </div>
                <div className="col-sm-12 col-md-9 col-lg-10">
                    <All/>
                </div>
                
            </div>
            <Btn_Sacola/>
        </>
    )
}