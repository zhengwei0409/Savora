import { useState ,useEffect} from "react"
import Stock from "../models/stock";
import TopStockDetails from "../components/topStockDetails";
import MarketSubNav from '../components/marketSubNav'


const Market=()=>{
    const symbols=['AAPL','BINANCE:BTCUSDT','MSFT']
    const [stocks,setStocks]=useState({})


    useEffect(() => {
        const fetchInitial = async () => {
            const initialStc = {};
      
            for (const sym of symbols) {
              let name = '';
              let cap = 0;
              let url = '';
              let symbol = sym === 'BINANCE:BTCUSDT' ? 'BTC' : sym;
      
              if (sym === 'BINANCE:BTCUSDT') {
                name = 'Bitcoin'
                cap = 1880726424192.43
                url = '/images/bitcoin-btc-logo'
              } else {
                const response = await fetch('http://localhost:4000/api/market/company_profile/' + sym)
                const json = await response.json()
                name = json.name;
                cap = json.marketCapitalization;
                url = json.logo;
              }
      
              const quoteRes = await fetch('http://localhost:4000/api/market/quote/' + sym)
              const quoteJson = await quoteRes.json()
      
              initialStc[sym] = new Stock(name, symbol, quoteJson.c, quoteJson.o, quoteJson.dp, quoteJson.h,cap, url)
            }
      
            setStocks(initialStc)
            console.log(initialStc)
          };
      
          fetchInitial();

        const socket = new WebSocket('wss://ws.finnhub.io?token=d08c4p9r01qpb1grl0q0d08c4p9r01qpb1grl0qg');

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
        
        // // Unsubscribe
        //  var unsubscribe = function(symbol) {
        //     socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
        // }
      }, []);

    return(
        <div className="market">
            <div className="topMarket">
                {stocks&&Object.values(stocks).map(stock=>(
                    <TopStockDetails key={stock.symbol} stock={stock}/>
                ))}
            </div>
            <MarketSubNav/>
        </div>
    )
}
export default Market