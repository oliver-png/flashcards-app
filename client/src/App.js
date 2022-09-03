import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Registration from "./pages/Registration";

function App() {

  return (

    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
    </Router>
    
      
    
  );
}

export default App;
