import React, { useEffect } from 'react'
import keyboardFunctionalityFlow from './keyboardFunctionalityFlow.js'
import keyboardFunctionalityWordLab from './keyboardFunctionalityWordLab.js'
import gameFunctionality from './gameFunctionality'
import {IoIosArrowDropup,IoIosArrowDropdown} from 'react-icons/io'

import './FlowEditor.css'

const FlowEditor=()=>{
    
    useEffect(()=>{

        gameFunctionality.resetEverything();
        window.removeEventListener('keydown',keyboardFunctionalityWordLab);
        window.removeEventListener('keydown',keyboardFunctionalityFlow);

        //scrolling functionality on arrows
        document.getElementById('scrollUpArrow').addEventListener('mouseenter',()=>{
            var objDiv = document.getElementById('flowPageBody');
            objDiv.scrollTop = 0;
        })
        document.getElementById('scrollDownArrow').addEventListener('mouseenter',()=>{
            var objDiv = document.getElementById('flowPageBody');
            objDiv.scrollTop = objDiv.scrollHeight;
        })

    })
    return <React.Fragment>
        <div id='flowEditorMain'>
            <div id='scrollUpArrow'><IoIosArrowDropup /></div>
            <div id='flowPageBody'>
                <div className='flowVerseLine'>
                    <div className='flowWord'></div>
                </div>
            </div>
            <div id='scrollDownArrow'><IoIosArrowDropdown /></div>
        </div>
    </React.Fragment>
}


export default FlowEditor