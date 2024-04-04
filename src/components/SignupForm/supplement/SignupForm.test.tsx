import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignupForm from "../SignupForm";

type FormElement = HTMLInputElement | HTMLButtonElement | HTMLLabelElement;

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SignupForm", () => {
  const mockedNavigate = jest.fn();

  let firstNameField: FormElement;
  let lastNameField: FormElement;
  let emailField: FormElement;
  let phoneNumberField: FormElement;
  let createPasswordField: FormElement;
  let signupButton: FormElement;
  let checkBox1: FormElement;
  let checkBox2: FormElement;

  beforeEach(() => {
    jest.mocked(useNavigate).mockReturnValue(mockedNavigate);
    mockedNavigate.mockClear();
    render(
      <Router>
        <SignupForm />,
      </Router>,
    );

    firstNameField = screen.getByLabelText(
      "pages.signup.signupForm.form.firstName",
    ) as FormElement;
    lastNameField = screen.getByLabelText(
      "pages.signup.signupForm.form.lastName",
    ) as FormElement;
    emailField = screen.getByLabelText("pages.signup.signupForm.form.email");
    phoneNumberField = screen.getByLabelText(
      "pages.signup.signupForm.form.phoneNumber",
    ) as FormElement;
    createPasswordField = screen.getByLabelText(
      "pages.signup.signupForm.form.createPassword",
    ) as FormElement;
    signupButton = screen.getByText(
      "pages.signup.signupForm.form.signUp",
    ) as FormElement;
    checkBox1 = screen.getByLabelText(
      "pages.signup.signupForm.form.checkbox1Label",
    ) as FormElement;
    checkBox2 = screen.getByLabelText(
      "pages.signup.signupForm.form.checkbox2Label",
    ) as FormElement;
  });

  it("renders all form elements", () => {
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(phoneNumberField).toBeInTheDocument();
    expect(createPasswordField).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it("navigates to the identity confirmation on authentication button click", async () => {
    const appleButton = screen
      .getByText("Apple Logo")
      .closest("button") as HTMLButtonElement;

    await userEvent.click(appleButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/confirm_identity");
  });

  it("disables signup button until all fields and checkboxes are completed", async () => {
    expect(signupButton).toBeDisabled();
  });

  it("formats the phone number input as (xxx) xxx-xxxx when typing", async () => {
    const phoneNumberField = screen.getByLabelText(
      "pages.signup.signupForm.form.phoneNumber",
    ) as HTMLInputElement;

    await userEvent.type(phoneNumberField, "1234567890");

    expect(phoneNumberField.value).toBe("(123) 456-7890");
  });

  it("shows errors for password field when criteria are not met", async () => {
    await act(async () => {
      fireEvent.change(createPasswordField, {
        target: { value: "badpass" },
      });
      fireEvent.blur(createPasswordField);
    });

    () => {
      expect(
        screen.getByText("pageContent.minimumCharacters"),
      ).toBeInTheDocument();
      expect(screen.getByText("pageContent.uppercase")).toBeInTheDocument();
      expect(screen.getByText("pageContent.numbers")).toBeInTheDocument();
    };
  });

  it("enables the signup button when all fields are valid", async () => {
    await act(async () => {
      fireEvent.change(firstNameField, {
        target: { value: "John" },
      });
      fireEvent.change(lastNameField, {
        target: { value: "Doe" },
      });
      fireEvent.change(emailField, {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(phoneNumberField, {
        target: { value: "(123) 456-7890" },
      });
      fireEvent.change(createPasswordField, {
        target: { value: "Password123" },
      });
      fireEvent.click(checkBox1);
      fireEvent.click(checkBox2);
    });

    await waitFor(() => {
      expect(signupButton).toBeEnabled();
    });
  });

  it("navigates to the base step form on form submit", async () => {
    await act(async () => {
      fireEvent.change(firstNameField, {
        target: { value: "John" },
      });
      fireEvent.change(lastNameField, {
        target: { value: "Doe" },
      });
      fireEvent.change(emailField, {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(phoneNumberField, {
        target: { value: "(123) 456-7890" },
      });
      fireEvent.change(createPasswordField, {
        target: { value: "Password123" },
      });
      fireEvent.click(checkBox1);
      fireEvent.click(checkBox2);
    });

    await waitFor(() => {
      expect(signupButton).toBeEnabled();
    });

    await userEvent.click(signupButton);
    expect(mockedNavigate).toHaveBeenCalledWith("/form");
  });
});
