import './App.css';
import Home from './Pages/Home';
import NQueen from './Pages/NQueen';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='N-Queen' element={<NQueen/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
