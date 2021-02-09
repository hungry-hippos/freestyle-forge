import verseBank from './verseBank.js'

var gameFunctionality={
    isWordsMoving:false,
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
                if (gameFunctionality.firstVerse[gameFunctionality.firstVerseChar]===" "){
                    const evt = new KeyboardEvent('keydown', {code:"Space"}); 
                    window.dispatchEvent(evt);
                }else{
                    const evt = new KeyboardEvent('keydown', {key:gameFunctionality.firstVerse[gameFunctionality.firstVerseChar]}); 
                    window.dispatchEvent(evt);
                }
                
                gameFunctionality.firstVerseChar++;
                break; 
            }
            if (gameFunctionality.firstVerseChar==gameFunctionality.firstVerse.length){
                var evt = new KeyboardEvent('keydown', {code:'Enter'}); 
                window.dispatchEvent(evt);
                clearInterval(gameFunctionality.intervalCode);
                gameFunctionality.firstVerseChar=0;
                gameFunctionality.getRootRhymes(); 
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
    getLongWordsFromLastVerse(){
        var lastVerse=document.getElementsByClassName('flowVerseLine');
        lastVerse=lastVerse[lastVerse.length-2];
        const lastVerseWords=lastVerse.childNodes;

        var longWords=[];
        for (var i=0;i<lastVerseWords.length;i++){
            if (lastVerseWords[i].textContent.length>=4){
                longWords.push(lastVerseWords[i]);
            }
        }
        return longWords;
    },
    shuffleArr(arr){
        for (var i=0;i<arr.length;i++){
            const num=Math.round(Math.random()*(arr.length-1));
            var temp=arr[i];
            arr[i]=arr[num];
            arr[num]=temp;
        }
        return arr;
    },
    async getAPIData(type,wordPtr){

        switch(type){
            case "rhyme":
                type="rel_rhy=";
                break;
            default:
                break;
        }
        var data=[];
        fetch("https://api.datamuse.com/words?"+type+wordPtr.textContent)
            .then(res=>res.json())
            .then((res)=>{
                for (let i=0;i<res.length;i++){
                    data.push(res[i].word);
                }
                return data;
            })
            .then((res)=>{
                if (res.length>5){
                    if (document.getElementsByClassName('rhymeLane').length>=3)
                        return;

                    const num=Math.round(Math.random()*4)+3;
                    var rhymeWords=[];
                    for (var i=0;i<num;i++){
                        rhymeWords.push(res[i]);
                    }
                    
                    //creating n appending root rhyme on HUD left end
                    const containerDiv=document.createElement('div');
                    containerDiv.classList.add('rhymeLane');
                    const wordDiv=document.createElement('div');
                    wordDiv.classList.add('rootWord');
                    wordDiv.textContent=wordPtr.textContent;
                    const lengthDiv=document.createElement('div');
                    lengthDiv.classList.add('rootWord');
                    lengthDiv.textContent=rhymeWords.length;
                    containerDiv.appendChild(wordDiv)
                    containerDiv.appendChild(lengthDiv);
                    document.getElementById('rhymeLanes').appendChild(containerDiv);

                    //creating n appending rhyme w/ root rhyme on stack
                    for (var i=0;i<rhymeWords.length;i++){
                        const rhymePair=document.createElement('div');
                        rhymePair.classList.add('stackPair');
                        const stackRhyme=document.createElement('div');
                        stackRhyme.classList.add('stackRhyme');
                        stackRhyme.textContent=rhymeWords[i];
                        const stackRoot=document.createElement('div');
                        stackRoot.classList.add('stackRoot');
                        stackRoot.textContent=wordPtr.textContent;

                        rhymePair.appendChild(stackRhyme);
                        rhymePair.appendChild(stackRoot);
                        document.getElementById('rhymesStack').appendChild(rhymePair);
                    }

                    wordPtr.classList.add('bold');

                }
            })
    },
    getRootRhymes(){
        var longWords=gameFunctionality.getLongWordsFromLastVerse();
        longWords=gameFunctionality.shuffleArr(longWords);
        var rootRhymes=document.getElementsByClassName('rootRhymeDiv');
        for (var i=0;i<longWords.length;i++){
            gameFunctionality.getAPIData("rhyme",longWords[i]);                
        }
    },
    moveFromStackToLane(){
        var rhymePairs=document.getElementsByClassName('stackPair');
        const num=Math.round(Math.random()*(rhymePairs.length-1));
        const rhyme=rhymePairs[num].childNodes[0].textContent;
        const root=rhymePairs[num].childNodes[1].textContent;
        rhymePairs[num].remove();

        const rhymeLanes=document.getElementsByClassName('rhymeLane');
        for (var i=0;i<rhymeLanes.length;i++){
            if (rhymeLanes[i].childNodes[0].textContent===root){
                var freq=parseInt(rhymeLanes[i].childNodes[1].textContent,10)-1;
                rhymeLanes[i].childNodes[1].textContent=freq;
                const runningWord=document.createElement('div');
                runningWord.textContent=rhyme;
                runningWord.classList.add('runningWord');
                rhymeLanes[i].appendChild(runningWord);
            }
        }
    },
    moveWords(){
        setInterval(()=>{
            var allRunners=document.getElementsByClassName('runningWord');
            var i=0;
            while(i<allRunners.length){
                var posLeft=parseInt(allRunners[i].offsetLeft,10);
                var posRight=1200-posLeft-allRunners[i].offsetWidth;
                if (posRight<=40){
                    allRunners[i].remove();
                    continue;
                }
                posLeft+=1;
                allRunners[i].style.left=posLeft+'px';
                i++;
            }
        },10)
    },
    listener(event){
        const lastWord=gameFunctionality.getLastWord();
        if (lastWord==='LOAD'){
            gameFunctionality.eraseAllWords();
            const num=Math.round(Math.random()*(verseBank.length-1));
            gameFunctionality.firstVerse=verseBank[num];
            gameFunctionality.typeFirstVerse();
        }
        if (event.key==='1'){
            gameFunctionality.moveFromStackToLane();
            if (!gameFunctionality.isWordsMoving){
                gameFunctionality.isWordsMoving=true;
                gameFunctionality.moveWords();
            }
            
        }
    },
    loadListener(){
        window.addEventListener('keydown',gameFunctionality.listener);
    }
}

export default gameFunctionality