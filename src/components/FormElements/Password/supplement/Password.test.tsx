import * as yup from "yup";
import userEvent from "@testing-library/user-event";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { act, fireEvent, render, screen } from "@testing-library/react";

import Password from "@/components/FormElements/Password";
import { TPasswordModel } from "@/components/FormElements/Password/Password.d";
import { passwordValidationSchema } from "@/components/FormElements/ValidationSchemas";

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

describe("Password component", () => {
  const labelText = "Hello world";

  const TestPasswordInput = () => {
    const methods = useForm<TPasswordModel>({
      mode: "onBlur",
      resolver: yupResolver(
        yup.object().shape({ password: passwordValidationSchema }),
      ),
    });

    return (
      <FormProvider {...methods}>
        <Password label={labelText} />
      </FormProvider>
    );
  };

  beforeEach(() => {
    render(<TestPasswordInput />);
  });

  it("renders without errors", () => {
    const passwordInput = screen.getByLabelText(labelText);
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders with proper label", () => {
    const labelElement = screen.getByLabelText(labelText);
    expect(labelElement).toBeInTheDocument();
  });

  it("shows error for empty password", async () => {
    const passwordInput = screen.getByLabelText(labelText);

    await act(async () => {
      fireEvent.blur(passwordInput);
    });

    const errorMessage = screen.queryByText("common.form.errors.fieldRequired");
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows error for invalid password", async () => {
    const passwordInput = screen.getByLabelText(labelText);

    await userEvent.type(passwordInput, "badpass");
    await act(async () => {
      fireEvent.blur(passwordInput);
    });

    const minCharactersErrorMessage = screen.getByText(
      "common.form.errors.passwordMinCharacters",
    );
    expect(minCharactersErrorMessage).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "n0uppercase");
    await act(async () => {
      fireEvent.blur(passwordInput);
    });

    const noUppercaseErrorMessage = screen.getByText(
      "common.form.errors.passwordUppercaseCharacters",
    );
    expect(noUppercaseErrorMessage).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "N0LOWERCASE");
    await act(async () => {
      fireEvent.blur(passwordInput);
    });

    const noLowercaseErrorMessage = screen.getByText(
      "common.form.errors.passwordLowerCharacters",
    );
    expect(noLowercaseErrorMessage).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "noDigits");
    await act(async () => {
      fireEvent.blur(passwordInput);
    });

    const noDigitsErrorMessage = screen.getByText(
      "common.form.errors.passwordNumericCharacters",
    );
    expect(noDigitsErrorMessage).toBeInTheDocument();

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "Inval1d😃");
    await act(async () => {
      fireEvent.blur(passwordInput);
    });

    const invalidCharacterPassword = screen.getByText(
      "common.form.errors.passwordInvalidCharacters",
    );
    expect(invalidCharacterPassword).toBeInTheDocument();
  });
});
