import React, { useState } from 'react'

function Deck() {

  const [flipped, setFlipped] = useState("");

  const flipCard = () =>{
    if (!flipped){
      setFlipped("flip");
    } else {
      setFlipped("");
    }
  }

  return (
    <div className='homeContainer'>
      <div className='cardContainer' onClick={flipCard}>
        <div className={"card " + flipped}>
          <div className='front'><h1>front of card</h1></div>
          <div className='back'><h1>back of card</h1></div>
        </div>
      </div>
    </div>
    
  );
}

export default Deck;