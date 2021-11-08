import React from "react";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  TransactionsList,
  Title,
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

export interface TransactionListProps extends TransactionCardProps{
  id: string;
}

export function Dashboard() {
  const data: TransactionListProps[] = [
    {
      id: '1',
      type: 'incoming',
      title: "Desenvolvimento de site",
      amount: "R$6.500,00",
      date: "01/08/2021",
      category: { name: "Vendas", icon: "dollar-sign" },
    },
    {
      id: '2',
      type: 'outcoming',
      title: "Lanche",
      amount: "R$50,00",
      date: "01/08/2021",
      category: { name: "Alimentação", icon: "coffee" },
    },
    {
      id: '3',
      type: 'incoming',
      title: "Desenvolvimento de app",
      amount: "R$2.500,00",
      date: "01/08/2021",
      category: { name: "Vendas", icon: "dollar-sign" },
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/joaodias-rms.png" }} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>João</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="down"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada em 03 de novembro"
        />
        <HighlightCard
          type="up"
          title="Saídas"
          amount="R$ 2.600,00"
          lastTransaction="Última saída em 03 de novembro"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 15.800,00"
          lastTransaction="Movimento de 01 a 06 de novembro"
        />
      </HighlightCards>
      <Transactions>
        <Title>Movimentações</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item)=> item.id}
          renderItem={({ item }) => <TransactionCard data={item}
          />}
        />
      </Transactions>
    </Container>
  );
}
