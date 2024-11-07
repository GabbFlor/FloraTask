import Style_header from '../styles/Header-style';
import logo_transparente from '../assets/Logo-transparente.png'
import { BsHouse } from "react-icons/bs";
import { BsTags } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";


const Header = () => {
    return(
        <header>
            <Style_header />

            <nav>
                <ul>
                    <li><a href="#"><img src={logo_transparente} alt="Logo transparente" className='logo-trasnparente'/> </a></li>
                    <li><a href="#" className='icon-header'><BsHouse /></a></li>
                    <li><a href="#" className='icon-header'><BsTags /></a></li>
                </ul>
            </nav>

            <section>
                <p><a href="#" className='icon-header-profile'><BsPersonCircle /></a></p>
            </section>
        </header>
    )
}

export default Header