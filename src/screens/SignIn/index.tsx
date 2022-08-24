import React from 'react'
import { Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { useAuth } from '../../hooks/auth'
import { SignInSocialButton } from '../../components'

import Logo from '../../assets/logo-name.svg'
import Google from '../../assets/google.svg'
import Apple from '../../assets/apple.svg'


import * as S from './styles'

export const SignIn = () => {
    const { signInWithGoogle } = useAuth()

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle()
        } catch (error) {
            console.error(error)
            Alert.alert('Não foi possível conectar com a Google')
        }
    }

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
                        onPress={() => handleSignInWithGoogle()}
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