// Common language file
import Common from "@/locales/common/en.json";

// Page level language files
import Golf from "@/locales/dynamicForms/Golf/en.json";
import Quote from "@/locales/pages/Quote/en.json";
import Signup from "@/locales/pages/Signup/en.json";
import Signin from "@/locales/pages/Signin/en.json";
import Sports from "@/locales/dynamicForms/Sports/en.json";
import Instructor from "@/locales/dynamicForms/Instructor/en.json";
import StepperForm from "@/locales/pages/StepperForm/en.json";
import AddEventForm from "@/locales/pages/AddEvent/en.json";
import ConfirmIdentity from "@/locales/pages/ConfirmIdentity/en.json";
import ParadeParticipant from "@/locales/dynamicForms/ParadeParticipant/en.json";
import ApplicantInformation from "@/locales/pages/ApplicantInformation/en.json";
import IndividualFoodVendor from "@/locales/dynamicForms/IndividualFoodVendor/en.json";

export const en_content = {
  common: Common,
  footer: {
    poweredBy: "Powered by:",
    body: "Instant Risk Coverage is a trademark of Instant Risk Coverage Inc. Refer to your policy for the most detailed and accurate information about your coverage and terms of insurance. Your policy, which serves as your insurance contract, will always prevail if there's ever a conflict with the information found on this site.",
    privacyPolicy: "Privacy policy",
    brokerWebPage: "Broker Webpage",
    copyright: "© {{year}} instantriskcoverage",
  },
  pages: {
    quote: Quote,
    addEventForm: AddEventForm,
    stepperForm: StepperForm,
    signup: Signup,
    signin: Signin,
    confirmIdentity: ConfirmIdentity,
    applicantInformation: ApplicantInformation,
  },
  dynamicForms: {
    paradeParticipant: ParadeParticipant,
    golf: Golf,
    sports: Sports,
    instructor: Instructor,
    individualFoodVendor: IndividualFoodVendor,
  },
};
