const finnhub=require('finnhub')
require('dotenv').config()

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

const getNews=(req,res)=>{
     finnhubClient.marketNews("general",{}, (error, data, response) => {
        if (error) {
            console.log(error)
            return (res.status(500).json({ error: error.message }))
        }
    res.status(200).json(data)
    //console.log(process.env.FINNHUB_API_KEY)
    })
}

const getCompanyProfile=(req,res)=>{
    const {symbol}=req.params
    console.log(symbol)
    finnhubClient.companyProfile2({'symbol': symbol}, (error, data, response) => {
        if (error) {
            console.log(error)
            return (res.status(500).json({ error: error.message }))
        }
    return res.status(200).json(data)
    })
}
const getQuote=(req,res)=>{
    const {symbol}=req.params
    finnhubClient.quote(`${symbol}`, (error, data, response) => {
        if (error) {
            console.log(error)
            return (res.status(500).json({ error: error.message }))
        }
    return res.status(200).json(data)
    })
    // finnhubClient.quote("AAPL", (error, data, response) => {
    //     console.log(data)
    //   });
}
module.exports={
    getNews,getCompanyProfile,getQuote
}