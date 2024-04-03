import { render, screen } from "@testing-library/react";
import signupPropositionData from "@/data/signupPropositions.json";
import SignupContent from "../SignupContent";

// Mocking useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Mocking the translation function
    i18n: { language: "en" }, // Mocking the language property
  }),
}));

describe("SignupContent component", () => {
  test("renders component with title and list of propositions", () => {
    // Mock data
    const propositionData = signupPropositionData["en"];

    render(<SignupContent />);

    // Check if title is rendered
    expect(
      screen.getByText("pages.signup.signupContent.title"),
    ).toBeInTheDocument();

    // Check if all propositions are rendered
    propositionData.forEach((prop) => {
      expect(screen.getByText(prop.title)).toBeInTheDocument();
    });

    // Check if all propositions are rendered as list items
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(propositionData.length);
  });
});
