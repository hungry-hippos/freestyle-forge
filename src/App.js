import React, { useState } from 'react'
import TextEditor from './appFiles/TextEditor.js'
import HUD from './appFiles/HUD.js'
import Navbar from './appFiles/Navbar.js'
import Home from './appFiles/Home.js'
import FlowEditor from './appFiles/FlowEditor.js'
import FlowHUD from './appFiles/FlowHUD.js'
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

const FluidFlow=()=>{
  return <React.Fragment>
    < FlowHUD />
    < FlowEditor />
  </React.Fragment>
}


function App() {
  const [showHome,setShowHome]=useState(true);
  const [showLab,setShowLab]=useState(false);
  const [showFlow,setShowFlow]=useState(false);

  const setters=[setShowHome,setShowLab,setShowFlow];

  return <React.Fragment>
    <Navbar setters={setters} />
    {showHome && <Homesite />}
    {showFlow && <FluidFlow />}
    {showLab && <WordLab />}
  </React.Fragment>
}

export default App;
