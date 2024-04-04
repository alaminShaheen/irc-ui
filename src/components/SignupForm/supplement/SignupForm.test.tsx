import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignupForm from "../SignupForm";

type FormElement = HTMLInputElement | HTMLButtonElement | HTMLLabelElement;

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

describe("SignupForm", () => {
  let firstNameField: FormElement;
  let lastNameField: FormElement;
  let emailField: FormElement;
  let phoneNumberField: FormElement;
  let createPasswordField: FormElement;
  let signupButton: FormElement;
  let checkBox1: FormElement;
  let checkBox2: FormElement;

  beforeEach(() => {
    render(
      <Router>
        <SignupForm />,
      </Router>,
    );

    firstNameField = screen.getByLabelText(
      /pages.signup.signupForm.form.firstName/,
    ) as FormElement;
    lastNameField = screen.getByLabelText(
      /pages.signup.signupForm.form.lastName/,
    ) as FormElement;
    emailField = screen.getByLabelText(/pages.signup.signupForm.form.email/);
    phoneNumberField = screen.getByLabelText(
      /pages.signup.signupForm.form.phoneNumber/,
    ) as FormElement;
    createPasswordField = screen.getByLabelText(
      /pages.signup.signupForm.form.createPassword/,
    ) as FormElement;
    signupButton = screen.getByText(
      /pages.signup.signupForm.form.signUp/,
    ) as FormElement;
    checkBox1 = screen.getByLabelText(
      "pages.signup.signupForm.form.checkbox1Label",
    ) as FormElement;
    checkBox2 = screen.getByLabelText(
      "pages.signup.signupForm.form.checkbox2Label",
    ) as FormElement;
  });

  screen.debug();

  it("renders all form elements", () => {
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(phoneNumberField).toBeInTheDocument();
    expect(createPasswordField).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  screen.debug();

  it("disables signup button until all fields and checkboxes are completed", async () => {
    expect(signupButton).toBeDisabled();

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
      target: { value: "(123)456-7890" },
    });
    fireEvent.change(createPasswordField, {
      target: { value: "password123" },
    });

    fireEvent.click(checkBox1);
    fireEvent.click(checkBox2);

    expect(signupButton).toBeEnabled();
  });

  it("enables the signup button when all fields are valid", async () => {
    fireEvent.change(firstNameField),
      {
        target: { value: "John" },
      };
    fireEvent.change(lastNameField),
      {
        target: { value: "Doe" },
      };
    fireEvent.change(emailField),
      {
        target: { value: "john.doe@example.com" },
      };
    fireEvent.change(phoneNumberField),
      {
        target: { value: "(123)456-7890" },
      };
    fireEvent.change(createPasswordField),
      {
        target: { value: "Password123" },
      };
    fireEvent.click(checkBox1!);
    fireEvent.click(checkBox2!);

    await waitFor(() => {
      expect(signupButton).not.toBeDisabled();
    });
  });
});
