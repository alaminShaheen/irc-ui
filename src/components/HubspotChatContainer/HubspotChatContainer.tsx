import { HubspotChat } from "@/components/HubspotChat/HubspotChat";
import AppConstants from "@/constants/AppConstants";

const HubspotChatContainer = () => {
  const trackingCode = AppConstants.HUBSPOT_TRACKING_CODE;

  return (
    <div>
      <HubspotChat trackingCode={trackingCode} />
    </div>
  );
};

export default HubspotChatContainer;
