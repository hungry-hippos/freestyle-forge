import React from 'react'
import {Button} from 'react-bootstrap'
import "./HUD.css"

const chooseMode=(mode)=>{
    var clickedBtn=document.getElementsByClassName('clickedBtn');
    const isClicked=document.getElementById(mode).classList.contains('clickedBtn');
    //if a fourth btn is about to be selected, unselect some clicked btn
    if (clickedBtn.length===3 && !isClicked){
        var id=clickedBtn[0].getAttribute('id');
        id+='Display';
        document.getElementById(id).classList.toggle('hidden');
        clickedBtn[0].classList.remove('clickedBtn');
    }
    document.getElementById(mode).classList.toggle('clickedBtn');
    const displayId=mode+"Display";
    document.getElementById(displayId).classList.toggle('hidden');

}

const HUD=()=>{
    return <div id='HUD'>
        <div className='HUDSection' id='rhyDisplay'>
            <div className='sectionTitle'>RHYMES</div>
            <div id='rhymesDisplayCol1' className='displayCol'></div>
            <div id='rhymesDisplayCol2' className='displayCol'></div>
        </div>
        <div className='HUDSection' id='appRhyDisplay'>
            <div className='sectionTitle'>APPROX RHYMES</div>
            <div id='approxRhymesDisplayCol1' className='displayCol'></div>
            <div id='approxRhymesDisplayCol2' className='displayCol'></div>
        </div>
        <div className='HUDSection' id='slDisplay'>
            <div className='sectionTitle'>SOUNDS LIKE</div>
            <div id='soundsLikeDisplayCol1' className='displayCol'></div>
            <div id='soundsLikeDisplayCol2' className='displayCol'></div>
        </div> 
        <div className='HUDSection hidden' id='splDisplay'>
            <div className='sectionTitle'>SPELLED LIKE</div>
            <div id='spelledLikeDisplayCol1' className='displayCol'></div>
            <div id='spelledLikeDisplayCol2' className='displayCol'></div>
        </div>       
        <div className='HUDSection hidden' id='relDisplay'>
            <div className='sectionTitle'>RELATED</div>
            <div id='relatedDisplayCol1' className='displayCol'></div>
            <div id='relatedDisplayCol2' className='displayCol'></div>
        </div>
        <div className='HUDSection hidden' id='synDisplay'>
            <div className='sectionTitle'>SYNONYMS</div>
            <div id='synonymsDisplayCol1' className='displayCol'></div>
            <div id='synonymsDisplayCol2' className='displayCol'></div>
        </div>
        <div className='HUDSection hidden' id='antDisplay'>
            <div className='sectionTitle'>ANTONYMS</div>
            <div id='antonymsDisplayCol1' className='displayCol'></div>
            <div id='antonymsDisplayCol2' className='displayCol'></div>
        </div>
        <div className='HUDSection hidden' id='cmDisplay'>
            <div className='sectionTitle'>CONSONANT MATCH</div>
            <div id='consonantMatchDisplayCol1' className='displayCol'></div>
            <div id='consonantMatchDisplayCol2' className='displayCol'></div>
        </div>
        <div id='btnsBar'>
            <Button variant='outline-dark' className='optionsBtn clickedBtn' id='rhy' onClick={()=>{chooseMode('rhy')}}>Rhymes</Button>
            <Button variant='outline-dark' className='optionsBtn clickedBtn' id='appRhy' onClick={()=>{chooseMode('appRhy')}}>Approx. Rhymes</Button>
            <Button variant='outline-dark' className='optionsBtn clickedBtn' id='sl' onClick={()=>{chooseMode('sl')}}>Sounds like</Button>
            <Button variant='outline-dark' className='optionsBtn' id='spl' onClick={()=>{chooseMode('spl')}}>Spelled like</Button>
            <Button variant='outline-dark' className='optionsBtn' id='rel' onClick={()=>{chooseMode('rel')}}>Related</Button>
            <Button variant='outline-dark' className='optionsBtn' id='syn' onClick={()=>{chooseMode('syn')}}>Synonyms</Button>
            <Button variant='outline-dark' className='optionsBtn' id='ant' onClick={()=>{chooseMode('ant')}}>Antonyms</Button>
            <Button variant='outline-dark' className='optionsBtn' id='cm' onClick={()=>{chooseMode('cm')}}>Consonant Match</Button>
        </div>
    </div>
}

export default HUD