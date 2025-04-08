import React, { useEffect, useState } from 'react';
import { questions } from './constants';

// import './styles.css';

interface IQuestion {
  question: string;
  choices: {
    text: string;
    answer: boolean;
  }[];
  img?: string;
}

function shuffle(array: any[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const GameQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
    showQuestion(0);
  };

  const showQuestion = (index: any) => {
    resetState();
    let currentQuestion: IQuestion = questions[index];
    let questionNumber = index + 1;
    setCurrentQuestion(currentQuestion);
    // setQuestionText(`${questionNumber}. ${currentQuestion.question}`);
    const shuffledChoices: any = shuffle(currentQuestion.choices);
    // setChoices(shuffledChoices);
    // setCorrectAnswer(
    //   currentQuestion.choices.findIndex((choice: any) => choice.answer === true)
    // );
  };

  const resetState = () => {
    setChoices([]);
    setCorrectAnswer(null);
    setSelectedAnswer(null);
  };

  const selectChoice = (isCorrect, index) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(index);
    setShowNextButton(true);
  };

  const handleNextButton = () => {
    setShowNextButton(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex < questions.length - 1) {
      showQuestion(currentQuestionIndex + 1);
    } else {
      // If it's the last question, show the score
      showScore();
    }
  };

  const showScore = () => {
    resetState();
    setQuestionText(`You scored ${score} out of ${questions.length}!`);
  };

  useEffect(() => {
    startQuiz();
  }, []);

  console.log('currentQuestion', currentQuestion);
  return (
    <div className="app">
      <h1>Simple Quiz</h1>
      <div className="quiz">
        <h2 id="question">{currentQuestion?.question}</h2>
        <div id="answer-buttons">
          {shuffle(currentQuestion?.choices || []).map((choice, index) => (
            <button
              key={index}
              className={`btn ${
                selectedAnswer === index
                  ? choice.answer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => selectChoice(choice.answer, index)}
              aria-label={choice.text}
              disabled={selectedAnswer !== null}
            >
              {choice.text}
            </button>
          ))}
        </div>
        {showNextButton && (
          <button id="next-button" onClick={handleNextButton}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default GameQuiz;
