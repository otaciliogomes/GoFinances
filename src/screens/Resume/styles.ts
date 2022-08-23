import { BorderlessButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

import { theme } from '../../global/index'

export const Container = styled.View`
    flex: 1;

    background-color: ${theme.colors.background};
`
export const Title = styled.Text`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.regular};
`

export const Header = styled.View`
    background-color: ${theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;

    justify-content: flex-end;
    align-items: center;

    padding-bottom: 19px;
`

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: { padding: 24 },
    showsVerticalScrollIndicator: false
})``

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`

export const MothSelect = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 12px 0;
    padding: 0 24px;
`

export const MothSelectButton = styled.TouchableOpacity`

`

export const SelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`

export const Month = styled.Text`
    font-family: ${theme.fonts.bold};
    font-size: ${RFValue(20)}px;
`
