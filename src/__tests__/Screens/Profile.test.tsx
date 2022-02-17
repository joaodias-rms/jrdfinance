import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe("Profile-Screen", () => {
  it("should have corectly username input placeholder", () => {
    const { getByPlaceholderText } = render(<Profile />);
    const inputName = getByPlaceholderText("Nome");

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it("should have loaded user data correctly", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurName = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("João");
    expect(inputSurName.props.value).toEqual("Dias");
  });

  it("should exist title render", () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId("text-title");

    expect(textTitle.props.children).toContain("Perfil");
  });
});
