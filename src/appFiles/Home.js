import React from 'react'
import freestyleLog from '../images/another.PNG'
import wordLabImg from '../images/wordLab.PNG'
import './Home.css'

const Home=()=>{
    return <React.Fragment>
        <div id='leftHalf'>
            <img src={freestyleLog} alt='' id='homeSiteLogo'/>
        </div>
        <div id='rightHalf'>
            <div id='introParagraph'>
                Forge that diction intuition, <br/>a versatile vernacular, <br/>fuel for thoughts that flow <br/>to the beat of a keyboard's <br/>freed words.
            </div>
            <div className='appDemo'>
                <img src={wordLabImg} alt='' className='demoImg' />
                WORD LAB
            </div>
            <div>
                WORD LAB
            </div>
        </div>
    </React.Fragment>
}

export default Home