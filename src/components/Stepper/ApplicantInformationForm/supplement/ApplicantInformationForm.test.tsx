import userEvent from "@testing-library/user-event";
import { act, fireEvent, render, screen, within } from "@testing-library/react";

import ApplicantInformationForm from "@/components/Stepper/ApplicantInformationForm";

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

describe("ApplicantInformationForm", () => {
  let nameField: FormElement;
  let addressField: FormElement;
  let checkBox1: FormElement;
  let checkBox2: FormElement;
  let confirmButton: FormElement;
  let manualAddressToggler: FormElement;

  beforeEach(() => {
    render(<ApplicantInformationForm />);

    nameField = screen.getByRole("textbox", {
      name: "pages.applicantInformation.form.name",
    }) as FormElement;
    addressField = screen.getByRole("textbox", {
      name: "pages.applicantInformation.form.address",
    }) as FormElement;
    checkBox1 = screen.getByRole("checkbox", {
      name: "common.disclaimer.checkbox1Label",
    }) as FormElement;
    checkBox2 = screen.getByRole("checkbox", {
      name: "common.disclaimer.checkbox2Label",
    }) as FormElement;
    confirmButton = screen.getByRole("button", {
      name: "pages.applicantInformation.form.confirm",
    }) as FormElement;
    manualAddressToggler = screen.getByRole("button", {
      name: "pages.applicantInformation.form.addAddressManually",
    }) as FormElement;
  });

  test("renders all form elements", () => {
    expect(nameField).toBeInTheDocument();
    expect(addressField).toBeInTheDocument();
    expect(checkBox1).toBeInTheDocument();
    expect(checkBox2).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    expect(manualAddressToggler).toBeInTheDocument();
  });

  test("disables signup button until all fields and checkboxes are completed", () => {
    expect(confirmButton).toBeDisabled();
  });

  describe("before toggling manual address", () => {
    test("name field renders and functions properly", async () => {
      act(() => {
        fireEvent.blur(nameField);
      });

      expect(
        await screen.findByText(
          "pages.applicantInformation.form.errors.required",
        ),
      ).toBeInTheDocument();

      await userEvent.type(nameField, "hello");
      act(() => {
        fireEvent.blur(nameField);
      });
      expect(nameField).toHaveValue("hello");

      expect(
        await screen.findByText(
          "pages.applicantInformation.form.errors.invalidName",
        ),
      );
      await userEvent.type(nameField, "hello world");

      expect(
        screen.getByText("pages.applicantInformation.form.errors.invalidName"),
      ).toBeInTheDocument();
    });

    test("address field renders and functions properly", async () => {
      act(() => {
        fireEvent.blur(addressField);
      });

      expect(
        await screen.findByText(
          "pages.applicantInformation.form.errors.required",
        ),
      ).toBeInTheDocument();

      await userEvent.type(nameField, "hello");
      expect(nameField).toHaveValue("hello");
    });

    test("keeps confirm button disabled until all fields have been filled with values", async () => {
      await userEvent.type(nameField, "hello world");
      expect(confirmButton).toBeDisabled();
      await userEvent.type(addressField, "hello universe");
      expect(confirmButton).toBeDisabled();
      await userEvent.click(checkBox1);
      expect(confirmButton).toBeDisabled();
      await userEvent.click(checkBox2);
      expect(confirmButton).toBeEnabled();
    });
  });

  describe("After toggling manual address", () => {
    let postalCodeField: FormElement;
    let cityField: FormElement;
    let streetAddressField: FormElement;

    beforeEach(async () => {
      act(() => {
        userEvent.click(manualAddressToggler);
      });

      postalCodeField = (await screen.findByRole("textbox", {
        name: "pages.applicantInformation.form.postalCode",
      })) as FormElement;
      cityField = (await screen.findByRole("textbox", {
        name: "pages.applicantInformation.form.city",
      })) as FormElement;
      streetAddressField = (await screen.findByRole("textbox", {
        name: "pages.applicantInformation.form.streetAddress",
      })) as FormElement;
    });

    test("postal code field renders properly", async () => {
      expect(postalCodeField).toBeInTheDocument();
      act(() => {
        fireEvent.blur(postalCodeField);
      });

      expect(
        await screen.findByText(
          "pages.applicantInformation.form.errors.required",
        ),
      );

      await userEvent.type(postalCodeField, "hello");

      act(() => {
        fireEvent.blur(postalCodeField);
      });

      expect(postalCodeField).toHaveValue("hello");
    });

    test("street address field renders properly", async () => {
      await act(async () => {
        fireEvent.blur(streetAddressField);
      });

      expect(
        screen.getByText("pages.applicantInformation.form.errors.required"),
      ).toBeInTheDocument();

      await userEvent.type(streetAddressField, "hello");
      expect(streetAddressField).toHaveValue("hello");
    });

    test("city field renders properly", async () => {
      await act(async () => {
        fireEvent.blur(cityField);
      });

      expect(
        screen.getByText("pages.applicantInformation.form.errors.required"),
      ).toBeInTheDocument();

      await userEvent.type(cityField, "hello");
      expect(cityField).toHaveValue("hello");
    });

    test("country dropdown renders and functions properly", async () => {
      const countrySelectDropdown = screen.getByTestId(
        "country-select-dropdown",
      );
      expect(countrySelectDropdown).toBeInTheDocument();

      const triggerBtn = within(countrySelectDropdown).getByRole("button");
      expect(triggerBtn).toBeInTheDocument();

      await userEvent.click(triggerBtn);

      const countryOptionsWrapper = await within(
        countrySelectDropdown,
      ).findByTestId("select-dropdown-options-wrapper");

      expect(countryOptionsWrapper).toBeInTheDocument();

      const optionLabel = countryOptionsWrapper.children[0]
        .textContent as string;
      await userEvent.click(countryOptionsWrapper.children[0]);

      const selectDisplay = await within(countrySelectDropdown).findByTestId(
        "select-dropdown-display",
      );

      expect(selectDisplay).toHaveTextContent(optionLabel);
    });

    test("province dropdown renders and functions properly", async () => {
      const provinceSelectDropdown = screen.getByTestId(
        "province-select-dropdown",
      );
      expect(provinceSelectDropdown).toBeInTheDocument();

      const provinceTriggerBtn = within(provinceSelectDropdown).getByRole(
        "button",
      );
      expect(provinceTriggerBtn).toBeInTheDocument();
      expect(provinceTriggerBtn).toBeDisabled();

      // Select a country
      const countrySelectDropdown = screen.getByTestId(
        "country-select-dropdown",
      );
      const countryTriggerBtn = within(countrySelectDropdown).getByRole(
        "button",
      );
      await userEvent.click(countryTriggerBtn);
      const countryOptionsWrapper = await within(
        countrySelectDropdown,
      ).findByTestId("select-dropdown-options-wrapper");
      await userEvent.click(countryOptionsWrapper.children[0]);

      // Select a province
      expect(provinceTriggerBtn).toBeEnabled();

      await userEvent.click(provinceTriggerBtn);
      const provinceOptionsWrapper = await within(
        provinceSelectDropdown,
      ).findByTestId("select-dropdown-options-wrapper");

      const optionLabel = provinceOptionsWrapper.children[0]
        .textContent as string;
      await userEvent.click(provinceOptionsWrapper.children[0]);

      const selectDisplay = await within(provinceSelectDropdown).findByTestId(
        "select-dropdown-display",
      );

      expect(selectDisplay).toHaveTextContent(optionLabel);
    });

    test("changing selected country clears selected province", async () => {
      // Select a country
      const countrySelectDropdown = screen.getByTestId(
        "country-select-dropdown",
      );
      const countryTriggerBtn = within(countrySelectDropdown).getByRole(
        "button",
      );
      await userEvent.click(countryTriggerBtn);
      let countryOptionsWrapper = await within(
        countrySelectDropdown,
      ).findByTestId("select-dropdown-options-wrapper");
      await userEvent.click(countryOptionsWrapper.children[0]);

      const provinceSelectDropdown = screen.getByTestId(
        "province-select-dropdown",
      );
      const provinceTriggerBtn = within(provinceSelectDropdown).getByRole(
        "button",
      );
      await userEvent.click(provinceTriggerBtn);

      const provinceOptionsWrapper = await within(
        provinceSelectDropdown,
      ).findByTestId("select-dropdown-options-wrapper");
      await userEvent.click(provinceOptionsWrapper.children[0]);

      const provinceSelectDisplay = await within(
        provinceSelectDropdown,
      ).findByTestId("select-dropdown-display");

      // change country
      await userEvent.click(countryTriggerBtn);
      countryOptionsWrapper = await within(countrySelectDropdown).findByTestId(
        "select-dropdown-options-wrapper",
      );
      await userEvent.click(countryOptionsWrapper.children[1]);

      expect(provinceSelectDisplay).toHaveTextContent(
        "pages.applicantInformation.form.enterProvinceName",
      );
    });
  });
});
