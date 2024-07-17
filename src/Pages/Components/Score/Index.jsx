// React
import React from 'react';

// Native Components
import { Container, Title, Text, Content } from './Style';

const Score = ({ title, scored, total }) => {
    const hasTitle = !!title;
    const isDefaultTitle = title === "Performance Geral";
    return (
        <Container>
            <Content hasTitle={hasTitle} isDefaultTitle={isDefaultTitle}>
                <Title>{title ?? "Performance"}</Title>
                <Text>{((scored / total) * 100).toFixed()} %</Text>
            </Content>
        </Container>
    );
}

export default Score;