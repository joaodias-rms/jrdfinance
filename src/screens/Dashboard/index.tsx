import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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
  LogoutButton,
  LoadContainer
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { useEffect } from "react";
import theme from "../../global/Styles/theme";

export interface TransactionListProps extends TransactionCardProps {
  id: string;
}

interface HighlightCardProps {
  amount: string;
}
interface HighlightCardData {
  entries: HighlightCardProps;
  expenses: HighlightCardProps;
  total: HighlightCardProps;
}

export function Dashboard() {
  const [isLoadign, setIsLoadign] = useState(true);
  const [data, setData] = useState<TransactionListProps[]>([]);
  const [highlighCardData, setHighlightCardData] = useState<HighlightCardData>(
    {} as HighlightCardData
  );

  async function loadTransactions() {
    const dataKey = "@jrdfinance:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesSum = 0;
    let expensesSum = 0;

    const transactionsFormatted: TransactionListProps = transactions.map(
      (item: TransactionListProps) => {
        if (item.type === "incoming") {
          entriesSum += Number(item.amount);
        } else {
          expensesSum += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    setData(transactionsFormatted);

    const total = entriesSum - expensesSum;

    setHighlightCardData({
      entries: {
        amount: entriesSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expenses: {
        amount: expensesSum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
    setIsLoadign(false)
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoadign ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.secondary} size="large"/>
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{ uri: "https://github.com/joaodias-rms.png" }}
                />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>João</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="down"
              title="Entradas"
              amount={highlighCardData.entries.amount}
              lastTransaction="Última entrada em 03 de novembro"
            />
            <HighlightCard
              type="up"
              title="Saídas"
              amount={highlighCardData.expenses.amount}
              lastTransaction="Última saída em 03 de novembro"
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlighCardData.total.amount}
              lastTransaction="Movimento de 01 a 06 de novembro"
            />
          </HighlightCards>
          <Transactions>
            <Title>Movimentações</Title>
            <TransactionsList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
