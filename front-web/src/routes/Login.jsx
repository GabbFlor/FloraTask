import Form_login from "../components/Form_login";
import Logo from "../assets/Logo_circular.png"
import { Link } from "react-router-dom";
import Style_login_registro from "../styles/Login-registro";

const Login = () => {
    return (
        <div className="Pagina-login">
            <Style_login_registro />
            <section className="section-entire-form">
                <section className="left-form">
                    <img src={Logo} alt="Logo-Flora-Task" />

                    <div className="left-escrita">
                        <h1>Bem vindo a <br /> FloraTask!</h1>

                        <p>Não tem uma conta? <br /> Crie agora mesmo!</p>
                    </div>

                    <div>
                        <Link to="/auth/registro">Criar conta!</Link>
                    </div>
                </section>

                <Form_login />
            </section>
        </div>
    )
}

export default Login;