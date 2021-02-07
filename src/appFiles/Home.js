import React, { useEffect } from 'react'
import freestyleLog from '../images/another.PNG'
import wordLabImg from '../images/wordLab.PNG'
import './Home.css'

const Home=()=>{

    useEffect(()=>{

        //title/body animation on game tags
        const appDemos=document.getElementsByClassName('appDemo');
        appDemos[0].addEventListener('mouseenter',()=>{
            document.getElementById('wordLabCarousel').classList.add('scrollToBottom');
        })
        appDemos[0].addEventListener('mouseleave',()=>{
            document.getElementById('wordLabCarousel').classList.remove('scrollToBottom');
        })
        appDemos[1].addEventListener('mouseenter',()=>{
            document.getElementById('fluidFlowCarousel').classList.add('scrollToBottom');
        })
        appDemos[1].addEventListener('mouseleave',()=>{
            document.getElementById('fluidFlowCarousel').classList.remove('scrollToBottom');
        })
    })


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
                <div className='carousel' id='wordLabCarousel'>
                    <div className='appDemoTitle'>WORD LAB</div>
                    <div className='appDemoBody'>
                        Develop your rhyming skills using our real-time rhyme generator. No time rush, no contraints. <br/>Rhyme as you please.
                    </div>
                </div>
            </div>
            <div className='appDemo'>
                <img src={wordLabImg} alt='' className='demoImg' />
                <div className='carousel' id='fluidFlowCarousel'>
                    <div className='appDemoTitle'>FLUID FLOW</div>
                    <div className='appDemoBody'>
                        SOME TEXT WILLL GO HERE
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Home