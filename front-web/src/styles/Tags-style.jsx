import { createGlobalStyle } from "styled-components";

const Tags_style = createGlobalStyle `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    .Pagina-Tags {
        display: inline-flex;
        background-color: #F4E1DB;
        width: 100vw;
        height: 100vh;
    }

    main {
        width: 100%;
        font-family: "Roboto", serif;
        padding: 25px 100px 0 12vw;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .section-cima {
        display: inline-flex;
        justify-content: space-between;
    }

    .title {
        font-family: "Roboto", serif;
        font-size: 40px;
        font-weight: 400;
        color: #D74951;
    }

    .add {
        background-color: #D0656B !important;
        color: white !important;
        border: none !important;
        font-weight: 600 !important;
        font-size: 17.5px !important;
        padding: 0px 15px !important;
    }

    .add:hover {
        background-color: #E27A7F !important;
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

    .color-tag {
        background-color: transparent;
        border: none;
        outline: none;
        height: 30px;
        width: 30px;
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

    .delete {
        border: 2.5px solid #AE0003;
        color: #790002;
    }
    
    .delete-tag {
        border: 2.5px solid #AE0003;
        color: #790002;
    }

    .delete:hover {
        border: 2.5px solid #c30003;
        background-color: #c80003;
    }

    .delete-tag:hover {
        border: 2.5px solid #c30003;
        background-color: #c80003;
    }

    .editar {
        border: 2.5px solid #007397;
        color: #007397;
    }

    .editar:hover {
        border: 2.5px solid #0181a8;
        background-color: #008ab4;
    }

    .enviar-tag {
        border: 2.5px solid #008e4e;
        color: #007942;
    }

    .enviar-tag:hover {
        border: 2.5px solid #00b061;
        background-color: #00b061;
    }
    
    .tag-color {
        height: 20px;
        width: 20px;
        border-radius: 5px;
        margin: auto;
    }
`

export default Tags_style;