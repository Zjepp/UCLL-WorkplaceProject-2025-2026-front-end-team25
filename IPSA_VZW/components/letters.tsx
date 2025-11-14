import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface LettersProps {
    onSelect?: (letter: string) => void;
}

const Letters: React.FC<LettersProps> = ({ onSelect }) => {
    const [selectedLetters, setSelectedLetters] = React.useState<string[]>([]);
    const grijs = '#404040ff';

    const paars = '#A395CA';
    const oranje = '#FF4F21';
    const blauw = '#A1C2C2' ;
    const geel = '#FDCE7E' ;

    const colors = [paars, oranje, blauw, geel];
      const handleSelect = (letter: string) => {
        setSelectedLetters((prev) => [...prev, letter]);
        onSelect?.(letter);
      };
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return (
          <View style={styles.container}>
              {letters.map((letter, index) => {
                
                const isSelected = selectedLetters.includes(letter);
                const backgroundColor = isSelected ? grijs : colors[index % colors.length];
                const opacity = isSelected ? 0.5 : 1.0;

                return (
                  <Pressable
                    key={letter}
                    onPress={() => handleSelect(letter)}
                    style={[styles.key, { backgroundColor, opacity }]}
                    disabled={isSelected}
                  >
                    <Text style={styles.letter}>{letter}</Text>
                  </Pressable>
                );
            })}
          </View>
        );
        
}
const styles = StyleSheet.create({
   container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#ffffff',
    maxWidth: '100%',
    height: '35%',
    bottom: 0,
    paddingTop: 50,
    margin: 0,
  },
  key: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    marginVertical: 4,
    height: 60,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 0.5,
    // borderColor: '#000000',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // elevation: 4,
  },
  letter: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffffff',
  },
});

export default Letters;

