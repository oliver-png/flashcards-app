import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate} from "react-router-dom"
import axios from "axios";
import "../App.css";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const initialFormValues = {
    username: "",
    password: "",
    confirmPassword: ""
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required("* Username is required"),
    password: yup.string().required("* Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "* Passwords don't match!").required("* Password is required")
  })

  const registerUser = data => {
    
    axios({
      method: "POST",
      data: {
        username: data.username,
        password: data.password
      },
      withCredentials: true,
      url: "http://localhost:4000/register"
    }).then(response => {
      if (!response.data.error){
        navigate("/");
      } else {
        console.log(response.data.error);
      }
    });
  }

  return (
    <div className='registerPageContainer'>
      <h1 className='signupHeading'>Sign up</h1>
      <Formik initialValues={initialFormValues} onSubmit={registerUser} validationSchema={validationSchema}>
          
          <Form className='formContainer'>

            <Field
                className= "inputField"
                name="username"
                placeholder="Enter your username"
                autoComplete="off"
             />
            <ErrorMessage className='fieldError' name="username" component="span" />
            <label className='inputUsernameLabel'>Username</label>

            
            <Field 
                className="inputField"
                name="password"
                type="password"
                placeholder="Enter your password"
            />
            <ErrorMessage className='fieldError' name="password" component="span" />
            <label className='inputPasswordLabel'>Password</label>

            <Field 
                className="inputField"
                name="confirmPassword"
                type="password"
                placeholder="Re-type your password"
            />
            <ErrorMessage className='fieldError' name="confirmPassword" component="span" />
            <label className='inputPasswordLabel'>Confirm password</label>

            <button className='loginBtn' type='submit'>Sign Up</button>

          </Form>
        
        </Formik>
    </div>
  )
}

export default Registration;