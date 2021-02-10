import verseBank from './verseBank.js'

var gameFunctionality={
    isWordsMoving:false,
    firstVerse:'',
    firstVerseChar:0,
    intervalCode:0,
    moveIntervalCode:0,
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
    eraseLastWord(){
        var allWords=document.getElementsByClassName('flowWord');
        allWords[allWords.length-1].textContent='';
    },
    getLongWords(){
        var allWords=document.getElementsByClassName('flowWord');
        var longWords=[];
        for (var i=0;i<allWords.length;i++){
            if (allWords[i].textContent.length>=4){
                longWords.push(allWords[i]);
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
                    //if all lanes are full...
                    if (document.getElementsByClassName('rhymeLane').length>=3)
                        return;

                    //avoiding duplicate root words...
                    var allLanes=document.getElementsByClassName('rhymeLane');
                    for (var i=0;i<allLanes.length;i++){
                        if (allLanes[i].childNodes[0].textContent===wordPtr.textContent)
                            return;
                    }

                    //choosing a radnom set of rhymes to include in stack
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

                    const lanes=document.getElementsByClassName('rhymeLane');
                    if (lanes.length===1){
                        containerDiv.classList.add('greenLane');
                        wordPtr.classList.add('greenLane');
                    }else if (lanes.length===2){
                        containerDiv.classList.add('redLane');
                        wordPtr.classList.add('redLane');
                    }else if (lanes.length===3){
                        containerDiv.classList.add('blueLane');
                        wordPtr.classList.add('blueLane');
                    }

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
        var longWords=gameFunctionality.getLongWords();
        longWords=gameFunctionality.shuffleArr(longWords);
        for (var i=0;i<longWords.length;i++){
            gameFunctionality.getAPIData("rhyme",longWords[i]);                
        }
    },
    moveFromStackToLane(){
        var rhymePairs=document.getElementsByClassName('stackPair');
        if (rhymePairs.length===0){
            clearInterval(gameFunctionality.intervalCode);
            return;
        }

        //pop random word pair form stack
        const num=Math.round(Math.random()*(rhymePairs.length-1));
        const rhyme=rhymePairs[num].childNodes[0].textContent;
        const root=rhymePairs[num].childNodes[1].textContent;
        rhymePairs[num].remove();

        //find out which lane it belongs to, append it to right lane
        const rhymeLanes=document.getElementsByClassName('rhymeLane');
        for (var i=0;i<rhymeLanes.length;i++){
            if (rhymeLanes[i].childNodes[0].textContent===root){
                var freq=parseInt(rhymeLanes[i].childNodes[1].textContent,10)-1;
                rhymeLanes[i].childNodes[1].textContent=freq;
                const runningWord=document.createElement('div');
                runningWord.textContent=rhyme;
                runningWord.classList.add('runningWord');
                rhymeLanes[i].appendChild(runningWord);

                //adding lane color to word
                var laneColor="";
                if (rhymeLanes[i].classList.contains('redLane')){
                    laneColor='redLane';
                }else if (rhymeLanes[i].classList.contains('blueLane')){
                    laneColor='blueLane';
                }else if (rhymeLanes[i].classList.contains('greenLane')){
                    laneColor='greenLane';
                }
                runningWord.classList.add(laneColor);
                runningWord.setAttribute('laneColor',laneColor);
                break;
            }
        }
    },
    moveWords(){
        if (gameFunctionality.isWordsMoving){
            return;
        }else{
            gameFunctionality.isWordsMoving=true;
        }

        gameFunctionality.moveIntervalCode=setInterval(()=>{
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
            //if you have emptied stack and all runningWords, reload root rhymes and stack
            const stackPairs=document.getElementsByClassName('stackPair');
            if (allRunners.length===0 && stackPairs.length===0){
                clearInterval(gameFunctionality.moveIntervalCode);
                gameFunctionality.isWordsMoving=false;
                gameFunctionality.reloadRootRhymesAndStack();
            }
        },20)
    },
    reloadRootRhymesAndStack(){
        //empty all lanes
        var lanes=document.getElementsByClassName('rhymeLane');
        while(lanes.length>0){
            lanes[0].remove();
        }

        //clear movefromstacktolane interval
        clearInterval(gameFunctionality.intervalCode);

        //load new rhymes in lanes and stack, await a bit, then start moving them move stack to lanes
        gameFunctionality.getRootRhymes();
        setTimeout(()=>{
            gameFunctionality.startWordSpawnInterval();
            gameFunctionality.moveWords();
        },3000);
    },
    startWordSpawnInterval(){
        //no delay for first word
        gameFunctionality.moveFromStackToLane();
        gameFunctionality.moveWords();

        gameFunctionality.intervalCode=setInterval(()=>{
            const num=Math.round(Math.random()*2)*1000;
            setTimeout(()=>{
                const stackPair=document.getElementsByClassName('stackPair');
                if (stackPair.length===0){
                    clearInterval(gameFunctionality.intervalCode);
                    gameFunctionality.intervalCode=0;
                    return;
                }

                gameFunctionality.moveFromStackToLane();
            },num)
        },3000)
    },
    listener(event){
        const lastWord=gameFunctionality.getLastWord();
        if (lastWord==='LOAD'){
            gameFunctionality.eraseLastWord();
            const num=Math.round(Math.random()*(verseBank.length-1));
            gameFunctionality.firstVerse=verseBank[num];
            gameFunctionality.typeFirstVerse();
        }
        if (lastWord==='GO'){
            gameFunctionality.eraseLastWord();
            gameFunctionality.startWordSpawnInterval();
        }
        const runningWords=document.getElementsByClassName('runningWord');
        for (var i=0;i<runningWords.length;i++){
            if (lastWord===runningWords[i].textContent){
                //getting color lane from running word, adding it to the word on editor
                const laneColor=runningWords[i].getAttribute('laneColor');
                const allWords=document.getElementsByClassName('flowWord');
                allWords[allWords.length-1].classList.add(laneColor);
                allWords[allWords.length-1].classList.add('bold');

                //deleting running word from HUD
                runningWords[i].remove();
            }
        }


        
    },
    loadListener(){
        window.addEventListener('keydown',gameFunctionality.listener);
    },
    resetEverything(){
        clearInterval(gameFunctionality.intervalCode);
        clearInterval(gameFunctionality.moveIntervalCode);
        window.removeEventListener("keydown",gameFunctionality.listener);
        gameFunctionality.isWordsMoving=false;
        gameFunctionality.firstVerse="";
        gameFunctionality.firstVerseChar=0;
    }
}

export default gameFunctionality