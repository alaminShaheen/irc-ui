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
import ROUTES from "@/constants/Routes";

type FormElement = HTMLInputElement | HTMLButtonElement | HTMLLabelElement;

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
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

    expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.IDENTITY_CONFIRM);
  });

  it("disables signup button until all fields and checkboxes are completed", () => {
    expect(signupButton).toBeDisabled();
  });

  describe("Email validations", () => {
    it("show error for invalid email", async () => {
      await act(async () => {
        fireEvent.change(emailField, {
          target: { value: "agh2345$@adhfj.asdda" },
        });
        fireEvent.blur(emailField);
      });

      expect(
        screen.getByText("pages.signup.signupForm.form.errors.invalidEmail"),
      ).toBeInTheDocument();
    });

    it("don't show errors for valid email", async () => {
      await act(async () => {
        fireEvent.change(emailField, {
          target: { value: "agh23_45@adhfj.asd" },
        });
        fireEvent.blur(emailField);
      });

      expect(
        screen.queryByText("pages.signup.signupForm.form.errors.invalidEmail"),
      ).not.toBeInTheDocument();
    });

    it("show error for empty email", async () => {
      await act(async () => {
        fireEvent.blur(emailField);
      });

      expect(
        screen.getByText("pages.signup.signupForm.form.errors.fieldRequired"),
      ).toBeInTheDocument();
    });
  });

  describe("Phone number validations", () => {
    it("show error for empty phone number", async () => {
      await act(async () => {
        fireEvent.blur(phoneNumberField);
      });

      expect(
        screen.getByText("pages.signup.signupForm.form.errors.fieldRequired"),
      ).toBeInTheDocument();
    });

    it("show error for invalid phone number", async () => {
      await userEvent.type(phoneNumberField, "12344");
      await act(async () => {
        fireEvent.blur(phoneNumberField);
      });

      expect(
        screen.getByText(
          "pages.signup.signupForm.form.errors.phoneNumberMinLength",
        ),
      ).toBeInTheDocument();
    });

    it("accepts only 11 digits as input", async () => {
      const wrongInput = "@!#,s u h12bu1h 2b121111928392839238jh21jh12";
      const correctInput = Array.from(wrongInput)
        .filter((char) => char.match(/\d+/))
        .slice(0, 11)
        .join("");
      await userEvent.type(phoneNumberField, wrongInput);
      expect((phoneNumberField as HTMLInputElement).value).toBe(correctInput);
      expect((phoneNumberField as HTMLInputElement).value).toHaveLength(11);
    });
  });

  it("shows errors for password field when criteria are not met", async () => {
    await userEvent.type(phoneNumberField, "badpass");

    await act(async () => {
      fireEvent.blur(createPasswordField);
    });

    expect(
      screen.getByText("pages.signup.signupForm.form.minimumCharacters"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.signup.signupForm.form.uppercase"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("pages.signup.signupForm.form.numbers"),
    ).toBeInTheDocument();
  });

  it("enables the signup button when all fields are valid", () => {
    act(() => {
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
        target: { value: "12345678901" },
      });
      fireEvent.change(createPasswordField, {
        target: { value: "Password123" },
      });
      fireEvent.click(checkBox1);
      fireEvent.click(checkBox2);
    });

    expect(signupButton).toBeEnabled();
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
        target: { value: "12345678901" },
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
    expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.STEPPER_FORM.BASE);
  });
});
