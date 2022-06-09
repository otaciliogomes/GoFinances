import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import * as S from './styles'


interface Props extends TouchableOpacityProps {
    title: string
    type: 'up' | 'down'
    isActive: boolean
}

export const ButtonTransactionType = ({ 
    title, 
    type,
    isActive,
    ...rest 
}: Props) => {

    const icon = {
        up: 'arrow-up-circle',
        down: 'arrow-down-circle'
    }

    return (
        <S.Container
            isActive={isActive}
            type={type}
            {...rest}
        >
            <S.Icon 
                name={icon[type]}
                type={type}
            />
            <S.Title>{ title }</S.Title>
        </S.Container>
    )
}