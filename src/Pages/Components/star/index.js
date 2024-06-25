import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ initialRating }) => {
  const [rating, setRating] = useState(initialRating);

  // const handleRating = (star) => {
  //   setRating(star);
  // };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} >
          <FontAwesome
            name="star"
            size={30}
            color={star <= rating ? 'gold' : 'black'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default StarRating;
