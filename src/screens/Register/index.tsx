import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Preencha o nome"),
  amount: Yup.number()
    .typeError("informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("Preencha o valor"),
});

export function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  
  // const navigation = useNavigation();
  const {user} = useAuth();
  
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  
  function handleTransaction(type: "incoming" | "outcoming") {
    setTransactionType(type);
  }
  
  function handleOpenSelectCategory() {
    setCategoryModal(true);
  }
  function handleCloseSelectCategory() {
    setCategoryModal(false);
  }
  
  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo de transação");
    }
    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    try {
      const dataKey = `@jdrfinance:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível cadastrar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastrar</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Movimentação"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                isActive={transactionType === "incoming"}
                onPress={() => handleTransaction("incoming")}
                type="down"
                title="Income"
              />
              <TransactionTypeButton
                isActive={transactionType === "outcoming"}
                onPress={() => handleTransaction("outcoming")}
                type="up"
                title="Outcome"
              />
            </TransactionTypes>
            <CategorySelectButton
              testID="button-category"
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal testID="modal-category" visible={categoryModal}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
