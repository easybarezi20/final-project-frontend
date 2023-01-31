import './App.css';
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <div className='pages'>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <div className='footer'>

      <Footer/>
      </div>
    </div>
  );
}

export default App;
