import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Registration from "./pages/Registration";
import Deck from "./pages/Deck";
import CreateDeck from "./pages/CreateDeck";

function App() {

  return (

    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/deck/:deckId" element={<Deck />} />
          <Route path="/create" element={<CreateDeck />}/>
        </Routes>
    </Router>
    
      
    
  );
}

export default App;
