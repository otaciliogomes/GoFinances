import React from 'react'
import { Input , Button} from '../../components'

import * as S from './styles'

export const Register = () => {
    return (
        <S.Container>
            <S.Header>
                <S.Title>Cadastro</S.Title>
            </S.Header>
            <S.Form>
                <S.Fields>
                    <Input
                        placeholder='Nome'
                        
                        />
                    <Input
                        placeholder='Preço'
                        keyboardType='number-pad'
                    />
                </S.Fields>     
                <Button
                    title='Enviar'
                />
            </S.Form>
        </S.Container>
    )
}

