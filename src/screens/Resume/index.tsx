import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { VictoryPie } from 'victory-native'

import { HistoryCard, TransactionCardProps } from '../../components'

import { categories } from '../../mock'
import * as S from './styles'
import { useTheme } from 'styled-components'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'


interface CategoryData {
    name: string
    total: number
    totalFormatted: string
    color: string
    percent: string
}

export const Resume = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [categoryData, setCategoryDate] = useState<CategoryData[]>([])

    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1))
        } else {
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }

    async function loadData() {
        const dataKey = '@gofinances:transaction'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
            .filter((expensive: TransactionCardProps) => 
                expensive.type === 'down' &&
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
            )

        const expensiveTotal = responseFormatted
            .reduce((acc: number, item: TransactionCardProps) => {
                return acc + Number(item.amount)
            }, 0)



        const totalByCategory: CategoryData[] = []

        categories.forEach((category) => {
            let categorySum = 0

            expensives.forEach((expensive: TransactionCardProps) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }

            })

            if (categorySum > 0) {
                const percent = `${(categorySum / expensiveTotal * 100).toFixed(1)}%`

                totalByCategory.push({
                    percent,
                    color: category.color,
                    name: category.name,
                    total: categorySum,
                    totalFormatted: categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
                })
            }
        })

        setCategoryDate(totalByCategory)
    }

    useEffect(() => {
        loadData()
    }, [selectedDate])

    useFocusEffect(useCallback(() => {
        loadData()
    }, []))

    return (
        <S.Container>
            <S.Header>
                <S.Title>Resumo por categoria</S.Title>
            </S.Header>
            <S.MothSelect>
                <S.MothSelectButton onPress={() => handleDateChange('prev')}>
                    <S.SelectIcon name="chevron-left" />
                </S.MothSelectButton>

                <S.Month>
                    {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
                </S.Month>

                <S.MothSelectButton onPress={() => handleDateChange('next')}>
                    <S.SelectIcon name="chevron-right" />
                </S.MothSelectButton>
            </S.MothSelect>
            <S.Content>

                <S.ChartContainer>
                    <VictoryPie
                        data={categoryData}
                        colorScale={categoryData.map(category => category.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                            }
                        }}
                        labelRadius={150}
                        x="percent"
                        y="total"
                    />
                </S.ChartContainer>
                {categoryData.map((category, index) => (
                    <HistoryCard
                        key={index}
                        amount={category.totalFormatted}
                        title={category.name}
                        color={category.color}
                    />
                ))}
            </S.Content>
        </S.Container>
    )
}