import { createGlobalStyle } from "styled-components";

const Style_header = createGlobalStyle `
    header {
        background-color: #D0656B;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100vh;
        width: 7vw;
        border-top-right-radius: 7.5px;
        border-bottom-right-radius: 7.5px;
    }

    header nav ul, header nav ul a {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    header nav ul a, .icon-header-profile {
        color: black;
    }

    header nav ul {
        gap: 20px;
    }

    .logo-trasnparente {
        width: 75%;
    }

    .icon-header {
        font-size: 30px;
    }

    .icon-header-profile {
        font-size: 50px;
    }
`

export default Style_header;