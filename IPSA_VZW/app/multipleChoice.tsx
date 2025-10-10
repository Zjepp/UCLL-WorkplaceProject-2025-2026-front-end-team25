


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';


interface QuizOption {
  id: number;
  formula: string;
  color: string;
}

const questionData: {
  title: string;
  question: string;
  options: QuizOption[];
} = {
  title: 'Vraag 1 van 20',
  question: 'Wat is de formule van paracetamol',
  options: [
    { id: 1, formula: 'C₈H₉NO₂', color: '#26A69A' },
    { id: 2, formula: 'P₈H₉NO₂', color: '#FFCA28' }, 
    { id: 3, formula: 'C₈H₉O₂', color: '#EF5350' },
    { id: 4, formula: 'C₈H₉NO₂', color: '#AB47BC' },
  ],
};

interface QuizQuestionProps {
  onAnswerSelected?: (selectedId: number) => void;
}


const QuizQuestion: React.FC<QuizQuestionProps> = ({ onAnswerSelected }: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (option: QuizOption) => {
    if (selectedOption === null) { // Prevent re-selection if already chosen
      setSelectedOption(option.id);
      onAnswerSelected?.(option.id);
    }
};
return (  // <-- This return statement is key—TS now infers ReactNode
    <View style={styles.container}>
      <Text style={styles.title}>{questionData.title}</Text>
      <Text style={styles.question}>{questionData.question}</Text>
      
      <View style={styles.optionsGrid}>
        {questionData.options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const row = Math.floor(index / 2);
          const col = index % 2;
          const isFirstRow = row === 0;
          const isFirstCol = col === 0;

          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionBox,
                {
                  backgroundColor: option.color,
                  width: boxSize,
                  height: boxSize,
                  marginTop: isFirstRow ? 20 : 10,
                  marginLeft: isFirstCol ? 20 : 10,
                  borderWidth: isSelected ? 3 : 0,
                  borderColor: '#FFFFFF',
                },
              ]}
              onPress={() => handleSelect(option)}
              disabled={selectedOption !== null}
            >
              <Text style={styles.formulaText}>{option.formula}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionBox: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formulaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});




