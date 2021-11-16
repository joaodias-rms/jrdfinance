import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
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
import theme from "../../global/Styles/theme";

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [isLoading, setIsloading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setIsloading(true);
     return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível realizar o login em sua conta Google");
    } finally {
      setIsloading(false);
    }
  }
  async function handleSignInWithApple() {
    try {
      setIsloading(true);
     return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível realizar o login em sua conta Apple");
    } finally {
      setIsloading(false);
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
          {Platform.OS === "ios" ? (
            <>
              <SignInSocialButton
                title="Entrar com Apple"
                svg={Apple}
                onPress={handleSignInWithApple}
              />
              <SignInSocialButton
                title="Entrar com Google"
                svg={Google}
                onPress={handleSignInWithGoogle}
              />
            </>
          ) : (
            <SignInSocialButton
              title="Entrar com Google"
              svg={Google}
              onPress={handleSignInWithGoogle}
            />
          )}
        </ButtonWrapper>
        {isLoading && (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        )}
      </Footer>
    </Container>
  );
}
