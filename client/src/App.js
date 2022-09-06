import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Registration from "./pages/Registration";
import Deck from "./pages/Deck";

function App() {

  return (

    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/deck" element={<Deck />} />
        </Routes>
    </Router>
    
      
    
  );
}

export default App;
