import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    background-color: ${({theme}) => theme.colors.primary };
`

export const Text = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: 28px;
`