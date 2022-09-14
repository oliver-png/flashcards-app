import React, { useState, useEffect } from 'react'
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";

function Deck() {

  const { deckId } = useParams();
  console.log(deckId);

  const [flipped, setFlipped] = useState("");
  const [deck, setDeck] = useState({
    name: "",
    description: "",
    cards: [
      {
        question: "",
        answer: ""
      }
    ]
  });
  const [currentCard, setCurrentCard] = useState(0);
  const [showAll, setShowAll] = useState(true);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  

  const navigate = useNavigate();

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
        const currentDeck = response.data.decks.filter(deck => deck._id === deckId)[0];
        setDeck(currentDeck);
      }
    });
  }, []);

  console.log(deck);

  const flipCard = () =>{
    if (!flipped){
      setFlipped("flip");
    } else {
      setFlipped("");
    }
  }

  const showNewItemForm = () => {
    if (!showNewCardForm){
      setShowNewCardForm(true);
    }
  }

  const initialFormValues = {
    question: "",
    answer: ""
    
  }

  const validationSchema = yup.object().shape({
    question: yup.string().required("* Question is required"),
    answer: yup.string().required("* Answer is required")
  });

  const addCard = (data) => {
    axios({
      method: "POST",
      data: data,
      url: `http://localhost:4000/deck/${deckId}`,
      withCredentials: true
    }).then(response => {
      setDeck(response.data);
    });

    setShowNewCardForm(false);
  }

  const nextCard = () => {
    if (deck.cards.length !== 0 && currentCard !== deck.cards.length - 1){
      setCurrentCard(currentCard + 1);
    }
  }

  const previousCard = () => {
    if (currentCard !== 0){
      setCurrentCard(currentCard - 1);
    }
  }

  return (
    <div className='homeContainer'>
      <div className='navbar'>
        <div><h2>Flash<span>Dex</span></h2></div>
        <div><p className='homeLink'>Home</p></div>
        <div><p>About</p></div>
        <div className='logoutLink'><p>Log out</p></div>
      </div>

      <div className='deckTitleDescription'>
        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
      </div>
      
      <div className='cardContainer' >
        <div className={"card " + flipped} onClick={flipCard}>
          <div className='front'><h1>{deck.cards.length !== 0 && deck.cards[currentCard].question}</h1></div>
          <div className='back'><h1>{deck.cards.length !== 0 && deck.cards[currentCard].answer}</h1></div>
        </div>
        <div className='btnContainer'>
          <button onClick={previousCard} style={ currentCard === 0 ? {marginRight: "4%", opacity: "0.5"} : {marginRight: "4%"}}><WestIcon /></button>
          <button onClick={nextCard} style={ currentCard === deck.cards.length - 1 || deck.cards.length === 0 ? {opacity: "0.5"} : null}><EastIcon /></button>
          
        </div>
      </div>
      <div className='cardList'>
        <h3>All cards <span className='showBtn'><button onClick={() => setShowAll(!showAll)}>{showAll ? "Hide all" : "Show all"}</button></span></h3>
        
        {showAll && deck.cards.map(card => (
          <div className='cardListItem'>
          <div style={{borderRight: "1.75px solid black"}}>{card.question}</div>
          <div>{card.answer}</div>
        </div>
        ))}
        
        {showNewCardForm && (
          <Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={addCard} >
            <Form className='newCardFormContainer'>
              <div style={{marginLeft: "10px", marginRight: "40px"}}>
                <p>Question</p>
                <Field className="newCardTextArea" name="question" placeholder="Enter question" component="textarea" />
                <ErrorMessage className='fieldError' name="question" component="p" />
                <h4>CANCEL</h4>
              </div>

              <div>
                <p>Answer</p>
                <Field className="newCardTextArea" name="answer" placeholder="Enter answer" component="textarea" />
                <ErrorMessage className='fieldError' name="answer" component="p" />
                {/* <h4 style={{marginLeft: "200px"}}>ADD CARD</h4> */}
                <button className='addCardBtn' type='submit'>ADD CARD</button>
              </div>
              
              
            </Form>
          </Formik>
        )}

        <div className='addCardListItem' onClick={showNewItemForm}>
          <AddCircleIcon className='addIconDeckPage'/>
        </div>
      </div>
    </div>
    
  );
}

export default Deck;