import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ConfirmIdentityForm from "@/components/ConfirmIdentityForm";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";

type FormElement = HTMLInputElement | HTMLButtonElement | HTMLLabelElement;

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: () => new Promise(() => {}) },
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

describe("ConfirmIdentityForm", () => {
  const mockNavigate = jest.fn();

  let firstNameField: FormElement;
  let lastNameField: FormElement;
  let emailField: FormElement;
  let phoneNumberField: FormElement;
  let checkBox1: FormElement;
  let checkBox2: FormElement;
  let submitButton: FormElement;

  beforeEach(() => {
    jest.mocked(useNavigate).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
    render(<ConfirmIdentityForm />);

    firstNameField = screen.getByRole("textbox", {
      name: "pages.confirmIdentity.form.firstName",
    });

    lastNameField = screen.getByRole("textbox", {
      name: "pages.confirmIdentity.form.lastName",
    });

    emailField = screen.getByRole("textbox", {
      name: "pages.confirmIdentity.form.email",
    });

    phoneNumberField = screen.getByRole("textbox", {
      name: "pages.confirmIdentity.form.phoneNumber",
    });

    checkBox1 = screen.getByRole("checkbox", {
      name: "common.disclaimer.checkbox1Label",
    });

    checkBox2 = screen.getByRole("checkbox", {
      name: "common.disclaimer.checkbox2Label",
    });

    submitButton = screen.getByRole("button", {
      name: "pages.confirmIdentity.form.confirm",
    });
  });

  test("Form elements render correctly", () => {
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(phoneNumberField).toBeInTheDocument();
    expect(checkBox1).toBeInTheDocument();
    expect(checkBox2).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("Submit button remains disabled until all fields are populated", async () => {
    await userEvent.type(phoneNumberField, "1234567890");
    expect(submitButton).toBeDisabled();
    await userEvent.type(firstNameField, "hello");
    expect(submitButton).toBeDisabled();
    await userEvent.type(lastNameField, "world");
    expect(submitButton).toBeDisabled();
    await userEvent.type(emailField, "hello@world.com");
    expect(submitButton).toBeDisabled();
    await userEvent.click(checkBox1);
    expect(submitButton).toBeDisabled();
    await userEvent.click(checkBox2);
    expect(submitButton).not.toBeDisabled();
  });

  test("Required field validation errors appear for every field on blur", async () => {
    expect(
      screen.queryAllByText("pages.confirmIdentity.form.errors.fieldRequired"),
    ).toHaveLength(0);

    act(() => {
      fireEvent.blur(firstNameField);
    });

    await waitFor(() => {
      expect(
        screen.queryAllByText(
          "pages.confirmIdentity.form.errors.fieldRequired",
        ),
      ).toHaveLength(1);
    });

    act(() => {
      fireEvent.blur(lastNameField);
    });
    await waitFor(() => {
      expect(
        screen.queryAllByText(
          "pages.confirmIdentity.form.errors.fieldRequired",
        ),
      ).toHaveLength(2);
    });
  });
});
