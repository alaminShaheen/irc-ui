import { render, screen } from "@testing-library/react";
import SignupContentList from "../SignupContentList";

// Mocking useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Mocking the translation function
    i18n: { language: "en" }, // Mocking the language property
  }),
}));

describe("SignupContentList component", () => {
  test("renders icon, title, and content correctly", () => {
    const signupProposition = {
      id: 1,
      iconPath: "rocketship",
      title: "RocketShip",
      content: "Lorem ipsum dolor sit amet.",
    };

    render(<SignupContentList signupProposition={signupProposition} />);

    // Check if title is rendered
    expect(screen.getByText(signupProposition.title)).toBeInTheDocument();

    // Check if content is rendered
    expect(screen.getByText(signupProposition.content)).toBeInTheDocument();
  });
});
