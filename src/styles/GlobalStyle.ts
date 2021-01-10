/*
 * @Author: Lang Cheng
 * @Date: 2021-01-10 19:14:16
 * @LastEditTime: 2021-01-10 20:18:05
 * @LastEditors: Lang Cheng
 * @Description: GlobalStyle
 * @FilePath: \2048\src\styles\GlobalStyle.ts
 */

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
  }
`;

export default GlobalStyle;
