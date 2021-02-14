import React, { useEffect } from 'react'
import {Button} from 'react-bootstrap'
import keyboardFunctionalityFlow from './keyboardFunctionalityFlow.js'
import keyboardFunctionalityWordLab from './keyboardFunctionalityWordLab.js'
import gameFunctionality from './gameFunctionality'

import './FlowEditor.css'

const FlowEditor=()=>{

    const typeFirstVerse=()=>{
        document.getElementById('flowStartBtnDiv').classList.add('hidden');

        //types the first verse, then loads keydown event listeners on window
        gameFunctionality.typeFirstVerse();
    }
    
    useEffect(()=>{

        gameFunctionality.resetEverything();
        window.removeEventListener('keydown',keyboardFunctionalityWordLab);
        window.removeEventListener('keydown',keyboardFunctionalityFlow);

    })
    return <React.Fragment>
        <div id='flowInstructions'>
            <div id='flowStartBtnDiv'>
                <Button onClick={typeFirstVerse} variant='dark' id='flowStartBtn'>START</Button>
            </div>
            <span id='instructionsText' className='hidden'>
                Start typing your freestyle. <br/>
                We feed you the rhymes, you string them together.
            </span>
        </div>
        <div id='flowEditorMain'>
            <div id='flowPageBody'>
                <div className='flowVerseLine'>
                    <div className='flowWord'></div>
                </div>
            </div>
        </div>
    </React.Fragment>
}


export default FlowEditor