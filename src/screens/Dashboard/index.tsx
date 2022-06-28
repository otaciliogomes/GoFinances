import React from 'react'
import { HighlightCard, TransactionCard, TransactionCardProps } from '../../components'

import * as S from './styles'

export interface DataTransactionList extends TransactionCardProps {
  id: string
}

export const Dashboard = () => {
  const data: DataTransactionList[] =[
    {
      id: '1',
      type: 'positive',
      title:'Desenvolvimento de site',
      amount:'R$ 1.500,00',
      date:"13/04/2020",
      category:{
        name: 'Vendas',
        icon: 'dollar-sign'
      }
    },
    {
      id: '2',
      type: 'negative',
      title:'Hamburgueria Pizzy',
      amount:'R$ 59,00',
      date:"10/04/2020",
      category:{
        name: 'Alimentação',
        icon: 'coffee'
      }
    }, 
    {
      id: '3',
      type: 'negative',
      title:'Aluguel do apartamento',
      amount:'R$ 1.200,00',
      date:"12/05/2022",
      category:{
        name: 'Casa',
        icon: 'shopping-bag'
      }
    }
  ]
  return (
    <S.Container>
      <S.Header>
        <S.UserWrap>
          <S.UserInfo>
            <S.Photo source={{uri: 'https://avatars.githubusercontent.com/u/553862?v=4'}}/>
            <S.User>
              <S.UserGreeting>Olá, </S.UserGreeting>
              <S.UserName>Otacílio</S.UserName>
            </S.User>
          </S.UserInfo>
          <S.LogoutButton onPress={() => {}}>
            <S.Icon name="power"/>
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
        keyExtractor={ item => item.id}
        renderItem={( { item } ) => <TransactionCard data={item}/>}
      />

    </S.Transaction>

    </S.Container>
  )
}

