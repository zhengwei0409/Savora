const StockListDetails=({stock})=>{

    const formatNum=(num)=>{
        const units = ["", "K", "M", "B", "T"];
        let unitIndex = 0;
        num=num* 1e6

        while (num >= 1000 && unitIndex < units.length - 1) {
            num /= 1000;
            unitIndex++;
        }

        return num.toFixed(2) + units[unitIndex];
    }

    return(
        <div className="stocksListItem">
            <div className="stocksListInner">
                <img src={stock.logoURL} alt={stock.symbol} />
                <div>
                    <p><strong>{stock.symbol}</strong></p>
                    <p>{stock.name}</p>
                </div>
            </div>
            <div><p>${stock.price}</p></div>
            <div><p style={{color:stock.change>=0?'green':'red'}}>{stock.change>=0?'+':''}{stock.change}%</p></div>
            <div><p>${stock.highestPrice}</p></div>
            <div><p>${formatNum(stock.marketCap)}</p></div>
        </div>
    )
}
export default StockListDetails