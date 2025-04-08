'use client';

import React, { useEffect, useState } from 'react';
// import { happy, sad } from "./emoji";
import styles from './MathGame.module.css';
import { Emoji } from './emoji';

type Operation = 'addition' | 'subtraction' | 'multiplication';

export default function MathGame() {
  // Game state
  const [errorTxt, setErrorTxt] = useState('');
  const [operation, setOperation] = useState<Operation>('multiplication');
  const [grid, setGrid] = useState<number[][]>([
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 6, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 8, 12, 16, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 10, 15, 20, 25, -1, -1, -1, -1, -1, -1, -1],
    [-1, 12, 18, 24, 30, 36, -1, -1, -1, -1, -1, -1],
    [-1, 14, 21, 28, 35, 42, 49, -1, -1, -1, -1, -1],
    [-1, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1],
    [-1, 18, 27, 36, 45, 54, 63, 72, 81, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 121, -1],
    [-1, 24, 36, 48, 60, 72, 84, 96, 108, -1, 132, 144],
  ]);

  const [randomGrid, setRandomGrid] = useState<[number, number][]>([]);
  const [randomGridI, setRandomGridI] = useState(-1);
  const [lines, setLines] = useState<string[]>([]);
  const [correct, setCorrect] = useState<Record<number, boolean>>({});
  const [prize, setPrize] = useState<Record<number, number>>({});
  const [shouldBe, setShouldBe] = useState<Record<number, number>>({});
  const [currentAnswer, setCurrentAnswer] = useState(-1);
  const [shouldBe2, setShouldBe2] = useState(-1);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);

  // Initialize game
  useEffect(() => {
    newGrid();
    setNew();
  }, [operation]);

  // Update grid based on operation
  useEffect(() => {
    switch (operation) {
      case 'addition':
        setGrid([
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, 6, 8, 10, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, 7, 10, 13, 16, -1, -1, -1, -1, -1, -1, -1],
          [-1, 8, 12, 16, 20, 24, -1, -1, -1, -1, -1, -1],
          [-1, 9, 14, 19, 24, 29, 34, -1, -1, -1, -1, -1],
          [-1, 10, 16, 22, 28, 34, 40, 46, -1, -1, -1, -1],
          [-1, 11, 18, 25, 32, 39, 46, 53, 60, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 65, -1],
          [-1, 24, 36, 48, 60, 72, 84, 96, 108, -1, 120, 132],
        ]);
        break;
      case 'subtraction':
        setGrid([
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, 3, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, 4, 2, 0, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, 5, 4, 3, 2, -1, -1, -1, -1, -1, -1, -1],
          [-1, 6, 6, 6, 6, 6, -1, -1, -1, -1, -1, -1],
          [-1, 7, 8, 9, 10, 11, 12, -1, -1, -1, -1, -1],
          [-1, 8, 10, 12, 14, 16, 18, 20, -1, -1, -1, -1],
          [-1, 9, 12, 15, 18, 21, 24, 27, 30, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, -1],
          [-1, 12, 24, 36, 48, 60, 72, 84, 96, -1, 108, 120],
        ]);
        break;
      case 'multiplication':
        setGrid([
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, 6, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, 8, 12, 16, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, 10, 15, 20, 25, -1, -1, -1, -1, -1, -1, -1],
          [-1, 12, 18, 24, 30, 36, -1, -1, -1, -1, -1, -1],
          [-1, 14, 21, 28, 35, 42, 49, -1, -1, -1, -1, -1],
          [-1, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1],
          [-1, 18, 27, 36, 45, 54, 63, 72, 81, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 121, -1],
          [-1, 24, 36, 48, 60, 72, 84, 96, 108, -1, 132, 144],
        ]);
        break;
    }
  }, [operation]);

  function checkAnswer(answer: number) {
    setCurrentAnswer(answer);

    let isCorrect = false;
    switch (operation) {
      case 'addition':
        isCorrect = left + right === answer;
        break;
      case 'subtraction':
        isCorrect = left - right === answer;
        break;
      case 'multiplication':
        isCorrect = left * right === answer;
        break;
    }

    if (isCorrect) {
      const len = lines.length;
      setCorrect((prev) => ({ ...prev, [len]: isCorrect }));

      if (!correct[len]) {
        let correctAnswer = 0;
        switch (operation) {
          case 'addition':
            correctAnswer = left + right;
            break;
          case 'subtraction':
            correctAnswer = left - right;
            break;
          case 'multiplication':
            correctAnswer = left * right;
            break;
        }
        setShouldBe((prev) => ({ ...prev, [len]: correctAnswer }));
      }

      setPrize((prev) => ({
        ...prev,
        [len]: Math.floor(Math.random() * 10000),
      }));

      let operator = '';
      switch (operation) {
        case 'addition':
          operator = '+';
          break;
        case 'subtraction':
          operator = '-';
          break;
        case 'multiplication':
          operator = '×';
          break;
      }

      setLines((prev) => [...prev, `${left} ${operator} ${right} = ${answer}`]);
      setNew();
      setShouldBe2(-1);
    } else {
      let correctAnswer = 0;
      switch (operation) {
        case 'addition':
          correctAnswer = left + right;
          break;
        case 'subtraction':
          correctAnswer = left - right;
          break;
        case 'multiplication':
          correctAnswer = left * right;
          break;
      }
      setShouldBe2(correctAnswer);
    }
  }

  function setNew() {
    setRandomGridI((prev) => {
      const newIndex = prev + 1;
      if (newIndex > randomGrid.length) {
        newGrid();
        return 0;
      }
      return newIndex;
    });

    if (randomGrid[randomGridI]) {
      const [newLeft, newRight] = randomGrid[randomGridI];
      setLeft(newLeft);
      setRight(newRight);
    }
  }

  function newGrid() {
    const max = grid[0].length;
    const newRandomGrid: [number, number][] = [];

    for (let i = 0; i < max; i++) {
      for (let j = 0; j < max; j++) {
        if (grid[i][j] !== -1) {
          newRandomGrid.push([i + 1, j + 1]);
        }
      }
    }

    setRandomGrid(shuffle(newRandomGrid));
    setRandomGridI(0);
  }

  function shuffle(a: [number, number][]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startOver() {
    newGrid();
    setNew();
    setLines([]);
    setCorrect({});
    setPrize({});
    setShouldBe({});
    setCurrentAnswer(-1);
    setShouldBe2(-1);
  }

  function Line({ line, index }: { line: string; index: number }) {
    return (
      <h1 key={'line' + index}>
        {line}&nbsp;
        {correct.hasOwnProperty(index) ? (
          correct[index] ? (
            <>
              <span style={{ color: 'green', fontSize: '18px' }}>Correct</span>
              &nbsp;
              <span style={{ fontSize: '60px' }}>
                {Emoji.happy[(prize[index] % Emoji.happy.length) - 1]}
              </span>
            </>
          ) : (
            <>
              <span style={{ color: 'red', fontSize: '18px' }}>
                The correct answer is {shouldBe[index]}
              </span>
              &nbsp;
              <span style={{ fontSize: '60px' }}>
                {Emoji.sad[(prize[index] % Emoji.happy.length) - 1]}
              </span>
            </>
          )
        ) : (
          ''
        )}
      </h1>
    );
  }

  function Button({ text, onClick }: { text: string; onClick: () => void }) {
    return (
      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        {text}
      </button>
    );
  }

  function OperationButton({
    op,
    currentOp,
    onClick,
  }: {
    op: Operation;
    currentOp: Operation;
    onClick: () => void;
  }) {
    const text = {
      addition: 'Addition (+)',
      subtraction: 'Subtraction (-)',
      multiplication: 'Multiplication (×)',
    }[op];

    return (
      <button
        onClick={onClick}
        className={`py-2 px-4 border rounded mr-2 ${
          op === currentOp
            ? 'bg-blue-500 text-white border-blue-700'
            : 'bg-gray-200 text-gray-800 border-gray-300'
        }`}
      >
        {text}
      </button>
    );
  }

  const percent = Math.floor((randomGridI / randomGrid.length) * 100);
  const linesRendered = [...lines]
    .reverse()
    .map((line, i) => (
      <Line key={i} line={line} index={lines.length - 1 - i} />
    ));

  const operator = {
    addition: '+',
    subtraction: '-',
    multiplication: '×',
  }[operation];

  return (
    <div className={styles.container}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Select Operation:</h1>
        <div className="flex">
          <OperationButton
            op="addition"
            currentOp={operation}
            onClick={() => setOperation('addition')}
          />
          <OperationButton
            op="subtraction"
            currentOp={operation}
            onClick={() => setOperation('subtraction')}
          />
          <OperationButton
            op="multiplication"
            currentOp={operation}
            onClick={() => setOperation('multiplication')}
          />
        </div>
      </div>

      <span style={{ color: '#999' }}>Progress</span>
      <div
        style={{
          height: '40px',
          background: 'whitesmoke',
          width: '100%',
          boxShadow: '1px 1px 1px rgba(0,0,0,.2)',
        }}
      >
        <div
          style={{
            height: '40px',
            background: 'green',
            width: `${percent}%`,
            textAlign: 'center',
            color: 'white',
            lineHeight: '40px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {percent}%
        </div>
      </div>

      {randomGridI < randomGrid.length ? (
        <h1>
          {left}
          &nbsp;
          <span className="lighter">{operator}</span>
          &nbsp;
          {right}
          &nbsp;
          <span className="lighter">=</span>
          &nbsp;
          <input
            style={{
              fontSize: '120%',
              textAlign: 'center',
              width: '170px',
              border: '2px solid blue',
            }}
            size={3}
            type="number"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const answer = parseInt(
                  (e.target as HTMLInputElement).value,
                  10
                );
                checkAnswer(answer);
                (e.target as HTMLInputElement).value = '';
              }
            }}
            autoFocus
          />
          {shouldBe2 > -1 ? (
            <>
              &nbsp; try…
              {currentAnswer > shouldBe2
                ? currentAnswer + ' - ' + (currentAnswer - shouldBe2)
                : currentAnswer + ' + ' + (shouldBe2 - currentAnswer)}
              &nbsp;
              <span style={{ fontSize: '60px' }}>
                {Emoji.sad[(currentAnswer % Emoji.sad.length) - 1]}
              </span>
            </>
          ) : (
            <></>
          )}
        </h1>
      ) : (
        <>
          <h1>You Finished! 🤘</h1>
          <Button text="Start Over" onClick={startOver} />
        </>
      )}

      {linesRendered}

      {errorTxt !== '' && <div>{errorTxt}</div>}
    </div>
  );
}
