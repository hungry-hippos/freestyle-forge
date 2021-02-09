import React, { useEffect } from 'react'
import keyboardFunctionalityFlow from './keyboardFunctionalityFlow.js'
import gameFunctionality from './gameFunctionality'

import './FlowEditor.css'

const FlowEditor=()=>{
    
    useEffect(()=>{
        window.addEventListener('keydown',keyboardFunctionalityFlow);
        gameFunctionality.loadListener();
    })
    return <div id='flowEditorMain'>
        <div id='flowPageBody'>
            <div id='flowInstructions'>
                <span style={{fontWeight:'bold',display:'block',fontSize:'25px'}}>INSTRUCTIONS</span>
                1. Type LOAD to load first verse and hot words. <br/>
                2. On the screen above, each hot word will spawn new rhymes. Use these rhymes in your freestlye before they cross the red line.<br/>
                3. Every time you let a rhyme cross the red line, you lose a life. You run out of lives, you are muerto.<br/>
                4. Type GO to start game.
                4. Type GO to start game.
            </div>
            <div className='flowVerseLine'>
                <div className='flowWord'></div>
            </div>
        </div>
    </div>
}


export default FlowEditor