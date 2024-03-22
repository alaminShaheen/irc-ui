import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FocusTrap from "../FocusTrap";

describe("FocusTrap", () => {
  beforeEach(() => {
    render(
      <FocusTrap>
        <button>First Button</button>
        <button>Last Button</button>
      </FocusTrap>,
    );
  });

  it("renders its children", async () => {
    const firstButton = await screen.findByText("First Button");
    expect(firstButton).toBeInTheDocument();
    const lastButton = await screen.findByText("Last Button");
    expect(lastButton).toBeInTheDocument();
  });

  it("traps focus within the component", async () => {
    const firstButton = await screen.findByText("First Button");
    const lastButton = await screen.findByText("Last Button");

    // Ensuring the first button is focused initially
    firstButton.focus();
    expect(firstButton).toHaveFocus();

    // Simulating tab to move to the last button
    userEvent.tab();

    // Waiting for focus to move to the last button
    await waitFor(() => expect(lastButton).toHaveFocus());

    // Simulating shift + tab to move back to the first button
    userEvent.tab({ shift: true });

    // Waiting for focus to move back to the first button
    await waitFor(() => expect(firstButton).toHaveFocus());
  });
});
