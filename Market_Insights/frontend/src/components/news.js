import { useState,useEffect } from "react"
import NewsDetails from "../components/NewsDetails"

const News=()=>{

    const[newsItem,setNewsItem]=useState(null)
    useEffect(()=>{
        const fetchNews=async()=>{
            const response =await fetch('http://localhost:4000/api/market/news')
            const json=await response.json()
            if(response.ok){
                setNewsItem(json.slice(0,11))
            }
            
        }
        fetchNews()
    },[])
    console.log(newsItem)

    return(
        <div className="newsSite">
            {newsItem&&newsItem.map((news)=>(
                <NewsDetails key={news.id} news={news}/>
            ))}
        </div>
    )
}
export default News