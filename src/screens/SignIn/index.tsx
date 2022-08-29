import React, { useState } from 'react'
import { Alert, ActivityIndicator, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { useAuth } from '../../hooks/auth'
import { SignInSocialButton } from '../../components'

import Logo from '../../assets/logo-name.svg'
import Google from '../../assets/google.svg'
import Apple from '../../assets/apple.svg'


import * as S from './styles'
import { theme } from '../../global'

export const SignIn = () => {
    const [loading, setLoading] = useState(false)
    const { signInWithGoogle, signInWithApple } = useAuth()

    async function handleSignInWithGoogle() {
        try {
            setLoading(true)
            return await signInWithGoogle()
        } catch (error) {
            console.error(error)
            Alert.alert('Não foi possível conectar com a Google')
            setLoading(false)
        }
    }

    async function handleSignInWithApple() {
        try {
            setLoading(true)
            return await signInWithApple()
        } catch (error) {
            console.error(error)
            Alert.alert('Não foi possível conectar com a Apple')
            setLoading(false)
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
                    {Platform.OS === 'ios' && 
                        <SignInSocialButton
                            title='Entrar com Apple'
                            svg={Apple}
                            onPress={handleSignInWithApple}
                        />
                    }
                    
                </S.FooterWrapper>
                {loading &&  
                    <ActivityIndicator 
                        color={theme.colors.shape}
                        style={{ 
                            marginTop: 18
                        }}
                    />
                }
            </S.Footer>
        </S.Container>
    )
}