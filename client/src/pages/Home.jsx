import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:4000/auth",
      withCredentials: true
    }).then(response => {
      if (response.data.error){
        console.log(response.data.error);
        navigate("/login");
      } else {
        console.log(response.data.decks);
        setDecks(response.data.decks)
      }
    });
  }, []);


  return (
    <div className='homePageContainer'>
      <div className='navbar'>
        <div><h2>Flash<span>Dex</span></h2></div>
        <div><p className='homeLink'>Home</p></div>
        <div><p>About</p></div>
        <div className='logoutLink'><p>Log out</p></div>
      </div>
      
      <h2 className='decksHeading'>Your decks</h2>
      <div className='homeBody'>
        {decks.map(deck => (
          <div>
            <h3>{deck.name}</h3>
            <p>{`${deck.cards.length} ${deck.cards.length === 1 ? 'card' : 'cards'} `}</p>
            <p>{`Created ${deck.dateCreated}`}</p>
          </div>
        ))}
        <div className='addDeck'>
          <AddCircleIcon className='addIcon'/>
        </div>
        
      </div>
      
      
    </div>
  )
}

export default Home;