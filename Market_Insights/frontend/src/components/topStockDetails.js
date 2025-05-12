import btclogo from '../images/bitcoin-btc-logo.png'

const TopStockDetails=({stock})=>{

    return(
        <div className="topContainer">
            <img src={stock.name==='Bitcoin'?btclogo:stock.logoURL} alt={stock.name} />
            <div className="topContainerInner">
                <div className="topInnerName">
                    <h3>{stock.symbol}</h3>
                    <p>${stock.price}</p>
                </div>
                <p style={{color:stock.change>=0?'green':'red'}}>{stock.change>=0?'+':''}{stock.change}%</p>
            </div>
        </div>
    )

}
export default TopStockDetails