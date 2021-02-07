import React from 'react'
import freestyleForgeLogo from '../images/sidewaysGold.PNG'
import {Button} from 'react-bootstrap'
import './Navbar.css'

const Navbar=(props)=>{
    const [setShowHome,setShowLab,setShowFlow]=props.setters;

    const changeSite=(key)=>{
        setShowHome(false);
        setShowLab(false);
        setShowFlow(false);

        //removes focus from navbar btns such that spacebar and enter wont trigger click events
        const btns=document.getElementsByClassName('navbarBtn');
        for (var i=0;i<btns.length;i++){
            btns[i].blur();
        }

        switch(key){
            case 'home':
                setShowHome(true);
                break;
            case 'lab':
                setShowLab(true);
                break;
            case 'flow':
                setShowFlow(true);
                break;
            default:
                break;
        }
    }
    return <div id='navbar'>
        <img src={freestyleForgeLogo} alt='' id='navbarLogo'/>
        <div id='navbarBtns'>
            <Button variant='outline-light' className='navbarBtn' onClick={()=>{changeSite('home')}}>Home</Button>
            <Button variant='outline-light' className='navbarBtn' onClick={()=>{changeSite('flow')}}>Fluid Flow</Button>
            <Button variant='outline-light' className='navbarBtn' onClick={()=>{changeSite('lab')}}>Word Lab</Button>
        </div>
    </div>
}

export default Navbar