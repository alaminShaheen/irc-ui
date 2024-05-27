import { Helmet } from "react-helmet-async";

type HubspotChatProps = {
  trackingCode: number;
};

export const HubspotChat = (props: HubspotChatProps) => {
  const { trackingCode } = props;
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
