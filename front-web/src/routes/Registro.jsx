import Logo from "../assets/Logo_circular.png"
import Form_registro from "../components/Form_registro";
import { Link } from "react-router-dom";
import Style_login_registro from "../styles/Login-registro";

const Registro = () => {
    return(
        <div className="Pagina-registro">
            <Style_login_registro />
            <section className="section-entire-form">
                <section className="left-form">
                    <img src={Logo} alt="Logo-Flora-Task" />

                    <div className="left-escrita">
                        <h1>Bem vindo a <br /> FloraTask!</h1>

                        <p>Já tem uma conta? <br /> Entre agora mesmo!</p>
                    </div>

                    <div>
                        <Link to="/auth/login">Entrar!</Link>
                    </div>
                </section>

                <Form_registro />
            </section>
        </div>
    )
}

export default Registro;