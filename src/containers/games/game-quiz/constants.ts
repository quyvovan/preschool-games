export const questions = [
  {
    id: 'question_1',
    question: 'Bé sẽ làm gì trong tình huống này?',
    img: '/images/quiz/question_1/question_1.jpg',
    choices: [
      { 
        text: 'answer_1', 
        img: '/images/quiz/question_1/answer_1.jpg',
        answer: false
      },
      { text: 'answer_2',
        img: '/images/quiz/question_1/answer_2.jpg',
        answer: true
      },
      { text: 'answer_3',
        img: '/images/quiz/question_1/question_1.jpg',
        answer: false
      },
      { text: 'answer_4',
        img: '/images/quiz/question_1/answer_1.jpg',
        answer: false
      },
    ],
  },
  {
    id: 'question_2',
    question: 'Bé sẽ gọi số điện thoại nào trong tình huống này?',
    img: '/images/quiz/question_2/question_2.png',
    choices: [
      { text: '113',
        img: '/images/quiz/question_2/img_113.png', answer: false },
      { text: '114',
        img: '/images/quiz/question_2/img_114.png', answer: false },
      { text: '115',
        img: '/images/quiz/question_2/img_115.png', answer: true },
    ],
  },
  {
    id: 'question_3',
    question: 'Bé sẽ gọi số điện thoại nào để giúp bạn?',
    img: '/images/quiz/question_3/question_3.png',
    choices: [
      { text: '111',
        img: '/images/quiz/question_3/img_111.png', answer: true },
      { text: '114',
        img: '/images/quiz/question_3/img_114.png', answer: false },
      { text: '115',
        img: '/images/quiz/question_3/img_115.png', answer: false },
    ],
  },
  {
    id: 'question_4',
    question: "Ai là người giúp đỡ em bé trong tình huống này?",
    img: '/images/quiz/question_4/question_4.png',
    choices: [
      { text: '113',img: '/images/quiz/question_4/img_113.png', answer: false },
      { text: '114',img: '/images/quiz/question_4/img_114.png', answer: true },
      { text: '115',img: '/images/quiz/question_4/img_115.png', answer: false },
    ],
  },
];
