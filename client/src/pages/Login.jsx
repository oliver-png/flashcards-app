import React, {useState, useEffect} from 'react'
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


function Login() {

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

  const login = () =>{
    setAnimateOut({...animateOut, leftSide: !animateOut.leftSide});
    setTimeout(() => {
      setHeadingVisible(!headingVisible);
    }, 1500);
  }

  return (
    <div className='loginContainer'>
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
      <div className='loginPageRightSide' onClick={login}></div>
    </div>
  )
}

export default Login