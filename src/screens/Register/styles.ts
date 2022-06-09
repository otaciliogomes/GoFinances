import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;

    justify-content: flex-end;
    align-items: center;

    padding-bottom: 19px;
`

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
`

export const Form = styled.View` 
    flex: 1;
    width: 100%;

    padding: 24px;

    justify-content: space-between;
`

export const Fields = styled.View``

export const TransactionTypeContainer = styled.View`
    flex-direction: row;

    justify-content: space-between;

    margin: 8px 0px 16px 0px;
`
