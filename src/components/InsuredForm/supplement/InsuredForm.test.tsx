import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InsuredForm from "../InsuredForm";

const mockContent = {
  nameOfInsuredLabel: "Name of Insured",
  addressOfInsuredLabel: "Address of Insured",
  telephoneNumLabel: "Telephone Number",
  emailAddressLabel: "Email Address",
};

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en", changeLanguage: () => new Promise(() => {}) },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

describe("InsuredForm", () => {
  const onSaveMock = jest.fn();
  const onCancelMock = jest.fn();

  beforeEach(() => {
    render(
      <InsuredForm
        editModeEnabled={true}
        content={mockContent}
        onSave={onSaveMock}
        onCancel={onCancelMock}
      />,
    );
  });

  it("fills and submits the form", async () => {
    const nameInput = screen.getAllByLabelText("Name of Insured")[0];

    await userEvent.type(nameInput, "John");

    const saveButton = screen.getByRole("button", { name: "Save" });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(onSaveMock).toHaveBeenCalled();
    });
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(onCancelMock).toHaveBeenCalled();
    });
  });
});
