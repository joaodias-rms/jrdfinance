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
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";

export function Dashboard() {
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
    </Container>
  );
}
