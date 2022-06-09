import React, { useState } from 'react'
import { 
    Input , 
    Button, 
    ButtonTransactionType
} from '../../components'

import * as S from './styles'

export const Register = () => {
    const [transactionType, setTransactionType] = useState('')

    function handleTransactionType( type: 'up' | 'down' ) {
        setTransactionType(type)
    }

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
                <S.TransactionTypeContainer>
                    <ButtonTransactionType
                        title='Income'
                        type='up'
                        isActive={transactionType === 'up'}
                        onPress={() => handleTransactionType('up')}
                    />
                    <ButtonTransactionType
                        title='Outcome'
                        type='down'
                        isActive={transactionType === 'down'}
                        onPress={() => handleTransactionType('down')}
                    />
                </S.TransactionTypeContainer>
                </S.Fields>     
                <Button
                    title='Enviar'
                />
            </S.Form>
        </S.Container>
    )
}

