import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ROUTES } from './utils';
import {
  LoadingSpinner
} from './components';

function App() {
  return (
    <div className="App">
      <LoadingSpinner />
      <Router>
        <Routes>
          {ROUTES.map((route, index) => {
            return <Route key={index} {...route} />
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;