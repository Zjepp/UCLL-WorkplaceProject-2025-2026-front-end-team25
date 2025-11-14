import QuizMultipleChoice from '@/components/choice';
import React, { useState } from 'react';


const QuizQuestion: React.FC = () => {
return ( 
  <QuizMultipleChoice title={''} question={{
    id: undefined,
    type: undefined,
    vraag: undefined,
    antwoorden: undefined,
    resultaat: undefined
  }} mistakeAmount={0} mistakeAmountSetter={function (amount: number): void {
    throw new Error('Function not implemented.');
  } } correctAmount={0} correctAmountSetter={function (amount: number): void {
    throw new Error('Function not implemented.');
  } } /> 
  );
};

export default QuizQuestion;