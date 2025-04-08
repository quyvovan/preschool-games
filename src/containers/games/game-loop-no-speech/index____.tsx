'use client';

// Marking as Client Component since we use React hooks
import React, { useEffect, useState } from 'react';
import styles from './MultiplicationGame.module.css';
// import { happy, sad } from "./emoji";
import { Emoji } from './emoji';

// You can create this CSS module

export default function MultiplicationGame() {
  // Game state using React hooks
  const [errorTxt, setErrorTxt] = useState('');
  const [grid] = useState([
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
  }, []);

  function checkAnswer(answer: number) {
    setCurrentAnswer(answer);
    const isCorrect = left * right === answer;

    if (isCorrect) {
      const len = lines.length;
      setCorrect((prev) => ({ ...prev, [len]: isCorrect }));

      if (!correct[len]) {
        setShouldBe((prev) => ({ ...prev, [len]: left * right }));
      }

      setPrize((prev) => ({
        ...prev,
        [len]: Math.floor(Math.random() * 10000),
      }));
      setLines((prev) => [...prev, `${left} x ${right} = ${answer}`]);
      setNew();
      setShouldBe2(-1);
    } else {
      setShouldBe2(left * right);
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
    console.log(left + ' x ' + right);
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
  }

  function shuffle(a: [number, number][]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startOver() {
    setNew();
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

  const percent = Math.floor((randomGridI / randomGrid.length) * 100);
  const linesRendered = [...lines]
    .reverse()
    .map((line, i) => (
      <Line key={i} line={line} index={lines.length - 1 - i} />
    ));

  return (
    <div className={styles.container}>
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
          <span className="lighter">x</span>
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
              {currentAnswer > left * right
                ? currentAnswer + ' - ' + (currentAnswer - left * right)
                : currentAnswer + ' + ' + (left * right - currentAnswer)}
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
