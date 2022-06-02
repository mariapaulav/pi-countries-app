import { Link } from 'react-router-dom';
import './landingPage.css'

export default function LandingPage (){
    return (
    
    <div className='body'>
    <Link to = 'home'>
        <div className='posit'>
        <button className='btn'>Enter</button>
        </div>
    </Link>
    </div>
    )
}   