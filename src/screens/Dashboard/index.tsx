import React from 'react'



import * as S from './styles'

export const Dashboard = () => {
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
          <S.Icon name="power"/>
        </S.UserWrap>
      </S.Header>
    
    </S.Container>
  )
}

