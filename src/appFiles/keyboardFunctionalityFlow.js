
const keyboardFunctionalityFlow=(event)=>{

    if (event.key==='Shift' || event.key==='CapsLock' || event.key==="ArrowLeft" || event.key==="ArrowRight" || event.key==="ArrowUp" || event.key==="ArrowDown"){
        return;
    }

    //if key===enter, create new line with empty word, append at bottom of textEditor
    if (event.code==='Enter'){
        //safety measure for long pressing enter
        const lines=document.getElementsByClassName('flowVerseLine');
        const lastLine=lines[lines.length-1];
        const lastLineWords=lastLine.childNodes;
        
        if (lastLineWords.length===1 && lastLineWords[0].textContent===""){
            return;
        }

        const line=document.createElement('div');
        line.classList.add('flowVerseLine');
        const word=document.createElement('div');
        word.classList.add('flowWord');
        line.appendChild(word);
        document.getElementById('flowPageBody').appendChild(line);


        var objDiv = document.getElementById('flowPageBody');
        objDiv.scrollTop = objDiv.scrollHeight;

        return;
    }
    //if key===space, create new word div, append it to last line
    if (event.code==='Space'){

        event.preventDefault();

        //safety measure for long pressing spaceBar
        const words=document.getElementsByClassName('flowWord');
        var lastWordText=words[words.length-1].textContent;
        if (lastWordText===""){
            return;
        }
        const lastChar=lastWordText[lastWordText.length-1];
        switch(lastChar){
            case '.':case ',':case ":":case ";":case "!":
                lastWordText=lastWordText.slice(0,-1);
                break;
            default:
                break;
        }

        const word=document.createElement('div');
        word.classList.add('flowWord');
        const lines=document.getElementsByClassName('flowVerseLine');
        lines[lines.length-1].appendChild(word);
        return;
    }
    //if key===backspace do something idk what yet
    if (event.code==='Backspace'){

        const words=document.getElementsByClassName('flowWord');
        const lastWord=words[words.length-1];
        const lastWordText=lastWord.textContent;
        var reducedWord="";
        for (var i=0;i<lastWordText.length-1;i++){
            reducedWord+=lastWordText[i];
        }

        if (reducedWord==="" && words.length!==1){
            lastWord.remove();
            var allLines=document.getElementsByClassName('flowVerseLine');
            const lastLineChildren=allLines[allLines.length-1].childNodes;
            if (allLines.length>1 && lastLineChildren.length===0){
                allLines[allLines.length-1].remove();
            }
        }else{
            lastWord.textContent=reducedWord;
        }

        return;

    }

    //for any other char, add char to last word. I need a filter to process only nums and letters
    const words=document.getElementsByClassName('flowWord');
    words[words.length-1].textContent=words[words.length-1].textContent+event.key;
    
}

export default keyboardFunctionalityFlow