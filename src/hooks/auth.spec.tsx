import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "jest-mock";
import { AuthProvider, useAuth } from "./auth";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("expo-auth-session");

describe("Auth-Hook", () => {
  it("should be able to sign in with a valid google account", async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "any_email",
        email: "jvd.ramos@hotmail.com",
        name: "João Victor",
        photo: "any_photo.png",
      })
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => await result.current.signInWithGoogle());

    expect(result.current.user.email)
    .toBe("jvd.ramos@hotmail.com");
  });
});
