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

  describe("Email validations", () => {
    it("show error for invalid email", async () => {
      await act(async () => {
        fireEvent.change(emailField, {
          target: { value: "agh2345$@adhfj.asdda" },
        });
        fireEvent.blur(emailField);
      });

      expect(
        screen.getByText("pages.confirmIdentity.form.errors.invalidEmail"),
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
        screen.queryByText("pages.confirmIdentity.form.errors.invalidEmail"),
      ).not.toBeInTheDocument();
    });

    it("show error for empty email", async () => {
      await act(async () => {
        fireEvent.blur(emailField);
      });

      expect(
        screen.getByText("pages.confirmIdentity.form.errors.fieldRequired"),
      ).toBeInTheDocument();
    });
  });

  describe("Phone number validations", () => {
    it("show error for empty phone number", async () => {
      await act(async () => {
        fireEvent.blur(phoneNumberField);
      });

      expect(
        screen.getByText("pages.confirmIdentity.form.errors.fieldRequired"),
      ).toBeInTheDocument();
    });

    it("show error for invalid phone number", async () => {
      await userEvent.type(phoneNumberField, "12344");
      await act(async () => {
        fireEvent.blur(phoneNumberField);
      });

      expect(
        screen.getByText(
          "pages.confirmIdentity.form.errors.phoneNumberMinLength",
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

  test("Submit button remains disabled until all fields are populated", async () => {
    await userEvent.type(phoneNumberField, "12345678901");
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

    act(() => {
      fireEvent.blur(emailField);
    });
    await waitFor(() => {
      expect(
        screen.queryAllByText(
          "pages.confirmIdentity.form.errors.fieldRequired",
        ),
      ).toHaveLength(3);
    });

    act(() => {
      fireEvent.blur(phoneNumberField);
    });
    await waitFor(() => {
      expect(
        screen.queryAllByText(
          "pages.confirmIdentity.form.errors.fieldRequired",
        ),
      ).toHaveLength(4);
    });
  });
});
