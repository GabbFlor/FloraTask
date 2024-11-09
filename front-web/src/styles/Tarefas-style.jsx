import { createGlobalStyle } from "styled-components";

const Style_tarefas = createGlobalStyle `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    .Pagina-Tarefas {
        display: inline-flex;
        background-color: #F4E1DB;
        width: 100vw;
    }

    main {
        width: 100%;
        font-family: "Roboto", serif;
        padding: 25px 100px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .cima {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .Escrita-btn-add {
        display: inline-flex;
        width: 100%;
        justify-content: space-between;
    }

    .Escrita-btn-add h1 {
        font-size: 40px;
        font-weight: 400;
        color: #D74951;
    }

    .btn {
        border: none;
        background-color: transparent;
        padding: 0px 15px;
        font-size: 17.5px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 5px;
    }

    .add {
        background-color: #D0656B;
        color: white;
        transition: background-color 0.3s;
    }

    .add:hover {
        background-color: #e27a7f;
        transition: background-color 0.3s;
    }

    .Search-section {
        display: inline-flex;
        /* background-color: red; */
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }

    .search-div {
        /* background-color: blue; */
        width: 90%;
        position: relative;
    }

    .search-div input {
        width: 100%;
        height: 25px;
        outline: none;
        padding: 5px;
        background-color: #D9CAC6;
        border: none;
        border-radius: 7.5px;
        font-size: 15px;
    }

    .search-div button {
        position: absolute;
        background-color: transparent;
        border: none;
        outline: none;
        top: 25%;
        right: 0;
        font-size: 17.5px;
        cursor: pointer;
    }

    .filter-div {
        color: #D74951;
        display: inline-flex;
        font-size: 17.5px;
        width: 7.5%;
        cursor: pointer;
        justify-content: flex-end;

    }

    .filter-div p:hover {
        text-decoration: underline;
    }

    .container-box-tabs {
        padding: 17px;
        position: relative;
        overflow-x: hidden;
        overflow-y: scroll;
        min-height: 50vh;
    }

    .table-tarefas {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 10px;
    }

    .table-tarefas thead tr th {
        padding: 5px 0;
    }

    .table-tarefas tbody tr td {
        padding: 0px 0;
    }

    .table-tarefas tbody tr td {
        text-align: center;
        height: 50px;
    }

    .chekbox-line-table {
        transform: scale(1.5);
        margin: 5px;
    }

    .table-tarefas tbody tr td nav {
        display: inline-flex;
        gap: 5px;
    }

    .btn-style-table {
        padding: 5px 10px;
        transition: border 0.3s, color 0.3s, background-color 0.3s;
        font-size: 15px;
        font-weight: 400;
    }

    .btn-style-table:hover {
        transition: border 0.3s, color 0.3s, background-color 0.3s;
    }

    .concluir {
        border: 2.5px solid #008e4e;
        color: #007942;
    }

    .concluir:hover {
        border: 2.5px solid #00b061;
        color: white;
        background-color: #00b061;
    }

    .deletar {
        border: 2.5px solid #AE0003;
        color: #790002;
    }

    .deletar:hover {
        border: 2.5px solid #c30003;
        color: white;
        background-color: #c80003;
    }

    .editar {
        border: 2.5px solid #007397;
        color: #007397;
    }

    .editar:hover {
        border: 2.5px solid #0181a8;
        color: white;
        background-color: #008ab4;
    }

    .visualizar {
        border: 2.5px solid #9F8500;
        color: #9F8500;
    }

    .visualizar:hover {
        border: 2.5px solid #c2a100;
        color: white;
        background-color: #c2a100;
    }

    .container-box-tabs::-webkit-scrollbar {
        width: 7.5px;
        height: 7.5px;
    }

    .container-box-tabs::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 10px;
    }

    .container-box-tabs::-webkit-scrollbar-track {
        background-color: transparent;
    }
`

export default Style_tarefas;