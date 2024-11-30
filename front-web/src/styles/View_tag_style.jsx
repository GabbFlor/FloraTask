import { createGlobalStyle } from "styled-components";

const View_tag_style = createGlobalStyle `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    .Pagina_view_tag, .Pagina-edit-tag {
        font-family: "Roboto", serif;
        background-color: #F4E1DB;
        width: 100vw;
        height: 100vh;
    }

    main {
        font-family: "Roboto", serif;
        padding: 25px 100px 0 12vw;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    form {
        background-color: white;
        width: 20vw;
        padding: 25px;
        font-family: "Roboto", serif;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 7.5px;
        outline: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 90vh;
        overflow-y: auto;
        gap: 15px;
    }

    form::-webkit-scrollbar {
        width: 7.5px;
        height: 7.5px;
    }

    form::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 10px;
    }

    form::-webkit-scrollbar-track {
        background-color: transparent;
    }

    form h2 {
        text-align: center;
    }

    form div:not(.div-buttons) {
        display: flex;
        flex-direction: column;
    }

    .div-buttons {
        display: inline-flex;
        gap: 5px;
        justify-content: flex-end;
    }

    form input, form textarea {
        background-color: #D5D5D5;
        border: none;
        outline: none;
        padding: 7.5px;
        border-radius: 5px;
        color: black;
    }

    form textarea {
        resize: none;
        overflow: auto;
        height: 15vh;
        font-size: 15px;
    }

    .btn {
        background-color: transparent;
        padding: 5px 10px;
        font-size: 15px;
        font-weight: 400;
        cursor: pointer;
        border-radius: 5px;
        transition: border 0.3s, color 0.3s, background-color 0.3s;
    }

    .btn:hover {
        color: white;
        transition: border 0.3s, color 0.3s, background-color 0.3s;
    }

    .voltar-tag {
        border: 2.5px solid #AE0003;
        color: #790002;
        text-decoration: none;
    }

    .voltar-tag:hover {
        border: 2.5px solid #c30003;
        background-color: #c80003;
    }

    .editar-tag {
        border: 2.5px solid #007397;
        color: #007397;
        text-decoration: none;
    }

    .editar-tag:hover {
        border: 2.5px solid #0181a8;
        background-color: #008ab4;
    }

    .color-tag-background {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        padding: 7.5px;
        border-radius: 5px;
        background-color: #D5D5D5;
    }

    .color-tag {
        margin: 2.5%;
        height: 30px;
        width: 30px;
        border-radius: 5px;
    }

    .input-color {
        height: 50px;
    }

    .title_swal {
        font-family: "Roboto", serif;
    }

    .text_swal {
        font-family: "Roboto", serif;
    }
`

export default View_tag_style;