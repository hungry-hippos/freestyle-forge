import React, { useEffect } from 'react'
import keyboardFunctionalityWordLab from './keyboardFunctionalityWordLab'
import keyboardFunctionalityFlow from './keyboardFunctionalityFlow'
import gameFunctionality from './gameFunctionality'
import './TextEditor.css'

const TextEditor=()=>{
    useEffect(()=>{

        gameFunctionality.resetEverything();
        window.removeEventListener('keydown',keyboardFunctionalityWordLab);
        window.removeEventListener('keydown',keyboardFunctionalityFlow);


        //removes keypress event listener from window then adds to prevent double functionality
        window.addEventListener('keydown',keyboardFunctionalityWordLab);
        
    })
    return <div id='textEditorMain'>
        <div id='instructions'>
            <span style={{fontWeight:'bold',display:'block',fontSize:'25px'}}>INSTRUCTIONS</span>
            1. Select up to 3 rhyming options from the options bar above. <br/>
            2. Begin typing your freestyle. Every time you hit the spacebar, rhymes are shown for the last typed word. <br/>
            3. Hover your mouse over any word you've typed to get its rhymes.
        </div>
        <div id='pageBody'>
            <div className='verseLine'>
                <div className='word'></div>
            </div>
        </div>
    </div>
}


export default TextEditor