import React from 'react';

import './App.css';
import Toast from './components/toast/Toast';
import checkIcon from './assets/check.svg';
import Button from './components/button/Button';
import swagIcon from './assets/warning.svg';

const checkValue="true";
const App = () => {
 

  const [showResults, setShowResults] = React.useState(false)
  let list= [
    {
      id:101,
      title: 'Success',
      description: '',
      color:'white',
      backgroundColor: '#5cb85c',
      button_color:"white",
      icon: checkIcon
    },
    {
      id:102,
      title: 'Info',
      description: '',
      color:'white',
      backgroundColor: '#42f5dd',
      button_color:"white",
      icon: checkIcon
    },
    {
      id:103,
      title: 'This is what we call on "OK" error',
      description: '',
      color:'white',
      backgroundColor: '#f5e942',
      button_color:"white",
      icon: checkIcon
    },
    {
      id:104,
      title: 'Holy***',
      description: '',
      color:'white',
      backgroundColor: '#f54242',
      button_color:"white",
      icon: checkIcon
    },
    {
      id:105,
      title: 'Vanilla Swag',
      description: '',
      color:'grey',
      backgroundColor: 'white',
      button_color:"grey",
      icon: swagIcon
    },
    {
      id:106,
      title: 'Home made',
      description: '',
      color:'white',
      backgroundColor: 'black',
      button_color:"white",
      icon: checkIcon
    },
  ];
  const showToast = () => {
    setShowResults(true)
  }
  return (
    <div className="app">
      <div className="app-header">
        <p>React Toast Component</p>
        <div className="toast-buttons">
        { 
              <Button 
                className=""
                label="SHOW ME THE AWESOMENESS ! "
                handleClick={() => showToast()}
              />
        }

        </div>
      </div>
      <div id="toast-div" >
        { showResults ? <Toast 
          toastList={list}
          position='top-right'
        />: null }
      </div>
    </div>
  );
}

export default App;
