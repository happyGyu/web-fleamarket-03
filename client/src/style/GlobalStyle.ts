import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import colors from '@constants/colors';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  button{
    margin:0;
    padding:0;
    border:none;
    background-color:inherit;
    border-radius: inherit;
    cursor:pointer;
  }
  input{
    border:none;
    border-radius:inherit;
    margin:0;
    padding:0;
    :focus-visible{
      outline:none;
    }
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
  textarea{
    margin:0;
    padding:0;
    border:none;
    height:auto;
    max-width:100%;
    background-color:inherit;
    border-radius:inherit;
    color:inherit;
    :focus-visible{
      outline:none;
    }
  }
  a{
    color:inherit;
    text-decoration:none;
  }
  body{
    background-color: ${colors.offWhite};
    color: ${colors.black};
  }
`;

export default GlobalStyle;
