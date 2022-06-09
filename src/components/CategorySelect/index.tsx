import React from 'react'

import * as S from './styles'

interface Props {
    title: string
}

export const CategorySelect = ({ title }: Props) => {
    return (
        <S.Container>
            <S.Title>{title}</S.Title>
            <S.Icon name="chevron-down"/>
        </S.Container>
    )
}