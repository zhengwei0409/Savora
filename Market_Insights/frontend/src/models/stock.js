class Stock{
    constructor(name,symbol,price,openPrice,change,highestPrice,marketCap,logoURL){
        this.name=name
        this.symbol=symbol
        this.price=price.toFixed(2)
        this.openPrice=openPrice
        this.change=change.toFixed(2)
        this.highestPrice=highestPrice
        this.marketCap=marketCap
        this.logoURL=logoURL
    }

    updatePrice(newPrice){
        this.price=newPrice
        this.change=(((newPrice - this.openPrice) / this.openPrice) * 100).toFixed(2)
    }
}

export default Stock