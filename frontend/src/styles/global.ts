import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Lato', sans-serif; 
        
    }
    
    #root{
        margin:0 auto;
    }

    a {
        text-decoration: none;
        color: #fff;
    }
    `;
