import { FormProvider, useForm } from "react-hook-form";
import { CommonCheckboxes } from "@/models/CommonCheckboxes";
import AgreementCheckboxes from "@/components/AgreementCheckboxes";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

describe("Agreement checkboxes", () => {
  let checkBox1: HTMLInputElement;
  let checkBox2: HTMLInputElement;

  const TestAgreementCheckboxes = () => {
    const methods = useForm<CommonCheckboxes>({
      mode: "onBlur",
    });

    return (
      <FormProvider {...methods}>
        <AgreementCheckboxes />
      </FormProvider>
    );
  };

  beforeEach(() => {
    render(<TestAgreementCheckboxes />);
    checkBox1 = screen.getByRole("checkbox", {
      name: "common.disclaimer.checkbox1Label",
    }) as HTMLInputElement;
    checkBox2 = screen.getByRole("checkbox", {
      name: "common.disclaimer.checkbox2Label",
    }) as HTMLInputElement;
  });

  it("render without errors", () => {
    expect(checkBox1).toBeInTheDocument();
    expect(checkBox2).toBeInTheDocument();
  });

  it("render with proper label", () => {
    const label1Element = screen.getByLabelText(
      "common.disclaimer.checkbox1Label",
    );
    expect(label1Element).toBeInTheDocument();

    const label2Element = screen.getByLabelText(
      "common.disclaimer.checkbox2Label",
    );
    expect(label2Element).toBeInTheDocument();
  });

  it("function properly", async () => {
    await userEvent.click(checkBox1);
    expect(checkBox1).toBeChecked();
    await userEvent.click(checkBox1);
    expect(checkBox1).not.toBeChecked();

    await userEvent.click(checkBox2);
    expect(checkBox2).toBeChecked();
    await userEvent.click(checkBox2);
    expect(checkBox2).not.toBeChecked();
  });
});
