import Style_header from '../styles/Header-style';
import logo_transparente from '../assets/Logo-transparente.png'
import { BsHouse } from "react-icons/bs";
import { BsTags } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';


const Header = () => {
    return(
        <header>
            <Style_header />

            <nav>
                <ul>
                    <li><a href="#"><img src={logo_transparente} alt="Logo transparente" className='logo-trasnparente'/> </a></li>
                    <li><a href="/" className='icon-header' title='Home'><BsHouse /></a></li>
                    <li><a href="/tags" className='icon-header' title='Tags'><BsTags /></a></li>
                </ul>
            </nav>

            <section>
                <p><Link to="/auth/login" className='icon-header-profile' title='Perfil'><BsPersonCircle /></Link></p>
            </section>
        </header>
    )
}

export default Header