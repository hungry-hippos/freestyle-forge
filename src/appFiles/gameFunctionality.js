import verseBank from './verseBank.js'

var gameFunctionality={
    isStarted:false,
    firstVerse:'',
    firstVerseChar:0,
    intervalCode:0,
    getLastWord(){
        const allWords=document.getElementsByClassName('flowWord');
        return allWords[allWords.length-1].textContent;
    },
    typeFirstVerse(){
        gameFunctionality.intervalCode=setInterval(()=>{
            while(gameFunctionality.firstVerseChar<gameFunctionality.firstVerse.length){
                var evt = new KeyboardEvent('keydown', {key:gameFunctionality.firstVerse[gameFunctionality.firstVerseChar]}); 
                window.dispatchEvent(evt);
                gameFunctionality.firstVerseChar++;
                break; 
            }
            if (gameFunctionality.firstVerseChar==gameFunctionality.firstVerse.length){
                var evt = new KeyboardEvent('keydown', {code:'Enter'}); 
                window.dispatchEvent(evt);
                clearInterval(gameFunctionality.intervalCode);
                gameFunctionality.firstVerseChar=0; 
            }
        },50)
        
        
    },
    eraseAllWords(){
        var allWords=document.getElementsByClassName('flowWord');
        while(allWords.length>1){
            allWords[0].remove();
        }
        allWords[0].textContent='';
    },
    listener(event){
        console.log(event);
        const lastWord=gameFunctionality.getLastWord();
        if (lastWord==='LOAD'){
            gameFunctionality.eraseAllWords();
            const num=Math.round(Math.random()*(verseBank.length-1));
            gameFunctionality.firstVerse=verseBank[num];
            gameFunctionality.typeFirstVerse();
        }
    },
    loadListener(){
        window.addEventListener('keydown',gameFunctionality.listener);
    }
}

export default gameFunctionality