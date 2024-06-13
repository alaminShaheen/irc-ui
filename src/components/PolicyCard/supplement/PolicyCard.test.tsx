import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PolicyCard from "../PolicyCard";
import { IPolicyCard } from "@/components/PolicyCard/PolicyCard.d";
import { mockCoverageInfo } from "@/constants/MockData";

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

const mockProps: IPolicyCard = {
  policy: {
    id: "123",
    iconPath: "icon/path",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aliquid at beatae blanditiis dolor eius esse eum ex excepturi id illo inventore iure, iusto nisi, odit provident reiciendis soluta suscipit tempora. Accusamus aperiam, architecto beatae cum cupiditate dolores eum hic laborum minima possimus provident quibusdam rem repudiandae suscipit veritatis.",
    name: "Policy Name",
    $schemaRef: "parade-participant-schema",
  },
  translationContent: {
    clickToAddEvent: "Click to add event",
    showMore: "Show More",
    showLess: "Show Less",
    edit: "Edit",
    removePolicy: "Remove Policy",
    calendarIconAltText: "Calendar",
    clockIconAltText: "Clock",
    doorIconAltText: "Door",
    addEventIconAltText: "Add Event",
  },
  onAddEvent: jest.fn(),
  onDeleteEvent: jest.fn(),
  onEditEvent: jest.fn(),
  events: mockCoverageInfo["parade-participant"],
};

describe("PolicyCard Component", () => {
  beforeEach(() => {
    render(<PolicyCard {...mockProps} />);
  });

  it("renders title correctly", () => {
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders subtitle correctly", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("toggles the subtitle display on click", () => {
    fireEvent.click(
      screen.getAllByText(mockProps.translationContent.showMore)[0],
    );
    expect(
      screen.getByText(mockProps.translationContent.showLess),
    ).toBeInTheDocument();
  });

  it("adds events properly", () => {
    fireEvent.click(
      screen.getByText(mockProps.translationContent.clickToAddEvent),
    );
    expect(mockProps.onAddEvent).toHaveBeenCalled();
  });

  it("removed events properly", () => {
    fireEvent.click(
      screen.getAllByText(mockProps.translationContent.removePolicy)[0],
    );
    expect(mockProps.onDeleteEvent).toHaveBeenCalled();
  });

  it("edits events properly", () => {
    fireEvent.click(screen.getAllByText(mockProps.translationContent.edit)[0]);
    expect(mockProps.onEditEvent).toHaveBeenCalled();
  });
});
