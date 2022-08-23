import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo-name.svg'

import * as S from './styles'

export const SignIn = () => {
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
                
            </S.Footer>
        </S.Container>
    )
}