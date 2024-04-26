import * as yup from "yup";
import userEvent from "@testing-library/user-event";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { act, fireEvent, render, screen } from "@testing-library/react";

import Email from "@/components/FormElements/Email";
import { TEmailModel } from "@/components/FormElements/Email/Email.d";
import { emailValidationSchema } from "@/components/FormElements/ValidationSchemas";

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

describe("Email component", () => {
  const labelText = "Hello world";

  const TestEmailInput = () => {
    const methods = useForm<TEmailModel>({
      mode: "onBlur",
      resolver: yupResolver(
        yup.object().shape({ email: emailValidationSchema }),
      ),
    });

    return (
      <FormProvider {...methods}>
        <Email label={labelText} />
      </FormProvider>
    );
  };

  beforeEach(() => {
    render(<TestEmailInput />);
  });

  it("renders without errors", () => {
    const emailInput = screen.getByRole("textbox");
    expect(emailInput).toBeInTheDocument();
  });

  it("renders with proper label", () => {
    const labelElement = screen.getByLabelText(labelText);
    expect(labelElement).toBeInTheDocument();
  });

  it("show error for empty email", async () => {
    const emailInput = screen.getByRole("textbox");

    await act(async () => {
      fireEvent.blur(emailInput);
    });

    const errorMessage = screen.queryByTestId("email-error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("does not throw error for valid email input", async () => {
    const emailInput = screen.getByRole("textbox");

    await userEvent.type(emailInput, "abc@gmail.com");

    const errorMessage = screen.queryByTestId("email-error");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("shows error for invalid email input", async () => {
    const emailInput = screen.getByRole("textbox");

    await userEvent.type(emailInput, "abc");
    await act(async () => {
      fireEvent.blur(emailInput);
    });

    const errorMessage = screen.queryByTestId("email-error");
    expect(errorMessage).toBeInTheDocument();
  });
});
