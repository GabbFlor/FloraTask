import { useState } from 'react';
import { BsLock, BsUnlock } from 'react-icons/bs';

const Form_login = () => {
    const [typePassword, setTypePassword] = useState("password");
    const [iconLock, setIconLock] = useState(<BsLock />)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleShowPassword = () => {
        if(typePassword == "password"){
            setTypePassword("text")
            setIconLock(<BsUnlock />)
        } 
        else if(typePassword == "text") {
            setTypePassword("password")
            setIconLock(<BsLock />)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (email && password != "") {
            console.log(`Email: ${email}`);
            console.log(`Senha: ${password}`);

            setEmail("");
            setPassword("");
        } else {
            console.error("Não tente mudar o site no inspecionar para enviar valores vazios!")
        }
    }

    return(
        <form action="" className='form-auth' onSubmit={handleLogin}>
            <div className='escrita-auth'>
                <h1>Login</h1>
                <p>Preencha com as suas informações.</p>
            </div>

            <div className='div-all-inputs'>
                <div className='div-input'>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder='Digite aqui...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className='div-input passw'>
                    <label htmlFor="Senha">Senha:</label>
                    <input 
                        type={typePassword}
                        name="password" 
                        placeholder='Digite aqui...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button 
                        type="button" 
                        className="showPassword"
                        onClick={() => handleShowPassword((prev) => !prev)}
                    >
                        {iconLock}
                    </button>
                </div>
            </div>
            
            <button type="submit" className='btn-form'>Entrar</button>
        </form>
    )
}

export default Form_login;