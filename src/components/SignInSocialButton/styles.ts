import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'
import { theme } from '../../global'

export const Container = styled(RectButton)`
    height: ${RFValue(56)}px;

    background-color: ${theme.colors.shape};
    border-radius: 5px;

    align-items: center;
    flex-direction: row;

    margin-bottom: 16px;
`

export const ImageContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;

    padding: ${RFValue(16)}px;
    border-color: ${theme.colors.background};
    border-right-width: 1px;
`

export const Title = styled.Text`
    flex: 1;
    text-align: center;

    font-family: ${theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.title_dark};
`