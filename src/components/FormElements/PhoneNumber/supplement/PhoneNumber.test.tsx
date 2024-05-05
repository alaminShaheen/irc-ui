import * as yup from "yup";
import userEvent from "@testing-library/user-event";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { act, fireEvent, render, screen } from "@testing-library/react";

import PhoneNumber from "@/components/FormElements/PhoneNumber";
import { TPhoneNumberModel } from "@/components/FormElements/PhoneNumber/PhoneNumber.d";
import { phoneNumberValidationSchema } from "@/components/FormElements/ValidationSchemas";

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

describe("PhoneNumber component", () => {
  const labelText = "Hello world";

  const TestPhoneNumberInput = () => {
    const methods = useForm<TPhoneNumberModel>({
      mode: "onBlur",
      resolver: yupResolver(
        yup.object().shape({ phoneNumber: phoneNumberValidationSchema }),
      ),
    });

    return (
      <FormProvider {...methods}>
        <PhoneNumber label={labelText} />
      </FormProvider>
    );
  };

  beforeEach(() => {
    render(<TestPhoneNumberInput />);
  });

  it("renders without errors", () => {
    const phoneNumberInput = screen.getByRole("textbox");
    expect(phoneNumberInput).toBeInTheDocument();
  });

  it("renders with proper label", () => {
    const labelElement = screen.getByLabelText(labelText);
    expect(labelElement).toBeInTheDocument();
  });

  it("shows error for empty phone number", async () => {
    const phoneNumberInput = screen.getByRole("textbox");

    await act(async () => {
      fireEvent.blur(phoneNumberInput);
    });

    const errorMessage = screen.queryByTestId("formError-body");
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows error for invalid phone number", async () => {
    const phoneNumberInput = screen.getByRole("textbox");

    await userEvent.type(phoneNumberInput, "12344");
    await act(async () => {
      fireEvent.blur(phoneNumberInput);
    });

    const errorMessage = screen.queryByTestId("formError-body");
    expect(errorMessage).toBeInTheDocument();
  });

  it("accepts only 11 digits as input", async () => {
    const wrongInput = "@!#,s u h12bu1h 2b121111928392839238jh21jh12";
    const correctInput = Array.from(wrongInput)
      .filter((char) => char.match(/\d+/))
      .slice(0, 10)
      .join("");

    const phoneNumberInput = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(phoneNumberInput, wrongInput);

    expect(phoneNumberInput).toHaveValue(correctInput);
    expect(phoneNumberInput.value).toHaveLength(10);
  });
});
