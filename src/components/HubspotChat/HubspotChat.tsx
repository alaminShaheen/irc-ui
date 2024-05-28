import { Helmet } from "react-helmet-async";
import AppConstants from "@/constants/AppConstants";

const HubspotChat = () => {
  const trackingCode = AppConstants.HUBSPOT_TRACKING_CODE;

  return (
    <Helmet>
      <script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src={`//js.hs-scripts.com/${trackingCode}.js`}
      />
    </Helmet>
  );
};

export default HubspotChat;
