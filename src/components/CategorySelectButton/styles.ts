import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity.attrs({
    activityOpacity: 0.7
})`
    background-color: ${({ theme }) => theme.colors.shape};

    border-radius: 5px;

    justify-content: space-between;
    align-items: center;

    padding: 18px 14px;

    flex-direction: row;
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`

export const Icon = styled(Feather)`
 font-size: ${RFValue(20)}px;

 color: ${({ theme }) => theme.colors.text};

`