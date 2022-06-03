import { Link } from 'react-router-dom';
import './landingPage.css'

export default function LandingPage (){
    return (
    
    <div className='body'>
        <div className='positB'>
    <Link to = 'home'>
        <button className='btn'>Enter</button>
    </Link>
        </div>
    </div>
    )
}   