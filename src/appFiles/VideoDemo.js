import React from 'react'
import fluidFlowDemo from '../videos/fluidFlowDemo.mp4'
import wordLabDemo from '../videos/wordLabDemo.mp4'
import {FaRegWindowClose} from 'react-icons/fa'
import './VideoDemo.css'



const VideoDemo=(props)=>{
    var videoName="";
    switch(props.videoName){
      case "fluidFlow":
        videoName=fluidFlowDemo;
        break;
      case "wordLab":
        videoName=wordLabDemo;
        break;
      default:
        break;
    }

    const removeDemo=()=>{
        document.getElementById('tutorialBackgroundDimmer').remove();
        document.getElementById('tutorialDiv').remove();
    }
  
    return <React.Fragment>
      <div id='tutorialBackgroundDimmer'></div>
      <div id='tutorialDiv'>
        <div id='tutorialHeader'>
            TUTORIAL
            <FaRegWindowClose id='closeTutorial' onClick={removeDemo}/>
        </div>
        <div id="videoDemo">
          <video width="600" height="275" controls autoPlay muted>
            <source src={videoName} type="video/mp4"/>
            </video>
        </div>
    </div>
    </React.Fragment>
  
  }

export default VideoDemo