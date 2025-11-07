import React, { use, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Antwoord, Vraag } from '../../types';
import Letters from './letters';

interface QuizOption {
  id: number;
  formula: string | Antwoord;
  color: string;
}
interface HangmanQuizProps {
  onAnswerSelected?: (selected: boolean) => void;
  title: string;
  question : Vraag;
  mistakeAmount: number;
  mistakeAmountSetter: (amount: number) => void;
  correctAmount: number;
  correctAmountSetter: (amount: number) => void;
}

const HangmanQuiz: React.FC<HangmanQuizProps> = ({
  onAnswerSelected,
  title,
  question,
  mistakeAmount,
  mistakeAmountSetter,
  correctAmount,
  correctAmountSetter,
}) => {
  const [answerArray, setAnswerArray] = useState<string[]>([]);
  const [solutionArray, setSolutionArray] = useState<string[]>([]);


  const questionData: {
    title: string;
    question: Vraag;
    options: QuizOption[];
    } = {
      title: title,
      question: question.vraag ? question : { vraag: 'vraag niet beschikbaar' } as Vraag,
        // prefer the tekst of the first Antwoord object, fallback to question.vraag
        options: [
          { id: 1, formula: question.antwoorden?.[0]?.antwoord ?? question.vraag ?? 'antwoord niet beschikbaar', color: '#26A69Aff' }
        ],
    };

  useEffect(() => {
    const raw = typeof questionData.options[0].formula === 'string'
      ? questionData.options[0].formula
      : String(questionData.options[0].formula);

    const upper = raw.toUpperCase();
    const letters = upper.split('');

    // solutionArray holds the canonical solution characters (uppercased)
    setSolutionArray(letters);
    //console.log('Oplossing letters:', letters);

    // answerArray holds the visible characters for the player: letters -> '_' , keep spaces/punctuation
    const initialDisplay = letters.map(ch => /[A-Z]/.test(ch) ? '_' : ch);
    // console.log('Initieel antwoord array:', initialDisplay);
    setAnswerArray(initialDisplay);
  }, [question]);
    const handleSelect = (option: QuizOption) => {
      // make sure we have a string answer to work with (could be from Antwoord.antwoord)
      const answerText = typeof option.formula === 'string' ? option.formula : String(option.formula);
      console.log(`Je hebt gekozen voor (raw):`, option.formula);
      const upperText = answerText.toUpperCase();
      console.log(`Afgehandeld als string: ${upperText}`);

      // split into characters for hangman play (preserve spaces and punctuation)
      const letters = answerText.toUpperCase().split('');
      console.log('Letters:', letters);

      // if(typeof option.formula === 'object' && option.formula !== null && 'correct' in option.formula){
      //   if(option.formula.correct) {correctAmountSetter(correctAmount+1)} else {mistakeAmountSetter(mistakeAmount + 1)};
      // };
      // onAnswerSelected?.(true);
    };

    // handler to receive individual letters from the Letters component
    const handleLetterSelect = (letter: string) => {
      console.log(`Geselecteerde letter vanuit Hangman: ${letter}`);
      handleSelect(questionData.options[0]);
      // TODO: implement letter-matching logic here (reveal letters, update state, etc.)
      
    };
    
  return (
    <Letters onSelect={handleLetterSelect} />
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //padding: 20,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'flex-start',
//   },
//   title: {
//     fontSize: 18,
//     color: '#000000ff',
//     marginBottom: 10,
//     textAlign: 'right',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   question: {
//     fontSize: 28,
//     color: '#000000ff',
//     marginBottom: 30,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   progressContainer: {
//     height: 20,
//     width: '100%',
//     backgroundColor: '#26A69Aff',
//     overflow: 'hidden',
//     marginVertical: 10,
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#acece6ff',
//   },
//   optionsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   optionBox: {
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   formulaText: {
//     fontSize: 22,
//     paddingHorizontal: 2,
//     color: '#000000ff',
//     textAlign: 'center',
//   },
// });

export default HangmanQuiz;