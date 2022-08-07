import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HighlightCard, TransactionCard, TransactionCardProps } from '../../components'
import * as S from './styles'

export interface DataTransactionList extends TransactionCardProps {
  id: string
}

export const Dashboard = () => {
  const [data, setData] = useState<DataTransactionList[]>([])

  async function loadTransaction() {
    const dataKey = '@gofinances:transaction'

    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response!) : []

    const transactionsFormatted: DataTransactionList[] = transactions.map(
      (item: DataTransactionList) => {
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

    setData(transactionsFormatted)
  }

  useEffect(() => {
    loadTransaction()
  }, [])

  return (
    <S.Container>
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
          amount={'R$ 17.400,00'}
          lastTransaction={'Última entrada dia 13 de abril'}
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount={'R$ 1.259,00'}
          lastTransaction={'Última saída dia 03 de abril'}
        />
        <HighlightCard
          type='total'
          title='Total'
          amount={'R$ 16.141,00'}
          lastTransaction={'01 à 16 de abril'}
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

    </S.Container>
  )
}

