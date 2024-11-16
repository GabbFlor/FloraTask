import { createGlobalStyle } from "styled-components";

const Style_pop_up_tarefa = createGlobalStyle `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    .custom-style-form-pop-up {
        background-color: white;
        width: fit-content;
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
    }

    .custom-style-form-pop-up::-webkit-scrollbar {
        width: 7.5px;
        height: 7.5px;
    }

    .custom-style-form-pop-up::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 10px;
    }

    .custom-style-form-pop-up::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .custom-style-form-pop-up h2 {
        text-align: center;
    }

    .custom-style-form-pop-up form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 27.5vw;
    }

    .add-tags form {
        width: 20vw !important;
    }

    .custom-style-form-pop-up form div:not(.div-buttons) {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .custom-style-form-pop-up form div textarea {
        resize: none;
        height: 110px;
        background-color: #D5D5D5;
        border: none;
        outline: none;
        padding: 7.5px;
        border-radius: 5px;
        font-family: "Roboto", serif;
    }

    .custom-style-form-pop-up form div input:not(.img), .custom-style-form-pop-up form div select {
        background-color: #D5D5D5;
        border: none;
        outline: none;
        padding: 7.5px;
        border-radius: 5px;
        color: black;
    }
    
    .custom-style-form-pop-up form div select {
        cursor: pointer;
    }

    .div-buttons {
        display: inline-flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .custom-style-form-pop-up form div input::placeholder, .custom-style-form-pop-up form div textarea::placeholder {
        color: #5B5B5B;
    }

    .ReactModal__Overlay--after-open {
        background-color: rgba(0, 0, 0, 0.225) !important;
        backdrop-filter: blur(5px) !important;
    }

    .div-tags {
    /* background-color: blue; */
    position: relative;
    }

    .button-dropdown {
        position: relative;
        height: 32.5px;
        font-size: 13px;
        color: black;
        background-color: #D5D5D5;
        border: none;
        border-radius: 5px;
        display: inline-flex;
        align-items: center;
        padding-left: 7.5px;
        padding-right: 7.5px;
        justify-content: space-between;
        cursor: pointer;
    }

    .dropdown-menu {
        background-color: #D5D5D5;
        position: absolute;
        width: 100%;
        top: 100%;
        border-top: 1px solid rgb(124, 124, 124);
    }

    .dropdown-line {
        height: 32.5px;
        font-size: 13px;
        cursor: pointer;
        border-bottom: 1px solid rgb(124, 124, 124);
        display: flex !important;
        flex-direction: row !important;
        align-items: center;
        justify-content: flex-start;
        padding-left: 7.5px;
        padding-right: 7.5px;
    }

    .tag-color {
        height: 17.5px;
        width: 17.5px;
        border-radius: 5px;
    }

    .prazo {
        font-family: "Roboto", serif;
        font-size: 13px;
    }
`

export default Style_pop_up_tarefa;