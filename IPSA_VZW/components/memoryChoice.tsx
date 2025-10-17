import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Antwoord, Vraag } from '../../types';

interface QuizOption {
  id: number;
  formula: string | Antwoord;
  color: string;
}

interface MultipleChoiceProps {
  onAnswerSelected?: (selected: boolean) => void;
  title: string;
  question : Vraag;
}

const QuizMemoryChoice: React.FC<MultipleChoiceProps> = ({ onAnswerSelected, question, title }: MultipleChoiceProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const windowWidth = Dimensions.get('window').width;
  const [timeLeft, setTimeLeft] = useState(10);
  const boxSize = (windowWidth - 100) / 2;
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'view' | 'answer'>('view');
  
    useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if(phase === 'view'){
            setVisible(false);
            setPhase('answer');
            setTimeLeft(10);
          }
          else{
            setVisible(false);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const questionData: {
  title: string;
  question: Vraag;
  options: QuizOption[];
  } = {
    title: title,
    question: question.vraag ? question : { vraag: 'vraag niet beschikbaar' } as Vraag,
    options: [
      { id: 1, formula: question.antwoord?.[0] ?? 'antwoord niet beschikbaar', color: '#26A69Aff' },
      { id: 2, formula: question.antwoord?.[1] ?? 'antwoord niet beschikbaar', color: '#fdc961ff' }, 
      { id: 3, formula: question.antwoord?.[2] ?? 'antwoord niet beschikbaar', color: '#e64d32ff' },
      { id: 4, formula: question.antwoord?.[3] ?? 'antwoord niet beschikbaar', color: '#bd99d4ff' },
    ],
  };
  const handleSelect = (option: QuizOption) => { 
      console.log(`Je hebt gekozen voor: ${option.formula}`);
      onAnswerSelected?.(true);
      setTimeLeft(10);
      setVisible(true);
      setPhase('view')
};

const progressWidth = ((10 - timeLeft) / 10) * 100;
const progressColor = phase === 'view' ? '#acece6ff' : '#e64d32ff';

return ( 
    <View style={styles.container}>
      <Text style={styles.title}>{questionData.title}</Text>
      <Text style={styles.question}>{questionData.question.vraag}</Text>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progressWidth}%`, backgroundColor : progressColor }]} />
      </View>

      <View style={styles.optionsGrid}>
        {questionData.options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const row = Math.floor(index / 2);
          const col = index % 2;
          const isFirstRow = row === 0;
          const isFirstCol = col === 0;

          return (
            <Pressable
              key={option.id}
              style={[
                styles.optionBox,
                {
                  backgroundColor: option.color,
                  width: boxSize,
                  height: boxSize + 30,
                  marginTop: isFirstRow ? 20 : 10,
                  marginRight: isFirstCol ? 10 : 20,
                  marginLeft: isFirstCol ? 20 : 10,
                  borderWidth: isSelected ? 3 : 0,
                  borderColor: '#000000',
                },
              ]}
              onPress={() => handleSelect(option)}
              disabled={visible || selectedOption !== null}
            >
              <Text style={[styles.formulaText, !visible && { opacity: 0 }]}>
                {typeof option.formula === 'string' ? option.formula : option.formula.antwoord}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    color: '#000000ff',
    marginBottom: 10,
    textAlign: 'right',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  question: {
    fontSize: 36,
    color: '#000000ff',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  progressContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#26A69Aff',
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#acece6ff',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  optionBox: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formulaText: {
    fontSize: 28,
    color: '#000000ff',
    textAlign: 'center',
  },
});

export default QuizMemoryChoice;
