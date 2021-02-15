import React, { useEffect } from 'react'
import gameFunctionality from './gameFunctionality'
import {Button} from 'react-bootstrap'
import './FlowHUD.css'

const FlowHUD=()=>{

    const typeFirstVerse=()=>{
        document.getElementById('flowStartBtnDiv').classList.add('hidden');

        //types the first verse, then loads keydown event listeners on window
        gameFunctionality.typeFirstVerse();
    }

    return <React.Fragment>
    <div id='flowInstructions'>
            <div id='flowStartBtnDiv'>
                <Button onClick={typeFirstVerse} variant='danger' id='flowStartBtn'>START</Button>
            </div>
            <span id='instructionsText' className='hidden'>
                Start typing your freestyle. <br/>
                We feed you the rhymes, you string them together.
            </span>
        </div>
    <div id='flowHUD'>
        <div id='rootRhymesEnd'>
            <h2 style={{fontSize:'20px',textAlign:'center',marginBottom:'15px'}}>ROOT RHYMES</h2>
        </div>
        <div id='rhymeLanes'></div>
        <div id='finishEnd'>
        </div>
    </div>
    < div id='rhymesStack' className='hidden'>
    </div>
    </React.Fragment>
}

export default FlowHUD