import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsLock, BsUnlock } from 'react-icons/bs';
import Swal from 'sweetalert2';

const Form_registro = () => {
    const [typePassword, setTypePassword] = useState("password");
    const [iconLock, setIconLock] = useState(<BsLock />);
    const [typePasswordConfirm, setTypePasswordConfirm] = useState("password");
    const [iconLockConfirm, setIconLockConfirm] = useState(<BsLock />);

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [verificPassword, setVerificPassword] = useState(null);
    let role = "USER";

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

    const handleShowPasswordConfirm = () => {
        if(typePasswordConfirm == "password"){
            setTypePasswordConfirm("text")
            setIconLockConfirm(<BsUnlock />)
        } 
        else if(typePasswordConfirm == "text") {
            setTypePasswordConfirm("password")
            setIconLockConfirm(<BsLock />)
        }
    }

    useEffect(() => {
        if (password == "" && passwordConfirm == "") {
            setVerificPassword(null)
        } else if(password == passwordConfirm && password !== "" && passwordConfirm !== "") {
            setVerificPassword(true)
        } else (
            setVerificPassword(false)
        );
    }, [password, passwordConfirm]);

    const handleRegistro = (e) => {
        e.preventDefault();

        if (email && password != "") {
            axios.post('http://localhost:8080/auth/registro', {
                email: email,
                nome: nome,
                password: password,
                role: role
            })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: `Bem vindo ${nome}`,
                        timer: 1500,
                        customClass: {
                            title: "title_swal",
                            text: "text_swal"
                        }
                    })
                    .then(() => {
                        const token = response.data.token;

                        localStorage.setItem("token", token);

                        window.location.href = '/'
                    })
                }
            }).catch(error => {
                if(error.response && error.response.status === 409) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: `Esse email já está sendo utilizado.`,
                        timer: 1500
                    })

                    setNome("")
                    setEmail("")
                    setPassword("")
                    setPasswordConfirm("")
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: `Erro interno no servidor: ${error.message}`,
                        timer: 1500
                    })
                }
            })

            setNome("")
            setEmail("");
            setPassword("");
            setPasswordConfirm("");
        } else {
            console.error("Não tente mudar o site no inspecionar para enviar valores vazios!")
        }
    }

    return (
        <form action="" className='form-auth' onSubmit={handleRegistro}>
            <div className='escrita-auth'>
                <h1>Registro</h1>
                <p>Preencha com as suas informações.</p>
            </div>

            <div className='div-all-inputs'>
                <div className='div-input'>
                    <label htmlFor="nome">Nome:</label>
                    <input 
                        type="text" 
                        name="nome" 
                        placeholder='Digite aqui...'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

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

                <div className='div-input passw'>
                    <label htmlFor="Senha">Confirme a senha:</label>
                    <input 
                        type={typePasswordConfirm}
                        name="password" 
                        placeholder='Digite aqui...'
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                    <button 
                        type="button" 
                        className="showPassword"
                        onClick={() => handleShowPasswordConfirm((prev) => !prev)}
                    >
                        {iconLockConfirm}
                    </button>
                </div>

                {verificPassword == true ? (
                    <label htmlFor="verificação" style={{color: "blue"}}>As senhas coincidem</label>
                ) : verificPassword == false ? (
                    <label htmlFor="verificação" style={{color: "#750101"}}>As senhas não coincidem</label>
                ) : ""}
            </div>
            
            <button 
                type="submit" 
                className='btn-form btn-form-registro'
                disabled={verificPassword == false}
            >Criar conta</button>
        </form>
    )
}

export default Form_registro;