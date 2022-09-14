import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateDeck() {

  const navigate = useNavigate();

  const initialFormValues = {
    deckName: "",
    description: ""
  }

  const validationSchema = yup.object().shape({
    deckName: yup.string().required("*Deck name is required"),
    description: yup.string()
  })

  const addDeck = (data) => {
    axios({
      method: "POST",
      data: data,
      withCredentials: true,
      url: "http://localhost:4000/"
    }).then(response => {
      response.data === "successful" && navigate("/");
    });
  }

  return (
    <div className='homePageContainer'>
      <div className='navbar'>
        <div><h2>Flash<span>Dex</span></h2></div>
        <div><p className='homeLink'>Home</p></div>
        <div><p>About</p></div>
        <div className='logoutLink'><p>Log out</p></div>
      </div>

      <h2 className='decksHeading'>Create Deck</h2>
      <Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={addDeck}>
          
          <Form className='formContainer createDeckFormContainer'>
    
            <Field
                className="deckNameInput"
                name="deckName"
                placeholder="Enter deck name"
                autoComplete="off"
             />
            <ErrorMessage className='deckInputError' name="deckName" component="span" />

            
            <Field
                component="textarea" 
                className="deckNameInput deckDescriptionInput"
                name="description"
                placeholder="Enter a brief description"
            />
            <ErrorMessage className='fieldError' name="description" component="span" />

            <button className='createDeckSubmitBtn' type='submit'>Create deck</button>

          </Form>
        
        </Formik>
    </div>
  )
}

export default CreateDeck;