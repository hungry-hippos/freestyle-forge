import React from 'react'
import freestyleForgeLogo from '../images/sidewaysGold.PNG'
import {Button} from 'react-bootstrap'
import './Navbar.css'

const Navbar=(props)=>{
    const [setShowHome,setShowLab]=props.setters;

    const changeSite=(key)=>{
        setShowHome(false);
        setShowLab(false);

        switch(key){
            case 'home':
                setShowHome(true);
                break;
            case 'lab':
                setShowLab(true);
                break;
            default:
                break;
        }
    }
    return <div id='navbar'>
        <img src={freestyleForgeLogo} alt='' id='navbarLogo'/>
        <div id='navbarBtns'>
            <Button variant='outline-light' onClick={()=>{changeSite('home')}}>Home</Button>
            <Button variant='outline-light'>Fluid Flow</Button>
            <Button variant='outline-light' onClick={()=>{changeSite('lab')}}>Word Lab</Button>
        </div>
    </div>
}

export default Navbar