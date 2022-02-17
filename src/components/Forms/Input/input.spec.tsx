import React from "react";

import { render } from "@testing-library/react-native";

import { Input } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/Styles/theme";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("input-component", () => {
  it("must have border color when active", () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="email"
        keyboardType="email-address"
        autoCorrect={false}
        active
      />,
      {
        wrapper: Providers,
      }
    );

    const inputComponent = getByTestId("input-email");
    expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.attention);
  });
});
