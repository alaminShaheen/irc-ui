import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InsuredForm from "../InsuredForm";

const mockContent = {
  nameOfInsuredLabel: "Name of Insured",
  addressOfInsuredLabel: "Address of Insured",
  telephoneNumLabel: "Telephone Number",
  emailAddressLabel: "Email Address",
};

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
    const nameInput = screen.getByLabelText("Name of Insured");

    userEvent.type(nameInput, "John");

    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(onSaveMock).toHaveBeenCalled();
    });
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    userEvent.click(cancelButton);

    await waitFor(() => {
      expect(onCancelMock).toHaveBeenCalled();
    });
  });
});
