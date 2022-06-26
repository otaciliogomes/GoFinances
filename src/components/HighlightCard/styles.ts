import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { css } from 'styled-components'

interface TypeProps {
    type: 'up' | 'down' | 'total'
}

export const Container = styled.View<TypeProps>`
  background-color: ${
      ({ theme, type }) => type !== 'total'
      ? theme.colors.shape
      : theme.colors.secondary
  };

  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(30)}px;
  margin-right: ${RFValue(26)}px;

  width: ${RFValue(300)}px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

export const Title = styled.Text`
color: ${
    ({ theme, type }) => type !== 'total'
    ? theme.colors.title_dark
    : theme.colors.shape
};
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
`   
 
export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({type}) => type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};
  `}

  ${({type}) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};
  `}

  ${({type}) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `}
`

export const Footer = styled.View`
`

export const Amount = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;

    color: ${
        ({ theme, type }) => type !== 'total'
        ? theme.colors.title
        : theme.colors.shape
    };

    margin-top: 38px;
`

export const LastTransaction = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;

    color: ${
    ({ theme, type }) => type !== 'total'
    ? theme.colors.text
    : theme.colors.shape
};
`