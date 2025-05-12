const NewsDetails=({news})=>{
    return(
        <div className="newsContainer">
            <div className="newsInner">
                <a href={news.url}><h3>{news.headline}</h3></a>
                <p>{news.summary}</p>
            </div>
            <img src={news.image} alt={news.headline} />
        </div>
    )
}
export default NewsDetails