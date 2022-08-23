import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'
import * as S from './styles'

interface Props extends RectButtonProps {
    title: string
    svg: React.FC<SvgProps>
}

export const SignInSocialButton = ({
    title,
    svg: SVG,
    ...rest
}: Props) => {
    return (
        <S.Container {...rest}>
            <S.ImageContainer>
                <SVG />
            </S.ImageContainer>
            <S.Title>{title}</S.Title>
        </S.Container>
    )
}