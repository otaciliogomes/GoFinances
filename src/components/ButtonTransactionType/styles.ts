import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

type Icon = {
    type: 'up' | 'down'
}

type Container = {
    isActive: boolean
    type: 'up' | 'down'
}

export const Container = styled(TouchableOpacity)<Container>`
    width: 48%;

    border-width: ${({ isActive })=> isActive ? 0 : 1.3}px ;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;

    padding: 16px;

    align-items: center;
    justify-content: space-evenly;

    flex-direction: row;

    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `};

`
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`

export const Icon = styled(Feather)<Icon>`
    font-size: ${RFValue(24)}px;
    margin-right: 24px;

    color: ${({ theme, type }) => type === 'up'
       ? theme.colors.success
       : theme.colors.attention
    }
`