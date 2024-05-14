import { render, screen, fireEvent } from "@testing-library/react";
import SidebarContents from "../SidebarContents";
import { BrowserRouter as Router } from "react-router-dom";

const mockProps = {
  onClose: jest.fn(),
  sidebarOpen: true,
  translationContent: {
    close: "Close",
    policyInformation: "Policy Information",
    frequentlyAskedQuestions: "FAQs",
    policyWording: "Policy Wording",
    summaryOfCoverage: "Summary of Coverage",
    activitiesAndEvents: "Activities and Events",
    toolsAndForms: "Tools and Forms",
    submitExternalCertificate: "Submit External Certificate",
    externalCertificate: "External Certificate",
    claimForm: "Claim Form",
    importanceOfWaivers: "Importance of Waivers",
    concussionTraining: "Concussion Training",
    concussionManagement: "Concussion Management",
    waiverOfMinorParticipants: "Waiver of Minor Participants",
    waiverOfAdultParticipants: "Waiver of Adult Participants",
    paradeApplicationForm: "Parade Application Form",
    largeEventApplicationForm: "Large Event Application Form",
  },
};

describe("SidebarContents Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <SidebarContents {...mockProps} />
      </Router>,
    );
  });

  test("renders correctly", () => {
    expect(
      screen.getByText(mockProps.translationContent.close),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.translationContent.policyInformation),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.translationContent.toolsAndForms),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.translationContent.importanceOfWaivers),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.translationContent.waiverOfMinorParticipants),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.translationContent.waiverOfAdultParticipants),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.translationContent.largeEventApplicationForm),
    ).toBeInTheDocument();
  });

  test("close button triggers onClose callback", () => {
    fireEvent.click(screen.getByText(mockProps.translationContent.close));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  test("checks for accessibility features", () => {
    expect(
      screen.getByRole("button", { name: mockProps.translationContent.close }),
    ).toBeInTheDocument();
  });
});
