import React, { useState } from 'react'
import TextEditor from './appFiles/TextEditor.js'
import HUD from './appFiles/HUD.js'
import Navbar from './appFiles/Navbar.js'
import Home from './appFiles/Home.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const WordLab=()=>{
  return <React.Fragment>
    < HUD />
    < TextEditor />
  </React.Fragment>
}

const Homesite=()=>{
  return <Home />
}


function App() {
  const [showHome,setShowHome]=useState(true);
  const [showLab,setShowLab]=useState(false);

  const setters=[setShowHome,setShowLab];

  return <React.Fragment>
    <Navbar setters={setters} />
    {showHome && <Homesite />}
    {showLab && <WordLab />}
  </React.Fragment>
}

export default App;
