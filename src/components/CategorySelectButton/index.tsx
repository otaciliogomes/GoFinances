import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

interface Props extends TouchableOpacityProps {
    title: string
}

export const CategorySelectButton = ({ title, ...rest }: Props) => {
    return (
        <S.Container {...rest}>
            <S.Title>{title}</S.Title>
            <S.Icon name="chevron-down"/>
        </S.Container>
    )
}