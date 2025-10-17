
import QuizMultipleChoice from '@/components/memoryChoice';

import React, { useState } from 'react';




const QuizQuestion: React.FC = () => {
return ( 
  <QuizMultipleChoice title={''} question={{
    id: 1,
    type: 'multiple_choice',
    vraag: 'Wat is de hoofdstad van Nederland?',
    antwoord: [
      { id: 1, antwoord: 'Amsterdam' },
      { id: 2, antwoord: 'Rotterdam' },
      { id: 3, antwoord: 'Den Haag' },
      { id: 4, antwoord: 'Utrecht' },
    ],
    resultaat: [],
  }} /> 
  );
};

export default QuizQuestion;






