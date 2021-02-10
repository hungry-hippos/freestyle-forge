import React, { useEffect } from 'react'
import keyboardFunctionalityFlow from './keyboardFunctionalityFlow.js'
import keyboardFunctionalityWordLab from './keyboardFunctionalityWordLab.js'
import gameFunctionality from './gameFunctionality'

import './FlowEditor.css'

const FlowEditor=()=>{


    
    useEffect(()=>{

        gameFunctionality.resetEverything();
        window.removeEventListener('keydown',keyboardFunctionalityWordLab);
        window.removeEventListener('keydown',keyboardFunctionalityFlow);


        window.addEventListener('keydown',keyboardFunctionalityFlow);
        gameFunctionality.loadListener();
    })
    return <div id='flowEditorMain'>
        <div id='flowPageBody'>
            <div id='flowInstructions'>
                <span style={{fontWeight:'bold',display:'block',fontSize:'25px'}}>INSTRUCTIONS</span>
                1. Type LOAD to load first verse and root rhymes. <br/>
                2. On the screen above, each root rhyme will spawn new rhymes. Use these rhymes in your freestlye before they cross the red line.<br/>
                3. Type GO to start game.
            </div>
            <div className='flowVerseLine'>
                <div className='flowWord'></div>
            </div>
        </div>
    </div>
}


export default FlowEditor