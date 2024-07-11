// React
import React from 'react';

// Native Components
import { Container, Title, Text, Content } from './Style';

const Score = ({ title, scored, total }) => {
    return (
        <Container>
            <Content>
                <Title>{title ?? "Performance"}</Title>
                <Text>{((scored / total) * 100).toFixed()} %</Text>
            </Content>
        </Container>
);
} 

export default Score;