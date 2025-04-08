import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { questions } from './constants';

interface IQuestion {
  question: string;
  choices: {
    text: string;
    answer: boolean;
    img?: string;
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
  const [choices, setChoices] = useState<IQuestion['choices']>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Number | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [confirmedQuestion, setConfirmedQuestion] = useState(false);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
    showQuestion(0);
  };

  const showQuestion = (index: any) => {
    resetState();
    let currentQuestion: IQuestion = questions[index];
    setCurrentQuestion(currentQuestion);
    const shuffledChoices: any = shuffle(currentQuestion.choices);
    setChoices(shuffledChoices);
  };

  const resetState = () => {
    setChoices([]);
    setSelectedAnswer(null);
    setCurrentQuestion(null);
  };

  const selectChoice = (isCorrect: boolean, index: number) => {
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
    setConfirmedQuestion(true);
  };

  useEffect(() => {
    startQuiz();
  }, []);

  return (
    <Box
      className="app"
      sx={{
        borderRadius: '10px',
        margin: '50px auto 0',
        maxWidth: '768px',
        padding: '1rem',
        border: '1px solid rgb(109 114 116)',
        background: 'white',
      }}
    >
      <Typography
        sx={{
          borderBottom: '1px solid rgb(109 114 116)',
          color: '#FF9800',
          fontSize: '25px',
          fontWeight: 600,
          paddingBottom: '30px',
          margin: 0,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Game rung chuông vàng
      </Typography>

      {confirmedQuestion ? (
        <Box textAlign="center">
          <Box m={'auto'}>
            <img
              src={'/images/quiz/success.gif'}
              alt="success"
              style={{
                width: '150px',
                height: '150px',
                margin: 'auto',
              }}
            />
          </Box>
          <Typography
            component="h2"
            id="question"
            sx={{
              color: '#333',
              fontSize: '22px',
              fontWeight: 600,
              margin: '20px 0',
            }}
          >
            Bạn đã hoàn thành bài kiểm tra này với số điểm là {score} /{' '}
            {questions.length}
          </Typography>
        </Box>
      ) : (
        <div className="quiz">
          <Typography
            component="h2"
            id="question"
            sx={{
              color: '#333',
              fontSize: '22px',
              fontWeight: 600,
              margin: '20px 0',
            }}
          >
            {`${currentQuestionIndex + 1}. ${currentQuestion?.question}`}
          </Typography>

          {/* Show image for currentQuestion */}
          {currentQuestion?.img && (
            <img
              src={currentQuestion.img}
              alt={currentQuestion?.question}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          )}

          <div id="answer-buttons">
            <List sx={{ width: '100%' }}>
              {choices.map((choice, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = choice.answer === true;

                console.log('choice', choice);
                return (
                  <ListItem
                    key={choice.text}
                    disableGutters
                    sx={{
                      backgroundColor: isSelected
                        ? isCorrect
                          ? 'rgba(0, 255, 0, 0.1)' // Màu xanh nhạt khi đúng
                          : 'rgba(255, 0, 0, 0.1)' // Màu đỏ nhạt khi sai
                        : 'transparent',
                    }}
                  >
                    <Button
                      key={index}
                      onClick={() => selectChoice(choice.answer, index)}
                      aria-label={choice.text}
                      startIcon={
                        <span
                          style={{
                            fontWeight: 'bold',
                            marginRight: '8px',
                            color: '#333',
                          }}
                        >
                          {String.fromCharCode(65 + index)}
                          {'. '}
                          {/* 65 là mã ASCII của 'A' */}
                        </span>
                      }
                      sx={{
                        padding: '0 1rem',
                        width: '100%',
                        justifyContent: 'flex-start',
                        color: '#333',
                      }}
                    >
                      {/* if have image, i need show image */}
                      {choice?.img && (
                        <img
                          src={choice.img}
                          alt={choice.text}
                          style={{
                            width: 'auto',
                            height: '100px',
                            borderRadius: '4px',
                            marginRight: '10px',
                          }}
                        />
                      )}
                      {!choice?.img && choice.text}
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </div>
          {showNextButton && (
            <Button
              id="next-button"
              variant="contained"
              onClick={handleNextButton}
              endIcon={<KeyboardDoubleArrowRightIcon />}
              sx={{
                alignItems: 'center',
                background: '#001e4d',
                borderRadius: '4px',
                color: '#fff',
                fontWeight: 500,
                display: 'flex',
                justifyContent: ' center',
                margin: '20px auto 0',
                padding: '15px',
                width: '300px',
                '&:hover': {
                  background: '#FF9800',
                },
              }}
            >
              Tiếp tục nào
            </Button>
          )}
        </div>
      )}
    </Box>
  );
};

export default GameQuiz;
