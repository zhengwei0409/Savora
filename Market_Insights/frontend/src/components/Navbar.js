import { Link } from "react-router-dom";
import logo from '../images/savora-logo.png';

const Navbar=()=>{
    return(
    <div className="header">
      <header>
        <div className="header-div">
          <div>
            <a href="#">
              <img src={logo} className="logo" alt="Savora Logo" />
            </a>
            <div className="nav-bar">
              <nav>
                <a href="http://127.0.0.1:5500/pages/goalForm.html">Dashboard</a>
                <a href="http://localhost:3000" className="active">Market Insight</a>
                <a href="http://127.0.0.1:5500/pages/calculator.html" >Calculator</a>
                <a href="http://127.0.0.1:5500/pages/education.html">Learning</a>
                <a href="http://127.0.0.1:5500/pages/chatbot.html">AI Chatbot</a>
              </nav>
            </div>
          </div>
          <div>
            <button className="sbtn-outline">
              <span className="bi bi-person-circle"></span> Elon Musk
            </button>
          </div>
        </div>
      </header>
    </div>
    )
    
}
export default Navbar