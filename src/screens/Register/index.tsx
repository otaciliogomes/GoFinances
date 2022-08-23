import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'

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
    const navigation = useNavigation()
    const [transactionType, setTransactionType] = useState('category')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    } as CategoryProps)

    const dataKey = '@gofinances:transaction'

    const {
        control,
        handleSubmit,
        reset,
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

    async function handleRegister(form: FormData) {
        if (!transactionType)
            return Alert.alert('Selecione o tipo de transação')

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria')

        const newTransaction = {
            id: uuid.v4(),
            name: form.name,
            amount: form.amount,
            category: category.key,
            transactionType,
            date: new Date(),
            type: transactionType
        }

        try {
            const data = await AsyncStorage.getItem(dataKey)
            const currentData = data ? JSON.parse(data) : []

            const dataFormatted = [
                ...currentData,
                newTransaction
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

            setTransactionType('')
            setCategory({
                key: 'category',
                name: 'Categoria'
            })
            reset()
            navigation.navigate('Dashboard')
        } catch (err) {
            console.log(err)
            Alert.alert('Não foi possível salvar')
        }


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
                            error={errors.name! && errors.name.message!}
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

