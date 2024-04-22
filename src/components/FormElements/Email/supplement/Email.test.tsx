import { fireEvent, render, screen, act } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import Email from "../Email";

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
  useFormContext: jest.fn(),
}));

const mockUseFormContext = useFormContext as jest.Mock;

describe("Email component", () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    mockUseFormContext.mockReset();
  });

  it("renders without errors", () => {
    // Mock useFormContext to return empty errors
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: { errors: {} },
    });

    render(<Email label="Email" />);

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
  });

  it("renders with validation error", () => {
    // Mock useFormContext to return validation error
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: { errors: { email: { message: "Invalid email" } } },
    });

    render(<Email label="Email" />);

    const errorMessage = screen.getByText("Invalid email");
    expect(errorMessage).toBeInTheDocument();
  });

  it("show error for empty email", async () => {
    // Mock useFormContext to return validation schema
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: { errors: { email: { message: "Invalid email" } } },
    });

    render(<Email label="Email" />);

    const emailInput = screen.getByLabelText("Email");
    await act(async () => {
      fireEvent.blur(emailInput);
    });

    const errorMessage = screen.queryByTestId("email-error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("validates email input", () => {
    // Mock useFormContext to return validation schema
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: { errors: {} },
    });

    render(<Email label="Email" />);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, {
      target: { value: "abc@gmail.com" },
    });

    const errorMessage = screen.queryByTestId("email-error");
    expect(errorMessage).not.toBeInTheDocument();
  });
});
