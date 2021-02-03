import React, { useEffect } from 'react'
import TextEditor from './appFiles/TextEditor.js'
import HUD from './appFiles/HUD.js'
import './App.css';


function App() {
  return <React.Fragment>
    <HUD />
    < TextEditor />
  </React.Fragment>
}

export default App;
