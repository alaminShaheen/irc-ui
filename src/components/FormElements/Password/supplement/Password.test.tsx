import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormContext } from "react-hook-form";
import Password from "../Password";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mocking useFormContext
jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"), // Preserve other functionalities
  useFormContext: jest.fn(),
}));

const mockUseFormContext = useFormContext as jest.Mock;

describe("Password component", () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    mockUseFormContext.mockReset();

    // Mock useFormContext to return empty errors by default
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: { errors: {} },
    });

    render(<Password label="Password" />);
  });

  it("renders without errors", () => {
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("show error for empty password", async () => {
    // Mock useFormContext to return validation schema
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: {
        errors: { password: { message: "Password required" } },
      },
    });

    render(<Password label="Password" />);
    const passwordInput = screen.getByLabelText("Password");

    await act(async () => {
      fireEvent.blur(passwordInput);
    });

    const errorMessage = screen.queryByTestId("password-error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("show error for invalid password", async () => {
    // Mock useFormContext to return validation schema
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: {
        errors: { password: { message: "Invalid password" } },
      },
    });

    render(<Password label="Password" />);
    const passwordInput = screen.getByLabelText("Password");

    await userEvent.type(passwordInput, "badpass");
    await act(async () => {
      fireEvent.blur(passwordInput);
    });

    const errorMessage = screen.queryByTestId("password-error");
    expect(errorMessage).toBeInTheDocument();
  });
});
