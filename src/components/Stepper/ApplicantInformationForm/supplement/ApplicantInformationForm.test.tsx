import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { QueryClient, QueryClientContext } from "@tanstack/react-query";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { APIProvider as GooglePlacesAPIProvider } from "@vis.gl/react-google-maps";

import ApplicantInformationForm from "@/components/Stepper/ApplicantInformationForm";
import {
  STEPPER_CONTEXT_DEFAULT_VALUES,
  StepperContext,
  StepperContextType,
} from "@/context/StepperContext";

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

const contextWrappedCustomRender = (
  children: ReactNode,
  stepperContextProps: StepperContextType,
) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientContext.Provider value={queryClient}>
      <GooglePlacesAPIProvider
        apiKey={process.env.GOOGLE_MAPS_API_KEY as string}
      >
        <StepperContext.Provider value={stepperContextProps}>
          {children}
        </StepperContext.Provider>
      </GooglePlacesAPIProvider>
    </QueryClientContext.Provider>,
  );
};

describe("ApplicantInformationForm", () => {
  let nameField: FormElement;
  let addressField: FormElement;
  let checkBox1: FormElement;
  let checkBox2: FormElement;
  let confirmButton: FormElement;
  let manualAddressToggler: FormElement;

  beforeEach(() => {
    contextWrappedCustomRender(
      <ApplicantInformationForm />,
      STEPPER_CONTEXT_DEFAULT_VALUES,
    );

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
    test("name field renders, shows errors and functions properly", async () => {
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

    test("address field renders, shows errors and functions properly", async () => {
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
    let provinceField: FormElement;
    let countrySelectDropdown: FormElement;

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
      provinceField = (await screen.findByRole("textbox", {
        name: "pages.applicantInformation.form.province",
      })) as FormElement;
      countrySelectDropdown = screen.getByTestId("country-select-dropdown");
    });

    test("postal code field renders, shows errors and functions properly", async () => {
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

    test("street address field renders, shows errors and functions properly", async () => {
      await act(async () => {
        fireEvent.blur(streetAddressField);
      });

      expect(
        screen.getByText("pages.applicantInformation.form.errors.required"),
      ).toBeInTheDocument();

      await userEvent.type(streetAddressField, "hello");
      expect(streetAddressField).toHaveValue("hello");
    });

    test("city field renders, shows errors and functions properly", async () => {
      await act(async () => {
        fireEvent.blur(cityField);
      });

      expect(
        screen.getByText("pages.applicantInformation.form.errors.required"),
      ).toBeInTheDocument();

      await userEvent.type(cityField, "hello");
      expect(cityField).toHaveValue("hello");
    });

    test("province field renders, shows errors and functions properly", async () => {
      await act(async () => {
        fireEvent.blur(provinceField);
      });

      expect(
        screen.queryByText("pages.applicantInformation.form.errors.required"),
      ).not.toBeInTheDocument();

      await userEvent.type(provinceField, "hel");
      await act(async () => {
        fireEvent.blur(provinceField);
      });
      expect(
        screen.queryByText(
          "pages.applicantInformation.form.errors.provinceCharacterLength",
        ),
      ).not.toBeInTheDocument();
      await userEvent.type(provinceField, "lo");
      expect(provinceField).toHaveValue("hello");
    });

    test("country dropdown renders and functions properly", async () => {
      expect(countrySelectDropdown).toBeInTheDocument();

      const triggerBtn = within(countrySelectDropdown).getByRole("button");
      expect(triggerBtn).toBeInTheDocument();

      const selectCountryFromDropdown = async (optionIndex: number) => {
        await userEvent.click(triggerBtn);

        const countryOptionsWrapper = await within(
          countrySelectDropdown,
        ).findByTestId("select-dropdown-options-wrapper");

        expect(countryOptionsWrapper).toBeInTheDocument();

        const optionLabel = countryOptionsWrapper.children[optionIndex]
          .textContent as string;
        await userEvent.click(countryOptionsWrapper.children[optionIndex]);

        const selectDisplay = await within(countrySelectDropdown).findByTestId(
          "select-dropdown-display",
        );

        expect(selectDisplay).toHaveTextContent(optionLabel);
        expect(countryOptionsWrapper).not.toBeInTheDocument();
      };

      await selectCountryFromDropdown(0);
      await selectCountryFromDropdown(4);
    });
  });
});
