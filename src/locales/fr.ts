// Common language file
import Common from "@/locales/common/fr.json";

// Page level language files
import Quote from "@/locales/pages/Quote/fr.json";
import Signup from "@/locales/pages/Signup/fr.json";
import StepperForm from "@/locales/pages/StepperForm/fr.json";
import AddEventForm from "@/locales/pages/AddEvent/fr.json";
import ConfirmIdentity from "@/locales/pages/ConfirmIdentity/fr.json";

export const fr_content = {
  common: Common,
  footer: {
    poweredBy: "FR-Powered by:",
    body: "FR-Instant Risk Coverage is a trademark of Instant Risk Coverage Inc. Refer to your policy for the most detailed and accurate information about your coverage and terms of insurance. Your policy, which serves as your insurance contract, will always prevail if there's ever a conflict with the information found on this site.",
    privacyPolicy: "FR-Privacy policy",
    brokerWebPage: "FR-Broker Webpage",
    copyright: "FR-© {{year}} instantriskcoverage",
  },
  pages: {
    quote: Quote,
    addEventForm: AddEventForm,
    stepperForm: StepperForm,
    signup: Signup,
    confirmIdentity: ConfirmIdentity,
  },
};
