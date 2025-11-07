import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface LettersProps {
    onSelect?: (letter: string) => void;
}

const Letters: React.FC<LettersProps> = ({ onSelect }) => {
        const handleSelect = (letter: string) => { 
            // call parent handler if provided, otherwise just log
            onSelect?.(letter);
            console.log(`Je hebt gekozen voor: ${letter}`);
        };
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return (
                <View style={styles.container}>
                        {letters.map((letter) => (
                                <Pressable style={styles.key} onPress={()=> handleSelect(letter)} key={letter}>
                                    <Text style={styles.letter}>{letter}</Text>
                                </Pressable>
                        ))}
                </View>
        );
        
}
const styles = StyleSheet.create({
   container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    maxWidth: '100%',
    height: '35%',
    bottom: 0,
    paddingTop: 50
  },
  key: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 3,
    marginVertical: 4,
    height: 60,
    width: 41,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  letter: {
    fontSize: 21,
    fontWeight: '700',
    color: '#000000',
  },
});

export default Letters;

