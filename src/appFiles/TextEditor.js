import React, { useEffect } from 'react'
import './TextEditor.css'

const keyboardFuncitonality=()=>{

    //loading API functionality to first word
    document.getElementsByClassName('word')[0].addEventListener('mouseenter',getWordAndSendAPIReq);

    window.addEventListener('keydown',(event)=>{

        if (event.key==='Shift' || event.key==='CapsLock' || event.key==="ArrowLeft" || event.key==="ArrowRight" || event.key==="ArrowUp" || event.key==="ArrowDown"){
            return;
        }

        //if key===enter, create new line with empty word, append at bottom of textEditor
        if (event.code==='Enter'){
            //safety measure for long pressing enter
            const lines=document.getElementsByClassName('verseLine');
            const lastLine=lines[lines.length-1];
            const lastLineWords=lastLine.childNodes;
            
            if (lastLineWords.length===1 && lastLineWords[0].textContent===""){
                return;
            }

            const line=document.createElement('div');
            line.classList.add('verseLine');
            const word=document.createElement('div');
            word.classList.add('word');
            word.addEventListener('mouseenter',getWordAndSendAPIReq);
            line.appendChild(word);
            document.getElementById('textEditorMain').appendChild(line);
            return;
        }
        //if key===space, create new word div, append it to last line
        if (event.code==='Space'){
            event.preventDefault();

            //safety measure for long pressing spaceBar
            const words=document.getElementsByClassName('word');
            const lastWordText=words[words.length-1].textContent;
            if (lastWordText===""){
                return;
            }

            const word=document.createElement('div');
            word.classList.add('word');
            word.addEventListener('mouseenter',getWordAndSendAPIReq);
            const lines=document.getElementsByClassName('verseLine');
            lines[lines.length-1].appendChild(word);
            return;
        }
        //if key===backspace do something idk what yet
        if (event.code==='Backspace'){
            const words=document.getElementsByClassName('word');
            
            const lastWord=words[words.length-1];
            const lastWordText=lastWord.textContent;
            var reducedWord="";
            for (var i=0;i<lastWordText.length-1;i++){
                reducedWord+=lastWordText[i];
            }

            if (reducedWord==="" && words.length!==1){
                lastWord.remove();
            }else{
                lastWord.textContent=reducedWord;
            }

            return;

        }

        //for any other char, add char to last word. I need a filter to process only nums and letters
        const words=document.getElementsByClassName('word');
        words[words.length-1].textContent=words[words.length-1].textContent+event.key;
    })
}
const getRhymesFromAPI=(word)=>{
    var rhymes=[];
    fetch("https://api.datamuse.com/words?rel_rhy="+word)
        .then(res=>res.json())
        .then((res)=>{
            for (var i=0;i<res.length;i++){
                rhymes.push(res[i].word);
            }
            return rhymes;
        })
        .then((res)=>{
            const rhymesDisplay=document.getElementById('rhymesDisplay');
            var rhymes="";
            for (var i=0;i<res.length;i++){
                rhymes+=res[i]+" ";
            }
            rhymesDisplay.textContent=rhymes;
        });
}
const getWordAndSendAPIReq=(event)=>{
    const word=event.target.textContent;
    getRhymesFromAPI(word);
    console.log('request called');
}

const TextEditor=()=>{
    useEffect(()=>{

        keyboardFuncitonality();
        
    })
    return <div id='textEditorMain'>
        <div className='verseLine'>
            <div className='word'></div>
        </div>
    </div>
}


export default TextEditor