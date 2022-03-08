import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Register } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "../../global/Styles/theme";

const Provider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Register-Screen", () => {
  it("should open category modal when user clicks on category button", async () => {
    const { getByTestId } = render(<Register />, { wrapper: Provider });
    const categoryModal = getByTestId("modal-category");
    const categoryButton = getByTestId("button-category");
    fireEvent.press(categoryButton);
    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
