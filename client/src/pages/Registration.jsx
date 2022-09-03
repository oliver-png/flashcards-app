import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate} from "react-router-dom"

function Registration() {
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

  const onSubmit = data => {
    console.log(data);
    navigate("/login");
  }

  return (
    <div className='registerPageContainer'>
      <h1 className='signupHeading'>Sign up</h1>
      <Formik initialValues={initialFormValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          
          <Form className='formContainer'>

            <Field
                className= "inputField"
                name="username"
                placeholder="Enter your username"
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