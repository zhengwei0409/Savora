import { useState ,useEffect} from "react"
import Stock from "../models/stock";
import StockListDetails from "./StocksListDetails";

const StockList=()=>{
    const symbols=['NVDA','AAPL','AMD','META','AMZN','DIS','INTC','IBM','HPQ','GOOG']
    const [stocks,setStocks]=useState({})
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        
        const fetchInitial=async()=>{
            const initialStc=[]
            for(const sym of symbols){
                const response=await fetch('http://localhost:4000/api/market/company_profile/' + sym)
                const json=await response.json()
                
                const name = json.name
                const cap = json.marketCapitalization
                const url = json.logo

                const quoteRes = await fetch('http://localhost:4000/api/market/quote/' + sym)
                const quoteJson = await quoteRes.json()
        
                initialStc[sym] = new Stock(name, sym, quoteJson.c, quoteJson.o, quoteJson.dp, quoteJson.h,cap, url)
            }
            setStocks(initialStc)
            setLoading(false)
        }
        fetchInitial()

        const socket = new WebSocket('wss://ws.finnhub.io?token=d0b2k4pr01qo0h63e9vgd0b2k4pr01qo0h63ea00');

        socket.addEventListener('open', function (event) {
            symbols.forEach((sym)=>{
                socket.send(JSON.stringify({ type: 'subscribe', symbol: sym }))
            })
        })


        socket.addEventListener('message', function (event) {
            const message = JSON.parse(event.data);
            if (message.type === "trade" && Array.isArray(message.data)){
                setStocks((prevStocks)=>{
                    const updatedStocks = { ...prevStocks }

                    message.data.forEach(({ s: symbol, p: price }) => {
                        const stock = updatedStocks[symbol]
                        if (stock) {
                            stock.updatePrice(price)
                        }
                    });
                        
                         return updatedStocks;
                })
                
            }
        })
        
    },[])



    return(
        <div className="stocksList">
            <div className="stocksHeader">
                <div id="stockIndex"><p>Stocks</p></div>
                <div><p>Current Price</p></div>
                <div><p>Change</p></div>
                <div><p>24h Highest</p></div>
                <div><p>Market Cap</p></div>

            </div>
            {loading ?(
                
                <div class="loader">
                  <div class="loader__bar"></div>
                  <div class="loader__bar"></div>
                  <div class="loader__bar"></div>
                  <div class="loader__bar"></div>
                  <div class="loader__bar"></div>
                  <div class="loader__ball"></div>
                </div>
            ):(
                stocks&&Object.values(stocks).map(stock=>(
                    <StockListDetails key={stock.symbol} stock={stock}/>
            ))
            )}        
        </div>
    )
}
export default StockList