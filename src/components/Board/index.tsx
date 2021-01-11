import React, { FC, useCallback, useEffect, useState } from 'react';

import { Button, Container, GridList, GridListTile } from '@material-ui/core';

const Board: FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [size] = useState(5);
    const [direction, setDirection] = useState('');
    const [end, setEnd] = useState(false);
    const [max, setMax] = useState(0);

    const isTableFull = useCallback(
        (newBoard: number[][]) => {
            let isFull = true;
            for (let i = 0; i < size; ++i) {
                for (let j = 0; j < size; ++j) {
                    if (newBoard[i][j] === 0) isFull = false;
                    if (newBoard[i][j] > max) setMax(newBoard[i][j]);
                }
            }
            return isFull;
        },
        [size, max]
    );

    const isGameEnd = useCallback(
        (newBoard: number[][]) => {
            for (let i = 0; i < size; ++i) {
                for (let j = 0; j < size; ++j) {
                    if (newBoard[i][j] === 0) return false;

                    let curr;

                    if (i !== 0) {
                        curr = newBoard[i][j] === newBoard[i - 1][j];
                        if (curr) return false;
                    }
                    if (i !== size - 1) {
                        curr = newBoard[i][j] === newBoard[i + 1][j];
                        if (curr) return false;
                    }
                    if (j !== 0) {
                        curr = newBoard[i][j] === newBoard[i][j - 1];
                        if (curr) return false;
                    }
                    if (j !== size - 1) {
                        curr = newBoard[i][j] === newBoard[i][j + 1];
                        if (curr) return false;
                    }
                }
            }
            return true;
        },
        [size]
    );

    /* eslint-disable */
    const generateNums = useCallback(
        (count: number, newBoard: number[][]) => {
            const isFull = isTableFull(newBoard);
            if (isFull) return;
            let isEnd = isGameEnd(newBoard);
            if (!isEnd) {
                let i = 0;
                while (i < count && !isEnd) {
                    const r = Math.floor(Math.random() * size);
                    const c = Math.floor(Math.random() * size);
                    if (newBoard[r][c] === 0) {
                        const rand = Math.random();
                        let value = 2;

                        if (max > 32) {
                            if (rand > 0.75) value = 4;
                        }

                        newBoard[r][c] = value;
                        i += 1;
                        isEnd = isGameEnd(newBoard);
                    }
                }
            }

            setEnd(isEnd);
        },
        [size, isGameEnd, isTableFull, max]
    );
    /* eslint-enable */

    const resetGame = useCallback(() => {
        const newBoard: number[][] = [];

        for (let i = 0; i < size; ++i) {
            newBoard[i] = [];
            for (let j = 0; j < size; ++j) {
                newBoard[i][j] = 0;
            }
        }
        generateNums(2, newBoard);

        setBoard(newBoard);
    }, [generateNums, size]);

    const moveRight = useCallback(() => {
        setBoard((prevBoard) => {
            let moved = false;
            const tempBoard = prevBoard;
            for (let i = 0; i < tempBoard.length; ++i) {
                let slow = tempBoard[0].length - 1;
                let fast = slow;

                while (fast >= 0) {
                    if (tempBoard[i][fast] !== 0) {
                        if (slow !== fast) {
                            const temp = tempBoard[i][slow];
                            tempBoard[i][slow] = tempBoard[i][fast];
                            tempBoard[i][fast] = temp;
                            moved = true;
                        }
                        slow -= 1;
                    }
                    fast -= 1;
                }
                for (let j = tempBoard[0].length - 1; j > 0; --j) {
                    if (tempBoard[i][j] === 0) break;
                    if (tempBoard[i][j] === tempBoard[i][j - 1]) {
                        tempBoard[i][j] += tempBoard[i][j - 1];
                        tempBoard[i][j - 1] = 0;
                        moved = true;
                    }
                }
            }
            if (moved) {
                generateNums(1, tempBoard);
            }
            return tempBoard;
        });
    }, [generateNums]);

    const moveLeft = useCallback(() => {
        setBoard((prevBoard) => {
            let moved = false;
            const tempBoard = prevBoard;
            for (let i = 0; i < tempBoard.length; ++i) {
                let slow = 0;
                let fast = slow;

                while (fast < tempBoard[0].length) {
                    if (tempBoard[i][fast] !== 0) {
                        if (slow !== fast) {
                            const temp = tempBoard[i][slow];
                            tempBoard[i][slow] = tempBoard[i][fast];
                            tempBoard[i][fast] = temp;
                            moved = true;
                        }
                        slow += 1;
                    }
                    fast += 1;
                }
                for (let j = 0; j < tempBoard[0].length - 1; ++j) {
                    if (tempBoard[i][j] === 0) break;
                    if (tempBoard[i][j] === tempBoard[i][j + 1]) {
                        tempBoard[i][j] += tempBoard[i][j + 1];
                        tempBoard[i][j + 1] = 0;
                        moved = true;
                    }
                }
            }
            if (moved) {
                generateNums(1, tempBoard);
            }
            return tempBoard;
        });
    }, [generateNums]);

    const moveUp = useCallback(() => {
        setBoard((prevBoard) => {
            let moved = false;
            const tempBoard = prevBoard;
            for (let j = 0; j < tempBoard[0].length; ++j) {
                let slow = 0;
                let fast = slow;

                while (fast < tempBoard.length) {
                    if (tempBoard[fast][j] !== 0) {
                        if (slow !== fast) {
                            const temp = tempBoard[slow][j];
                            tempBoard[slow][j] = tempBoard[fast][j];
                            tempBoard[fast][j] = temp;
                            moved = true;
                        }
                        slow += 1;
                    }
                    fast += 1;
                }
                for (let i = 0; i < tempBoard.length - 1; ++i) {
                    if (tempBoard[i][j] === 0) break;
                    if (tempBoard[i][j] === tempBoard[i + 1][j]) {
                        tempBoard[i][j] += tempBoard[i + 1][j];
                        tempBoard[i + 1][j] = 0;
                        moved = true;
                    }
                }
            }
            if (moved) {
                generateNums(1, tempBoard);
            }
            return tempBoard;
        });
    }, [generateNums]);

    const moveDown = useCallback(() => {
        setBoard((prevBoard) => {
            let moved = false;
            const tempBoard = prevBoard;
            for (let j = 0; j < tempBoard[0].length; ++j) {
                let slow = tempBoard.length - 1;
                let fast = slow;

                while (fast >= 0) {
                    if (tempBoard[fast][j] !== 0) {
                        if (slow !== fast) {
                            const temp = tempBoard[slow][j];
                            tempBoard[slow][j] = tempBoard[fast][j];
                            tempBoard[fast][j] = temp;
                            moved = true;
                        }
                        slow -= 1;
                    }
                    fast -= 1;
                }
                for (let i = tempBoard.length - 1; i > 0; --i) {
                    if (tempBoard[i][j] === 0) break;
                    if (tempBoard[i][j] === tempBoard[i - 1][j]) {
                        tempBoard[i][j] += tempBoard[i - 1][j];
                        tempBoard[i - 1][j] = 0;
                        moved = true;
                    }
                }
            }
            if (moved) {
                generateNums(1, tempBoard);
            }
            return tempBoard;
        });
    }, [generateNums]);

    const keyPressHandler = useCallback((e: any): void => {
        switch (e.keyCode) {
            case 37:
                setDirection('LEFT');
                break;
            case 38:
                setDirection('UP');
                break;
            case 39:
                setDirection('RIGHT');
                break;
            case 40:
                setDirection('DOWN');
                break;
            default:
                break;
        }
    }, []);

    const getColor = (val: number) => {
        switch (val) {
            case 2:
                return '#003300';
            case 4:
                return '#33cc33';
            case 8:
                return '#99ff99';
            case 16:
                return '#ffccff';
            case 32:
                return '#ff00ff';
            case 64:
                return '#660066';
            case 128:
                return '#660066';
            case 256:
                return '#993366';
            case 512:
                return '#cc0000';
            case 1024:
                return '#cc3300';
            default:
                return '';
        }
    };

    useEffect(() => {
        resetGame();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', keyPressHandler);
        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        };
    }, [end, keyPressHandler]);

    useEffect(() => {
        switch (direction) {
            case 'LEFT':
                moveLeft();
                break;
            case 'RIGHT':
                moveRight();
                break;
            case 'UP':
                moveUp();
                break;
            case 'DOWN':
                moveDown();
                break;
            default:
                break;
        }
        setDirection('');
    }, [direction, moveLeft, moveRight, moveUp, moveDown]);

    return (
        <Container>
            <Button
                style={{ width: '100%', height: '100%' }}
                variant="contained"
                color="primary"
                onClick={() => resetGame()}
            >
                开始游戏
            </Button>
            {max === 1024 ? (
                <div>u win</div>
            ) : end ? (
                <div>u lose</div>
            ) : (
                <GridList
                    style={{ width: `${85 * size}px`, padding: '8px' }}
                    cellHeight={70}
                    cols={size}
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
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        color: 'black',
                                        backgroundColor: getColor(cell)
                                    }}
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
            )}
        </Container>
    );
};

export default Board;
