import React, {useState, useEffect} from 'react'
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [headingVisible, setHeadingVisible] = useState(false);
  const [animate, setAnimate] = useState({
    icon1: false,
    icon2: false,
    icon3: false
  });

  const [animateOut, setAnimateOut] = useState({
    leftSide: false,
    icon1: false,
    icon2: false,
    icon3: false
  });

  useEffect(() => {
    setTimeout(() => {
      setTimeout(() => {
        setAnimate({
          icon1: true,
          icon2: false,
          icon3: false
        });
        setTimeout(() => {
          setAnimate({
            icon1: true,
            icon2: true,
            icon3: false
          });
          setTimeout(() => {
            setAnimate({
              icon1: true,
              icon2: true,
              icon3: true
            })
          }, 600);
        }, 600);
      }, 600);
    }, 500);
    
  }, []);

  const initialFormValues = {
    username: "",
    password: "",
    confirmPassword: ""
  }

  const validationSchema = yup.object().shape({
    username: yup.string().required("* Username is required"),
    password: yup.string().required("* Password is required")
    // confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match!").required()
  })

  const onSubmit = data => {
    console.log(data);
  }

  const login = (data) =>{
    axios({
      method: "POST",
      data: {
        username: data.username,
        password: data.password
      },
      withCredentials: true,
      url: "http://localhost:4000/login"
    }).then(response => {
      if (!response.data.error){
        navigate("/");
      } else {
        console.log(response.data.error);
      }
    });

    // setAnimateOut({...animateOut, leftSide: !animateOut.leftSide});
    // setTimeout(() => {
    //   setHeadingVisible(!headingVisible);
    // }, 1500);
  }

  return (
    <div className='loginPageContainer'>
      <div className= {`loginPageLeftSide ${animateOut.leftSide ? 'animateLogin': ''}`}>
        
        <div className='heading1 slideUp'><h1>Flash<span style={{color: "#141259"}}>Dex</span></h1></div>

        <div className='icons'>
          {animate.icon1 && (
            <div className='iconContainer slideUp'>
              <LayersOutlinedIcon className='icon'/>
              <h2>Create decks</h2>
            </div>
          )}
          
          {animate.icon2 && (
            <div className='iconContainer slideUp'>
              <NoteOutlinedIcon className='icon' />
              <h2>Fill in cards</h2>
            </div>
          )}

          {animate.icon3 && (
            <div className='iconContainer slideUp'>
              <ListAltOutlinedIcon className='icon' />
              <h2>Study efficiently</h2>
            </div>
          )}
          
        </div>
        
        
        {headingVisible && <h2 className='slideUp'>Welcome</h2>}
      </div>

      <div className='loginPageRightSide'>
        <div className='loginHeading'><h1>Log in</h1></div>
        <Formik initialValues={initialFormValues} onSubmit={login} validationSchema={validationSchema}>
          
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

            <button className='loginBtn' type='submit'>Log in</button>

          </Form>
        
        </Formik>
      </div>

    </div>
  )
}

export default Login;