import React, { useEffect } from 'react'
import './FlowHUD.css'

const FlowHUD=()=>{

    return <React.Fragment>
    <div id='flowHUD'>
        <div id='rootRhymesEnd'>
            <h2 style={{fontSize:'20px',textAlign:'center',marginBottom:'15px'}}>ROOT RHYMES</h2>
        </div>
        <div id='rhymeLanes'></div>
        <div id='finishEnd'>
        </div>
    </div>
    < div id='rhymesStack'>
    </div>
    </React.Fragment>
}

export default FlowHUD