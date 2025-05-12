import { useState } from "react"
import News from '../components/news'
import StockList from '../components/StocksList'

const SubNav=()=>{
    const[active,setActive]=useState('News')

    const renderComponents=()=>{
        switch(active){
            case 'News':
                return <News/>
            case 'Stocks':
                return <StockList/>
        }
    }
    return(
        <div className="secondContainer">
            <nav>
                <ul>
                    <li onClick={()=>setActive('News')}
                        className={active==='News'?'nav-active':''}
                        >News</li>
                    <li onClick={()=>setActive('Stocks')}
                        className={active==='Stocks'?'nav-active':''}
                        >Stocks</li>
                </ul>
            </nav>
            <div className="renderComponents">
                {renderComponents()}
            </div>
        </div>
        
        
    )
}
export default SubNav