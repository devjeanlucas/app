import "./totalBox.css"
export default function Total () {
    function pegaPreco() {
        let listGeral = []
        if (localStorage.hasOwnProperty("itenscarrinho")) {
            listGeral = JSON.parse(localStorage.getItem("itenscarrinho"))
        }
        if (listGeral.length === 0) {
            return 0
        } else {
            let listPrecos = []
            let list = []
            listGeral.map(item => {return listPrecos.push({qtd: item.qtd, preco: item.preco})})
            listPrecos.map(item => {return list.push(item.qtd * item.preco)})
            var soma = list.reduce((soma, i) => {return soma + i})

            return soma
        }
    }
    function Parcelar () {
        let total = pegaPreco()
        let list = []
        var parcela = 0
        var count = 0
        
        if (total < 100) {
            count+=1
            parcela+=total
            list.push(parcela.toFixed(2), count)
        } else if (total >= 800) {
            count+=6
            parcela = parcela + total / count
            list.push(parcela.toFixed(2), count) 
        }
        else if (total >= 400) {
            count+=3
            parcela = parcela + total / count
            list.push(parcela.toFixed(2), count) 
        }
        else if (total >= 100) {
            count+=2
            parcela = parcela + total / count
            list.push(parcela.toFixed(2), count)
        }

        return list
    }

    let listPreco = Parcelar()
    let total = pegaPreco()
    
    return (
        <div className="cont">
            <div className="price">
                <h4>Total: </h4>
                <p>R$ {total.toFixed(2)}</p>
            </div>
            <div>
                <p>Em até {listPreco[1]}x de R$ {listPreco[0]}</p>
            </div>
        </div>
    )
}