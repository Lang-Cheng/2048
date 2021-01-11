import React from 'react';

import { render } from 'react-dom';

import Board from './components/Board';
import { GlobalStyle } from './styles/GlobalStyle';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Board />
        </>
    );
};

render(<App />, mainElement);
