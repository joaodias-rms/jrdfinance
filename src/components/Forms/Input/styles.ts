import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  active: boolean;
}

export const Container = styled(TextInput)<Props>`
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text_dark};

  width: 100%;
  padding: 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  border-radius: 5px;
  margin-bottom: 8px;

  ${({ active, theme }) => active && css`
    border-width: 3px;
    border-color: ${theme.colors.attention}
  `}
`;
