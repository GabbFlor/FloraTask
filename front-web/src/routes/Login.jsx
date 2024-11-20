import Form_login from "../components/Form_login";
import Logo from "../assets/Logo_circular.png"
import '../styles/teste.css'

const Login = () => {
    return (
        <div className="Pagina-login">
            <section className="section-entire-form">
                <section className="left-form">
                    <img src={Logo} alt="Logo-Flora-Task" />

                    <div className="left-escrita">
                        <h1>Bem vindo a <br /> FloraTask!</h1>

                        <p>Não tem uma conta? <br /> Crie agora mesmo!</p>
                    </div>

                    <div>
                        <button type="button">Criar conta!</button>
                    </div>
                </section>

                <Form_login />
            </section>
        </div>
    )
}

export default Login;