import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
import HubspotChat from "../HubspotChat";
import AppConstants from "@/constants/AppConstants";

describe("HubspotChat", () => {
  it("renders the script with the correct src attribute", async () => {
    const trackingCode = AppConstants.HUBSPOT_TRACKING_CODE;

    render(
      <HelmetProvider>
        <HubspotChat />
      </HelmetProvider>,
    );

    await waitFor(() => {
      const scriptTag = document.querySelector("script#hs-script-loader");

      expect(scriptTag).toBeInTheDocument();
      expect(scriptTag).toHaveAttribute(
        "src",
        `//js.hs-scripts.com/${trackingCode}.js`,
      );
      expect(scriptTag).toHaveAttribute("async");
      expect(scriptTag).toHaveAttribute("defer");
    });
  });
});
