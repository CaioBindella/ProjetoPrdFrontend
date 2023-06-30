// React
import React from 'react';

// Native Components
import { Container, Text, Content, Divrow} from './Style';

import { View , ScrollView } from 'react-native';
import styled from 'styled-components/native';


const HorizontalBarChart = ({name , number, taxa}) => {
  return (
    <Container>
        <Content>
            <Divrow>
                <Text>{name} - </Text>
                <Text>Porcentagem: {taxa}%</Text>
            </Divrow>
            <Bar width={number}/>
        </Content>
    </Container>
);
}

const Bar = styled.View`
    height: 50%;
    width: ${({ width }) => width}%;
    border: 1px;
    background-color: lightgreen;
    /* border-radius: 10px; */

`;

export default HorizontalBarChart;