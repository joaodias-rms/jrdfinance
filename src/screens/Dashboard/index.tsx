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
import { TransactionCard } from "../../components/TransactionCard";

export function Dashboard() {
  const data = {
    title: "Desenvolvimento de site",
    amount: "R$6.500,00",
    date: "01/08/2021",
    category: { name: "Vendas", icon: "dollar-sign" },
  };

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
        <TransactionsList />
          <TransactionCard data={data} />

      </Transactions>
    </Container>
  );
}
