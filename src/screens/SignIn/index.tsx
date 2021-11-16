import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../hooks/auth";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import Apple from "../../assets/apple.svg";
import Google from "../../assets/google.svg";
import Logo from "../../assets/logo.svg";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  ButtonWrapper,
} from "./styles";
import { Alert } from "react-native";

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle(){
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível realizar o login')
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <ButtonWrapper>
          <SignInSocialButton title="Entrar com Google" svg={Google} onPress={handleSignInWithGoogle}/>
          <SignInSocialButton title="Entrar com Apple" svg={Apple} />
        </ButtonWrapper>
      </Footer>
    </Container>
  );
}
