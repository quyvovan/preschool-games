import * as React from 'react';
import { Emoji } from './emoji';
import { start } from './gameLoop';
// This applies styles (colors, sizes) to our app
import './styles.css';

// import { happy, sad } from "./emoji";

// This runs once before the game starts

let errorTxt = '';

let grid = [
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
];
// grid = [[-1, -1, -1], [-1, 4, -1], [-1, 6, 9]];

let randomGrid: any[] = [];
let randomGridI = -1;

let lines: any[] = [];
let correct: any = {};
let prize: any = {};
let shouldBe: any = {};

let currentAnswer = -1;
let shouldBe2 = -1;

let left = -1;
let right = -1;

newGrid();
setNew();

// This runs a million times EVERY second

function update(progress: any) {}

// This is what shows on screen - called HTML

function checkAnswer(answer: number) {
  currentAnswer = answer;
  let isCorrect = left * right === answer;
  if (isCorrect) {
    let len = lines.length;
    correct[len] = isCorrect;
    if (!correct[len]) {
      shouldBe[len] = left * right;
    }
    prize[len] = Math.floor(Math.random() * 10000);
    lines.push(`${left} x ${right} = ${answer}`);
    setNew();
    shouldBe2 = -1;
  } else {
    shouldBe2 = left * right;
  }
}

function App() {
  let linesRendered = [];
  for (let i = lines.length - 1; i > -1; i--) {
    linesRendered.push(Line(lines[i], i));
  }
  let percent = Math.floor((randomGridI / randomGrid.length) * 100);
  return (
    <>
      <span
        style={{
          color: '#999',
        }}
      >
        Progress
      </span>
      {/*Progress(percent)*/}
      <div
        style={{
          height: '40px',
          background: 'whitesmoke',
          width: '100%',
          //border: "1px solid #ccc",
          boxShadow: '1px 1px 1px rgba(0,0,0,.2)',
        }}
      >
        <div
          style={{
            height: '40px',
            background: 'green',
            width: percent + '%',
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
            //autoFocus
            style={{
              fontSize: '120%',
              textAlign: 'center',
              width: '170px',
              border: '2px solid blue',
            }}
            size={3}
            type="number"
            onKeyDown={(e: any) => {
              if (e.key === 'Enter') {
                let answer = parseInt(e.target.value, 10);
                checkAnswer(answer);
                e.target.value = '';
              }
            }}
          />
          {shouldBe2 > -1 ? (
            <>
              &nbsp; try…
              {currentAnswer > left * right
                ? currentAnswer + ' - ' + (currentAnswer - left * right)
                : currentAnswer + ' + ' + (left * right - currentAnswer)}
              &nbsp;
              <span
                style={{
                  fontSize: '60px',
                }}
              >
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
          {Button('Start Over', startOver)}
        </>
      )}
      {linesRendered}

      {errorTxt !== '' && <div>{errorTxt}</div>}
    </>
  );
}

function Line(line: any, i: any) {
  return (
    <h1 key={'line' + i}>
      {line}&nbsp;
      {correct.hasOwnProperty(i) ? (
        correct[i] ? (
          <>
            <span
              style={{
                color: 'green',
                fontSize: '18px',
              }}
            >
              Correct
            </span>
            &nbsp;
            <span
              style={{
                fontSize: '60px',
              }}
            >
              {Emoji.happy[(prize[i] % Emoji.happy.length) - 1]}
            </span>
          </>
        ) : (
          <>
            <span
              style={{
                color: 'red',
                fontSize: '18px',
              }}
            >
              The correct answer is {shouldBe[i]}
            </span>
            &nbsp;
            <span
              style={{
                fontSize: '60px',
              }}
            >
              {Emoji.sad[(prize[i] % Emoji.happy.length) - 1]}
            </span>
          </>
        )
      ) : (
        ''
      )}
    </h1>
  );
}

function startOver() {
  setNew();
}
function setNew() {
  randomGridI++;
  if (randomGridI > randomGrid.length) {
    newGrid();
    randomGridI = 0;
  }

  if (randomGrid[randomGridI]) {
    [left, right] = randomGrid[randomGridI];
  }
  console.log(left + ' x ' + right);
}

function newGrid() {
  const max = grid[0].length;
  randomGrid = [];
  for (let i = 0; i < max; i++) {
    for (let j = 0; j < max; j++) {
      if (grid[i][j] !== -1) {
        randomGrid.push([i + 1, j + 1]);
      }
    }
  }
  shuffle(randomGrid);
}

function shuffle(a: any) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Button(text: any, onClick: any) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
    >
      {text}
    </button>
  );
}

function Progress(percent: any) {
  return (
    <div className="w-full">
      <div className="shadow w-full bg-grey-light">
        <div
          className="bg-blue-700 text-xs leading-none py-1 text-center text-white"
          style={{ width: percent + '%' }}
        >
          {percent}%,
        </div>
      </div>
    </div>
  );
}

// This now starts our app

start(update, App);
