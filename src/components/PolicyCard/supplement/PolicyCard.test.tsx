import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PolicyCard from "../PolicyCard";

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

const mockProps = {
  policy: {
    id: "123",
    iconPath: "icon/path",
    subtitle: "Sous-titre en français",
    name: "Policy Name",
    // listOfEvents: [],
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
  onAddEventClick: jest.fn(),
  listOfEvents: [],
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
    fireEvent.click(screen.getByText("Show More"));
    expect(screen.getByText("Show Less")).toBeInTheDocument();
  });

  it("calls onAddEventClick when the add event button is clicked", () => {
    fireEvent.click(
      screen.getByText(mockProps.translationContent.clickToAddEvent),
    );
    expect(mockProps.onAddEventClick).toHaveBeenCalled();
  });
});
