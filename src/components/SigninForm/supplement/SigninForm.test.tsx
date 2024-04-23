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
import SigninForm from "@/components/SigninForm";
import ROUTES from "@/constants/Routes";

type FormElement = HTMLInputElement | HTMLButtonElement | HTMLLabelElement;

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

describe("SigninForm", () => {
  const mockedNavigate = jest.fn();

  let emailField: FormElement;
  let passwordField: FormElement;
  let loginButton: FormElement;

  beforeEach(() => {
    jest.mocked(useNavigate).mockReturnValue(mockedNavigate);
    mockedNavigate.mockClear();
    render(
      <Router>
        <SigninForm />,
      </Router>,
    );

    emailField = screen.getByLabelText("pages.signin.signinForm.form.email");
    passwordField = screen.getByLabelText(
      "pages.signin.signinForm.form.password",
    ) as FormElement;
    loginButton = screen.getByText(
      "pages.signin.signinForm.form.logIn",
    ) as FormElement;
  });

  it("renders all form elements", () => {
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("navigates to the identity confirmation on authentication button click", async () => {
    const appleButton = screen
      .getByText("Apple Logo")
      .closest("button") as HTMLButtonElement;

    await userEvent.click(appleButton);

    expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.IDENTITY_CONFIRM);
  });

  it("disables signup button until all fields and checkboxes are completed", () => {
    expect(loginButton).toBeDisabled();
  });

  it("displays validation errors when fields are empty", async () => {
    await userEvent.click(loginButton);

    () => {
      expect(screen.getAllByText("This field is required")).toHaveLength(2);
    };
  });

  it("enables the signup button when all fields are valid and navigates to the base step form on form submit", async () => {
    await act(async () => {
      fireEvent.change(emailField, {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(passwordField, {
        target: { value: "Password123" },
      });
    });

    await waitFor(() => {
      expect(loginButton).toBeEnabled();
    });

    await userEvent.click(loginButton);
    expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.STEPPER_FORM.BASE);
  });
});
