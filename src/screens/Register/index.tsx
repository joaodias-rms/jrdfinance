import React, { useState } from "react";
import { Modal } from "react-native";

import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { CategorySelectInput } from "../../components/Forms/CategorySelectInput";
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

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const [transactionType, setTransactionType] = useState("");
  const [categoryModal, setCategoryModal] = useState(false)

  function handleTransaction(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleOpenSelectCategory(){
    setCategoryModal(true)
  }
  function handleCloseSelectCategory(){
    setCategoryModal(false)
  }


  return (
    <Container>
      <Header>
        <Title>Cadastrar</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypes>
            <TransactionTypeButton
              isActive={transactionType === "down"}
              onPress={() => handleTransaction("down")}
              type="down"
              title="Income"
            />
            <TransactionTypeButton
              isActive={transactionType === "up"}
              onPress={() => handleTransaction("up")}
              type="up"
              title="Outcome"
            />
          </TransactionTypes>
          <CategorySelectInput title="Categoria" onPress={handleOpenSelectCategory}/>
        </Fields>
        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModal}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategory}

        />
      </Modal>
    </Container>
  );
}
