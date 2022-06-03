import mainImage from "../../img/text.png"
import './header.css'

export default function Header(){
    return (
        <div className="header">
            <img src={`${mainImage}`} alt="not found"  width= '300px' height= '20px'/>
        </div>

    )
}