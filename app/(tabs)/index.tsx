import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

const SwipeableGrid = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'];

  const initialItems = Array.from({ length: 64 }, () => {
    
    return colors[Math.floor(Math.random() * colors.length)];
  });
  
  const [items, setItems] = useState<string[]>(initialItems);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);

  const numColumns = 8;

  const handlePressIn = (event: GestureResponderEvent) => {
    setStartX(event.nativeEvent.pageX);
    setStartY(event.nativeEvent.pageY);
  };

  const handlePressOut = (event: GestureResponderEvent, index: number) => {
    const endX = event.nativeEvent.pageX;
    const endY = event.nativeEvent.pageY;
    const swipeDistanceX = endX - startX;
    const swipeDistanceY = endY - startY;
    const newItems = [...items];

    if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
      
      if (swipeDistanceX < -50 && index % numColumns !== 0) {
        
        const temp = newItems[index];
        newItems[index] = newItems[index - 1];
        newItems[index - 1] = temp;
        setItems(newItems);
      } else if (swipeDistanceX > 50 && index % numColumns !== numColumns - 1) {
       
        const temp = newItems[index];
        newItems[index] = newItems[index + 1];
        newItems[index + 1] = temp;
        setItems(newItems);
      }
    } else {
      
      if (swipeDistanceY < -50 && index >= numColumns) {
       
        const temp = newItems[index];
        newItems[index] = newItems[index - numColumns];
        newItems[index - numColumns] = temp;
        setItems(newItems);
      } else if (swipeDistanceY > 50 && index < items.length - numColumns) {
        
        const temp = newItems[index];
        newItems[index] = newItems[index + numColumns];
        newItems[index + numColumns] = temp;
        setItems(newItems);
      }
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Candy Crush</Text>
      </View>

   
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={item}
              style={[styles.item, { width: `${100 / numColumns}%` }]}
              onPressIn={handlePressIn}
              onPressOut={(e) => handlePressOut(e, index)}
            >
                <View style={[styles.itemContent, { backgroundColor: item }]}>
                {}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
   
   
  },

  
  header: {
   
    marginTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 40,
    textAlign: 'center', 
  },

  gridContainer: {
    flex: 1,                 
    justifyContent: 'center',
    alignItems: 'center',    
  },

 
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
  },
  item: {
    aspectRatio: 1,
    padding: 2,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SwipeableGrid;
