import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { FlatList, FlatListProps } from 'react-native'
import { CategoryProps } from '.'

interface CategoryPropsStyle {
    isActive: boolean
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};

    height: ${RFValue(113)}px;
    width: 100%;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular}; 
    font-size: ${RFValue(18)}px;

    color: ${({ theme }) => theme.colors.shape};
`

export const CategoryList = styled(
    FlatList as new (props: FlatListProps<CategoryProps>) =>
        FlatList<CategoryProps>
)`
    flex: 1;
    width: 100%;
`as unknown as typeof FlatList;

export const Label = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular}; 
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.title};
`

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
`

export const Category = styled.TouchableOpacity<CategoryPropsStyle>`
    width: 100%;
    padding: ${RFValue(15)}px;

    flex-direction: row;

    align-items: center;

    background-color: ${({ theme, isActive }) => isActive ?  theme.colors.secondary_light : theme.colors.shape};
`

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text};
`

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`
