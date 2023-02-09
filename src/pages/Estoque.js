import ListCategories from "../layouts/ToggleListCategories"
import {  Outlet } from "react-router-dom"

export default function Estoque () {
    return (
        
        <>
            <h1>Nossos Produtos</h1>
            
            <div className="row">
                <div className="col-12 col-sm-1 col-md-3 col-lg-3">
                    <ListCategories/>
                </div>
                
            </div>
            
            
            
        </>
    )
}