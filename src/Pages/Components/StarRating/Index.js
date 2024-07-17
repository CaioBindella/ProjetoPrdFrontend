import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Container } from './Style';

const StarRating = ({ scored, total }) => {

  const [scoreStar, setScoreStar] = useState(0);

  useEffect(() => {
    const scorePercentage = ((scored / total) * 100).toFixed()

    if (scorePercentage <= 50) {
      setScoreStar(0);
    } else if (scorePercentage > 50 && scorePercentage <= 60) {
      setScoreStar(1);
    } else if (scorePercentage > 60 && scorePercentage <= 70) {
      setScoreStar(2);
    } else if (scorePercentage > 70 && scorePercentage <= 80) {
      setScoreStar(3);
    } else if (scorePercentage > 80 && scorePercentage <= 90) {
      setScoreStar(4);
    } else if (scorePercentage > 90 && scorePercentage <= 100) {
      setScoreStar(5);
    } else {
      setScoreStar(0);
    }
  }, [scored]);

  return (
    <Container>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} >
          <FontAwesome
            name="star"
            size={27}
            color={star <= scoreStar ? 'gold' : 'black'}
          />
        </TouchableOpacity>
      ))}
    </Container>
  );
};

export default StarRating;
