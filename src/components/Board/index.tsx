import React, { FC, useState } from 'react';

import { Button, GridList, GridListTile } from '@material-ui/core';

const Board: FC = () => {
    const [board, setBoard] = useState([
        [0, 2, 4, 8],
        [2, 16, 4, 8],
        [0, 4, 2, 4]
    ]);

    const width = board && board[0].length;

    const generateNums = (size: number, count: number, newBoard: number[][]) => {
        let i = 0;

        while (i < count) {
            const r = Math.floor(Math.random() * size);
            const c = Math.floor(Math.random() * size);
            if (newBoard[r][c] === 0) {
                // eslint-disable-next-line
                newBoard[r][c] = 2;
                i += 1;
            }
        }
    };

    const resetGame = (size: number) => {
        const newBoard: number[][] = [];

        for (let i = 0; i < size; ++i) {
            newBoard[i] = [];
            for (let j = 0; j < size; ++j) {
                newBoard[i][j] = 0;
            }
        }
        generateNums(size, 2, newBoard);

        setBoard(newBoard);
    };

    return (
        <>
            <Button
                style={{ width: '100%', height: '100%' }}
                variant="contained"
                color="primary"
                onClick={() => resetGame(5)}
            >
                开始游戏
            </Button>
            <GridList
                style={{ width: `${85 * width}px`, padding: '8px' }}
                cellHeight={70}
                cols={width}
                spacing={8}
            >
                {board.map((row, i) =>
                    row.map((cell, j) => (
                        <GridListTile
                            // eslint-disable-next-line
                            key={`row${i}col${j}`}
                            rows={1}
                            cols={1}
                        >
                            <Button
                                style={{ width: '100%', height: '100%' }}
                                variant="contained"
                                color="primary"
                                disableElevation
                            >
                                {cell !== 0 ? cell : ''}
                            </Button>
                        </GridListTile>
                    ))
                )}
            </GridList>
        </>
    );
};

export default Board;
