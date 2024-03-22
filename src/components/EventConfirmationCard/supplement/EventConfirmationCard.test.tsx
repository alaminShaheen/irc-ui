import { render, fireEvent, screen } from "@testing-library/react";
import EventConfirmationCard from "../EventConfirmationCard";

// Mock content for the component
const mockContent = {
  numOfEventsTitle: "Number of Events",
  totalPolicyCostTitle: "Total Policy Cost",
  provincialSalesTaxTitle: "Provincial Sales Tax",
  agreement1: "I agree to the coverage exclusions.",
  agreement2Info: "Information about agreement 2",
  agreement2: "I understand my deductible responsibilities.",
  agreement3: "I agree to the professional liability terms.",
  confirmAboveButtonText: "Confirm Above",
  checkoutButtonText: "Checkout",
};

describe("EventConfirmationCard", () => {
  beforeEach(() => {
    render(<EventConfirmationCard content={mockContent} />);
  });

  it("renders without crashing", () => {
    expect(screen.getByText(mockContent.numOfEventsTitle)).toBeInTheDocument();
  });

  it("checks initial state of checkboxes and button", () => {
    const checkbox1 = screen.getByLabelText(mockContent.agreement1);
    const button = screen.getByText(mockContent.confirmAboveButtonText);
    expect(checkbox1).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  it("toggles a checkbox and updates button state accordingly", () => {
    const checkbox1 = screen.getByLabelText(mockContent.agreement1);
    fireEvent.click(checkbox1);
    expect(checkbox1).toBeChecked();

    const button = screen.getByText(mockContent.confirmAboveButtonText);
    expect(button).toBeDisabled();
  });
});
