import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"

import { Modal, TouchableNativeFeedback, Keyboard, Alert } from 'react-native'
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

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('Valor obrigatório')
})

export const Register = () => {
    const [transactionType, setTransactionType] = useState('category')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({} as CategoryProps)

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    function handleTransactionType(type: 'up' | 'down') {
        setTransactionType(type)
    }

    function handleCloseModalCategory() {
        setCategoryModalOpen(false)
    }

    function handleOpenModalCategory() {
        setCategoryModalOpen(true)
    }

    function handleSelectCategory(item: CategoryProps) {
        setCategory(item)
    }

    function handleRegister(form: FormData) {
        if (!transactionType)
            return Alert.alert('Selecione o tipo de transação')

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria')

        const data = {
            name: form.name,
            amount: form.amount,
            category: category.name,
            transactionType
        }
        console.log(data);
    }

    /*
        Consultar a mudança de opacidade ao clicar no background
    */

    return (
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize="sentences"
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="amount"
                            placeholder='Preço'
                            keyboardType='number-pad'
                            control={control}
                            error={errors.amount && errors.amount.message}
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
        </TouchableNativeFeedback>
    )
}

