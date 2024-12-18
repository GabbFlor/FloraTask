import { createGlobalStyle } from "styled-components";

const Style_login_registro = createGlobalStyle `
    /* css para login e registro ao msm tempo */

    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    * {
        padding: 0;
        margin: 0;
    }

    .Pagina-login, .Pagina-registro {
        background-color: #F4E1DB;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        font-family: "Roboto", serif;
    }

    .section-entire-form {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: inline-flex;
    }

    .section-entire-form img {
        width: 8.5vw;
    }

    .left-form {
        background-color: #D0656B;
        padding: 30px 45px 30px 45px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 25px;
        border-radius: 10px 0 0 10px;
    }

    .left-escrita {
        display: flex;
        flex-direction: column;
        gap: 10px;
        text-align: center;
        font-weight: 400;
        color: #182e2c;
    }

    .left-escrita h1 {
        font-size: 2rem;
        font-weight: 500;
    }

    .left-form div a {
        background-color: transparent;
        padding: 5px;
        font-size: 0.95rem;
        padding: 5px 10px 5px 10px;
        outline: none;
        border: 2px solid #356660;
        color: #25403d;
        font-weight: 500;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: border 0.3s, color 0.3s, background-color 0.3s;
        text-decoration: none;
    }

    .left-form div a:hover {
        background-color: #356660;
        color: white;
        transition: border 0.3s, color 0.3s, background-color 0.3s;
    }

    .form-auth {
        background-color: #de888c;
        padding: 15px;
        padding: 30px 45px 30px 45px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 0 10px 10px 0;
    }

    .escrita-auth {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .escrita-auth h1 {
        font-size: 2rem;
        font-weight: 500;
    }

    .div-input {
        display: flex;
        flex-direction: column;
        position: relative;
        gap: 2.5px;
        min-width: 100%;
    }

    .div-input input {
        height: 35px;
        outline: none;
        border: none;
        border-radius: 5px;
        padding: 5px;
        font-size: 0.85rem;
        transition: box-shadow 0.3s ease;
    }

    .passw input {
        padding-right: 10%;
    }

    .div-input input:focus {
        box-shadow: 0px 0px 0px 2.5px #5eb483c3;
    }

    .showPassword {
        background-color: transparent;
        position: absolute;
        right: 1%;
        bottom: 15%;
        outline: none;
        border: none;
        font-size: 17.5px;
        cursor: pointer;
    }

    .btn-form {
        width: fit-content;
        background-color: transparent;
        padding: 5px;
        font-size: 0.95rem;
        padding: 5px 10px 5px 10px;
        outline: none;
        border: 2px solid #356660;
        color: #25403d;
        font-weight: 500;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: border 0.3s, color 0.3s, background-color 0.3s;
    }

    .btn-form:hover {
        background-color: #356660;
        color: white;
        transition: border 0.3s, color 0.3s, background-color 0.3s;
    }

    .div-all-inputs {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .btn-form-registro {
        margin-top: 15px;
    }

    .escrita-auth {
        margin-bottom: 10px;
    }

    .swal2-title {
        font-family: "Roboto", serif;
    }

    .swal2-html-container {
        font-family: "Roboto", serif;
    }
`

export default Style_login_registro;