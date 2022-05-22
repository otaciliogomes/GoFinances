import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const Container = styled.View`
    flex: 1;

    background-color: ${({theme}) => theme.colors.background };
`

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;

    justify-content: center;
    align-items: flex-start;
    flex-direction: row;

    background-color: ${({theme}) => theme.colors.primary };
`

export const UserWrap = styled.View`
    width: 100%;

    padding: 0px 24px;
    margin-top: ${getStatusBarHeight() + 28}px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`

export const User = styled.View`
    margin-left: 17px;
`

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;

    border-radius: 10px;
`

export const UserGreeting = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.shape};
`

export const UserName = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};

    color: ${({ theme }) => theme.colors.shape};
`

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary};

    font-size: ${RFValue(24)}px;
`

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false
})`
    padding: 0px 24px;

    position: absolute;
    margin-top: ${RFPercentage(22)}px;
`