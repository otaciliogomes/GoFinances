import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal } from 'react-native'
import {
    Input,
    Button,
    ButtonTransactionType,
    CategorySelectButton,
    InputForm
} from '../../components'
import { CategoryProps, CategorySelect } from '../CategorySelect'

import * as S from './styles'

interface FormData {
    name: string;
    amount: string;
}

export const Register = () => {
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({} as CategoryProps)

    const { 
        control,
        handleSubmit
     } = useForm()

    function handleTransactionType(type: 'up' | 'down') {
        setTransactionType(type)
    }

    function handleCloseModalCategory () {
        setCategoryModalOpen(false)
    }

    function handleOpenModalCategory () {
        setCategoryModalOpen(true)
    }

    function handleSelectCategory (item: CategoryProps) {
        setCategory(item)
    }

    function handleRegister(form: FormData) {
        const data = {
            name: form.name,
            amount: form.amount,
            category: category.name,
            transactionType
        }
        console.log(data);
    }

    return (
        <S.Container>
            <S.Header>
                <S.Title>Cadastro</S.Title>
            </S.Header>
            <S.Form>
                <S.Fields>
                    <InputForm
                        name="name"
                        placeholder='Nome'
                        control={control}
                    />

                    <InputForm
                        name="amount"
                        placeholder='Preço'
                        keyboardType='number-pad'
                        control={control}
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

                    <CategorySelectButton 
                        title={category.name || 'Categoria'}
                        onPress={handleOpenModalCategory}
                    />
                </S.Fields>
                <Button
                    title='Enviar'
                    onPress={handleSubmit(handleRegister)}
                />
            </S.Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    closeCategory={handleCloseModalCategory}
                    setCategory={handleSelectCategory}
                />
            </Modal>

        </S.Container>
    )
}

