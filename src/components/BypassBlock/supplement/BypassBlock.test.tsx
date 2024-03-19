import { render, screen, fireEvent } from "@testing-library/react";
import BypassBlock from "..";

const BYPASSBLOCK_TEST_ID = "irc-bypassblock";

const BYPASSBLOCK_DEFAULT_ARGS = {
  bypassStyle: "class",
  bypassText: "Skip to Main Content",
  bypassLink: "main",
};

jest.mock("i18next", () => ({
  use: jest.fn().mockReturnThis(),
  init: jest.fn().mockReturnThis(),
  t: (key: string) => key, // This will just return the key, or you can define custom behavior
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Mock `t` function to return the key or a mock translation
  }),
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));

describe("BypassBlock component", () => {
  test("renders BypassBlock link correctly", () => {
    render(<BypassBlock {...BYPASSBLOCK_DEFAULT_ARGS} />);
    const bypassBlockElement = screen.getByTestId(BYPASSBLOCK_TEST_ID);
    expect(bypassBlockElement).toBeInTheDocument();
  });

  test("BypassBlock becomes visible on Tab key press", () => {
    render(<BypassBlock {...BYPASSBLOCK_DEFAULT_ARGS} />);
    fireEvent.keyDown(window, { key: "Tab" });
    const bypassBlockElement = screen.getByTestId(BYPASSBLOCK_TEST_ID);
    expect(bypassBlockElement).toBeVisible();
  });

  test("BypassBlock sets the href attribute correctly", () => {
    const customBypassLink = "main";
    render(
      <BypassBlock
        {...BYPASSBLOCK_DEFAULT_ARGS}
        bypassLink={customBypassLink}
      />,
    );
    const bypassBlockElement = screen.getByTestId(BYPASSBLOCK_TEST_ID);
    expect(bypassBlockElement).toHaveAttribute("href", `#${customBypassLink}`);
  });
});
