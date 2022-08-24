import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { useAuth } from '../../hooks/auth'
import { SignInSocialButton } from '../../components'

import Logo from '../../assets/logo-name.svg'
import Google from '../../assets/google.svg'
import Apple from '../../assets/apple.svg'


import * as S from './styles'

export const SignIn = () => {
    const data = useAuth()
    return (
        <S.Container>
            <S.Header>
                <S.TitleWrapper>
                    <Logo
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <S.Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples {'\n'}
                    </S.Title>
                    <S.SignInTitle>
                        Faça seu login com {'\n'}
                        uma das contas abaixo
                    </S.SignInTitle>
                </S.TitleWrapper>
            </S.Header>
            <S.Footer>
                <S.FooterWrapper>
                    <SignInSocialButton
                        title='Entrar com Google'
                        svg={Google}
                    />
                    <SignInSocialButton
                        title='Entrar com Apple'
                        svg={Apple}
                    />
                </S.FooterWrapper>
            </S.Footer>
        </S.Container>
    )
}