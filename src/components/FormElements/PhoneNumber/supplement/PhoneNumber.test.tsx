import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormContext } from "react-hook-form";
import PhoneNumber from "../PhoneNumber";

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

describe("PhoneNumber component", () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    mockUseFormContext.mockReset();

    // Mock useFormContext to return empty errors by default
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: { errors: {} },
    });

    render(<PhoneNumber label="PhoneNumber" />);
  });

  it("renders without errors", () => {
    const phoneNumberInput = screen.getByLabelText("PhoneNumber");
    expect(phoneNumberInput).toBeInTheDocument();
  });

  it("show error for empty phone number", async () => {
    // Mock useFormContext to return validation schema
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: {
        errors: { phoneNumber: { message: "Phone number required" } },
      },
    });

    render(<PhoneNumber label="PhoneNumber" />);
    const phoneNumberInput = screen.getByLabelText("PhoneNumber");

    await act(async () => {
      fireEvent.blur(phoneNumberInput);
    });

    const errorMessage = screen.queryByTestId("phoneNumber-error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("show error for invalid phone number", async () => {
    // Mock useFormContext to return validation schema
    mockUseFormContext.mockReturnValueOnce({
      register: jest.fn(),
      formState: {
        errors: { phoneNumber: { message: "Invalid phone number" } },
      },
    });

    render(<PhoneNumber label="PhoneNumber" />);
    const phoneNumberInput = screen.getByLabelText("PhoneNumber");

    await userEvent.type(phoneNumberInput, "12344");
    await act(async () => {
      fireEvent.blur(phoneNumberInput);
    });

    const errorMessage = screen.queryByTestId("phoneNumber-error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("accepts only 11 digits as input", async () => {
    const wrongInput = "@!#,s u h12bu1h 2b121111928392839238jh21jh12";
    const correctInput = Array.from(wrongInput)
      .filter((char) => char.match(/\d+/))
      .slice(0, 10)
      .join("");

    const phoneNumberInput = screen.getByLabelText("PhoneNumber");
    await userEvent.type(phoneNumberInput, wrongInput);

    expect((phoneNumberInput as HTMLInputElement).value).toBe(correctInput);
    expect((phoneNumberInput as HTMLInputElement).value).toHaveLength(10);
  });
});
