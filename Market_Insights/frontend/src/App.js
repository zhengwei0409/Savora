import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Market from './pages/Market_Insights'
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <Routes>
          <Route
            path='/'
            element={<Market/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
