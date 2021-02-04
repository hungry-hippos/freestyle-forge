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
            var lastWordText=words[words.length-1].textContent;
            if (lastWordText===""){
                return;
            }
            const lastChar=lastWordText[lastWordText.length-1];
            console.log(lastChar);
            switch(lastChar){
                case '.':case ',':case ":":case ";":case "!":
                    lastWordText=lastWordText.slice(0,-1);
                    break;
                default:
                    break;
            }

            //fetch data from last typed word
            sendAPIReq(lastWordText);

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
            for (let i=0;i<res.length;i++){
                rhymes.push(res[i].word);
            }
            return rhymes;
        })
        .then((res)=>{

            //empty rhymes data from previous request
            const col2=document.getElementById('rhymesDisplayCol2');
            col2.textContent="";
            const col1=document.getElementById('rhymesDisplayCol1');
            col1.textContent="";

            //if no matches found, display shruggy dude
            if (res.length===0){
                document.getElementById('rhymesDisplayNoMatches').classList.remove('hidden');
                return;
            }

            //else, display all rhymes in two cols of 5
            for (let i=0;i<5;i++){
                if (i===res.length)
                    break;

                const rhymeData=document.createElement('div');
                rhymeData.classList.add('wordData');
                rhymeData.textContent=res[i];
                col1.appendChild(rhymeData);
            }
            
            for (var i=5;i<10;i++){
                if (i>=res.length)
                    break;

                const rhymeData=document.createElement('div');
                rhymeData.classList.add('wordData');
                rhymeData.textContent=res[i];
                col2.appendChild(rhymeData);
            }   
        });
}
const getSpelledLikeFromAPI=(word)=>{
    var sp=[];
    fetch("https://api.datamuse.com/words?sp="+word)
        .then(res=>res.json())
        .then((res)=>{
            for (let i=0;i<res.length;i++){
                sp.push(res[i].word);
            }
            return sp;
        })
        .then((res)=>{

            const col1=document.getElementById('spelledLikeDisplayCol1');
            col1.textContent="";
            const col2=document.getElementById('spelledLikeDisplayCol2');
            col2.textContent="";

            if (res.length===0){
                document.getElementById('spelledLikeDisplayNoMatches').classList.remove('hidden');
                return;
            }
            
            for (let i=0;i<5;i++){
                if (i===res.length)
                    break;

                const rhymeData=document.createElement('div');
                rhymeData.classList.add('wordData');
                rhymeData.textContent=res[i];
                col1.appendChild(rhymeData);
            }
            
            for (var i=5;i<10;i++){
                if (i>=res.length)
                    break;

                const rhymeData=document.createElement('div');
                rhymeData.classList.add('wordData');
                rhymeData.textContent=res[i];
                col2.appendChild(rhymeData);
            }
        });
}
const getSoundsLikeFromAPI=(word)=>{
    var sl=[];
    fetch("https://api.datamuse.com/words?sl="+word)
        .then(res=>res.json())
        .then((res)=>{
            for (var i=0;i<res.length;i++){
                sl.push(res[i].word);
            }
            return sl;
        })
        .then((res)=>{

            const col1=document.getElementById('soundsLikeDisplayCol1');
            col1.textContent="";
            const col2=document.getElementById('soundsLikeDisplayCol2');
            col2.textContent="";
            if (res.length===0){
                document.getElementById('soundsLikeDisplayNoMatches').classList.remove('hidden');
                return;
            }

            for (let i=0;i<5;i++){
                if (i===res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col1.appendChild(wordData);
            }
            
            for (let i=5;i<10;i++){
                if (i>=res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col2.appendChild(wordData);
            }
        });
}
const getRelatedFromAPI=(word)=>{
    var data=[];
    fetch("https://api.datamuse.com/words?ml="+word)
        .then(res=>res.json())
        .then((res)=>{
            for (var i=0;i<res.length;i++){
                data.push(res[i].word);
            }
            return data;
        })
        .then((res)=>{

            const col1=document.getElementById('relatedDisplayCol1');
            col1.textContent="";
            const col2=document.getElementById('relatedDisplayCol2');
            col2.textContent="";

            if (res.length===0){
                document.getElementById('relatedDisplayNoMatches').classList.remove('hidden');
                return;
            }
            
            for (let i=0;i<5;i++){
                if (i===res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col1.appendChild(wordData);
            }
            
            for (let i=5;i<10;i++){
                if (i>=res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col2.appendChild(wordData);
            }
        });
}
const getSynonymsFromAPI=(word)=>{
    var data=[];
    fetch("https://api.datamuse.com/words?rel_syn="+word)
        .then(res=>res.json())
        .then((res)=>{
            for (var i=0;i<res.length;i++){
                data.push(res[i].word);
            }
            return data;
        })
        .then((res)=>{

            const col1=document.getElementById('synonymsDisplayCol1');
            col1.textContent="";
            const col2=document.getElementById('synonymsDisplayCol2');
            col2.textContent="";

            if (res.length===0){
                document.getElementById('synonymsDisplayNoMatches').classList.remove('hidden');
                return;
            }
            
            for (let i=0;i<5;i++){
                if (i===res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col1.appendChild(wordData);
            }
            
            for (let i=5;i<10;i++){
                if (i>=res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col2.appendChild(wordData);
            }
        });
}
const getAntonymsFromAPI=(word)=>{
    var data=[];
    fetch("https://api.datamuse.com/words?rel_ant="+word)
        .then(res=>res.json())
        .then((res)=>{
            for (var i=0;i<res.length;i++){
                data.push(res[i].word);
            }
            return data;
        })
        .then((res)=>{

            const col1=document.getElementById('antonymsDisplayCol1');
            col1.textContent="";
            const col2=document.getElementById('antonymsDisplayCol2');
            col2.textContent="";

            if (res.length===0){
                document.getElementById('antonymsDisplayNoMatches').classList.remove('hidden');
                return;
            }

            for (let i=0;i<5;i++){
                if (i===res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col1.appendChild(wordData);
            }
            
            for (let i=5;i<10;i++){
                if (i>=res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col2.appendChild(wordData);
            }
        });
}
const getApproxRhymesFromAPI=(word)=>{
    var data=[];
    fetch("https://api.datamuse.com/words?rel_nry="+word)
        .then(res=>res.json())
        .then((res)=>{
            for (var i=0;i<res.length;i++){
                data.push(res[i].word);
            }
            return data;
        })
        .then((res)=>{

            const col1=document.getElementById('approxRhymesDisplayCol1');
            col1.textContent="";
            const col2=document.getElementById('approxRhymesDisplayCol2');
            col2.textContent="";

            if (res.length===0){
                document.getElementById('approxRhymesDisplayNoMatches').classList.remove('hidden');
                return;
            }
            
            for (let i=0;i<5;i++){
                if (i===res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col1.appendChild(wordData);
            }
            
            for (let i=5;i<10;i++){
                if (i>=res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col2.appendChild(wordData);
            }
        });
}
const getConsonantMatchFromAPI=(word)=>{
    var data=[];
    fetch("https://api.datamuse.com/words?rel_cns="+word)
        .then(res=>res.json())
        .then((res)=>{
            for (var i=0;i<res.length;i++){
                data.push(res[i].word);
            }
            return data;
        })
        .then((res)=>{

            const col1=document.getElementById('consonantMatchDisplayCol1');
            col1.textContent="";
            const col2=document.getElementById('consonantMatchDisplayCol2');
            col2.textContent="";
            
            if (res.length===0){
                document.getElementById('consonantMatchDisplayNoMatches').classList.remove('hidden');
                return;
            }
            
            for (let i=0;i<5;i++){
                if (i===res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col1.appendChild(wordData);
            }
            
            for (let i=5;i<10;i++){
                if (i>=res.length)
                    break;

                const wordData=document.createElement('div');
                wordData.classList.add('wordData');
                wordData.textContent=res[i];
                col2.appendChild(wordData);
            }
        });
}

const hideAllShruggers=()=>{
    const allShruggers=document.getElementsByClassName('noMatches');
    for (var i=0;i<allShruggers.length;i++){
        allShruggers[i].classList.add('hidden');
    }
}

const getWordAndSendAPIReq=(event)=>{
    const word=event.target.textContent;
    hideAllShruggers();
    getRhymesFromAPI(word);
    getSpelledLikeFromAPI(word);
    getSoundsLikeFromAPI(word);
    getRelatedFromAPI(word);
    getSynonymsFromAPI(word);
    getAntonymsFromAPI(word);
    getApproxRhymesFromAPI(word);
    getConsonantMatchFromAPI(word);
}
const sendAPIReq=(word)=>{
    hideAllShruggers();
    getRhymesFromAPI(word);
    getSpelledLikeFromAPI(word);
    getSoundsLikeFromAPI(word);
    getRelatedFromAPI(word);
    getSynonymsFromAPI(word);
    getAntonymsFromAPI(word);
    getApproxRhymesFromAPI(word);
    getConsonantMatchFromAPI(word);
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