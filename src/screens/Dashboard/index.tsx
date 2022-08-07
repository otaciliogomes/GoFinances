import React, { useEffect, useState, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { HighlightCard, TransactionCard, TransactionCardProps } from '../../components'
import * as S from './styles'

export interface DataTransactionList extends TransactionCardProps {
  id: string
}

interface HighlightCardProps {
  total: string
  lastTransaction: string
}
interface HighlightCardsData {
  expensive: HighlightCardProps
  entries: HighlightCardProps
  total: HighlightCardProps
}



export const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DataTransactionList[]>([])
  const [highlightCardsData, setHighlightCardsData] = useState<HighlightCardsData>({} as HighlightCardsData)

  const theme = useTheme()


  function getLastTransactionDate(
    collection: DataTransactionList[],
    type: 'up' | 'down'
  ) {
    const lastTransaction = new Date(
      Math.max.apply(Math, collection
        .filter(item => item.type === type)
        .map(item => new Date(item.date).getTime())
      ))



    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
      month: 'long'
    })}`
  }

  async function loadTransaction() {
    const dataKey = '@gofinances:transaction'

    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response!) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: DataTransactionList[] = transactions
      .map((item: DataTransactionList) => {

        if (item?.type === 'up') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          type: item.type,
          category: item.category,
          date,
          amount,
        }
      })

    const lastTransactionEntries = getLastTransactionDate(transactions, 'up')
    const lastTransactionExpensive = getLastTransactionDate(transactions, 'down')
    const totalInterval = `01 a ${lastTransactionExpensive}`

    const total = entriesTotal - expensiveTotal

    setHighlightCardsData({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Ultima entrada dia ${lastTransactionEntries}`
      },
      expensive: {
        total: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Ultima saída dia ${lastTransactionExpensive}`
      },
      total: {
        total: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })



    setData(transactionsFormatted)
    setLoading(false)
  }

  useEffect(() => {
    loadTransaction()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransaction()
  }, []))

  return (
    <S.Container>
      {loading ?
        <S.ContainerLoading>
          <ActivityIndicator
            size={'large'}
            color={theme.colors.primary}
          />
        </S.ContainerLoading>
        : (
          <>
            <S.Header>
              <S.UserWrap>
                <S.UserInfo>
                  <S.Photo source={{ uri: 'https://avatars.githubusercontent.com/u/553862?v=4' }} />
                  <S.User>
                    <S.UserGreeting>Olá, </S.UserGreeting>
                    <S.UserName>Otacílio</S.UserName>
                  </S.User>
                </S.UserInfo>
                <S.LogoutButton onPress={() => { }}>
                  <S.Icon name="power" />
                </S.LogoutButton>
              </S.UserWrap>
            </S.Header>
            <S.HighlightCards>
              <HighlightCard
                type='up'
                title='Entradas'
                amount={highlightCardsData?.entries?.total}
                lastTransaction={highlightCardsData?.entries?.lastTransaction}
              />
              <HighlightCard
                type='down'
                title='Saídas'
                amount={highlightCardsData?.expensive?.total}
                lastTransaction={highlightCardsData?.expensive?.lastTransaction}
              />
              <HighlightCard
                type='total'
                title='Total'
                amount={highlightCardsData.total.total}
                lastTransaction={highlightCardsData.total.lastTransaction}
              />
            </S.HighlightCards>

            <S.Transaction>
              <S.Title>Listagem</S.Title>

              <S.TransactionList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />

            </S.Transaction>
          </>
        )}
    </S.Container>
  )
}

