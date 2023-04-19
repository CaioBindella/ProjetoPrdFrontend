import React, {useState, useEffect} from 'react'

import {
    Container,
    Title,
    Description,
    ContentTitle,
    ContentOptions,
    InputContainer,
} from './Style'

import {TouchableOpacity, Text, View} from 'react-native';
import { RadioButton } from 'react-native-paper';

function IndiceCard ({title, description, options, optionValue}){

    const [checked, setChecked] = useState(null);

    useEffect(() => {
        console.log(checked)
    }, [checked])
    return(
        <Container>
            <ContentTitle>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </ContentTitle> 

            <ContentOptions style={{borderTopWidth:0}}>
                {options.map((eachOption, index) => {
                    return(
                        <InputContainer key={index}>
                            <RadioButton
                                value={optionValue[index]}
                                status={ checked === optionValue[index] ? 'checked' : 'unchecked' }
                                onPress={() => setChecked(optionValue[index])}
                                color="blue"
                            />
                            <Text>{eachOption}</Text>
                        </InputContainer>
                    )
                })}
            </ContentOptions>

        </Container>
    );
}


export default IndiceCard;