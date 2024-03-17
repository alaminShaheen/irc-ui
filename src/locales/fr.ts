// Common language file
import Common from "./common/fr.json";

// Page level language files
import Quote from "./pages/Quote/fr.json";

export const fr_content = {
  common: Common,
  footer: {
    poweredBy: "FR-Powered by:",
    body: "FR-Instant Risk Coverage is a trademark of Instant Risk Coverage Inc. Refer to your policy for the most detailed and accurate information about your coverage and terms of insurance. Your policy, which serves as your insurance contract, will always prevail if there's ever a conflict with the information found on this site.",
    privacyPolicy: "FR-Privacy policy",
    copyright: "FR-© {{year}} instantriskcoverage",
  },
  addEventForm: {
    title: "FR-FR-Add event",
    basicInfo: "FR-Basic information",
    nameYourEventLabel: "FR-Name your event",
    nameYourEventPlaceholder: "FR-e.g. John Doe or Your Company Name Inc.",
    infoText: "FR-This name will be used only for communication purposes",
    rentalFacilityLabel: "FR-Rental / facility agreement number (s)",
    rentalFacilityPlaceholder: "FR-Enter number here",
    facilityLabel: "FR-Facility",
    facilityPlaceholder: "FR-Start typing...",
    startDate: "FR-Start Date",
    startTime: "FR-Start Time",
    endDate: "FR-End Date",
    endTime: "FR-End Time",
    chooseDate: "FR-Choose date",
    chooseTime: "FR-Choose time",
    repeatEvent: "FR-Repeat this event",
    addTime: "FR-Add this time",
    additionalQuestions: "FR-Additional questions",
    insuranceCoverageLabel:
      "FR-Please select the amount of insurance coverage required:",
    foodAndBeverages: "FR-Food & beverages",
    foodBeingSoldLabel: "FR-Is food or beverages being sold?",
    foodByThirdPartyLabel:
      "FR-Is all food / non-alcoholic beverages being sold packaged by a third party?",
    alcoholCoverageLabel:
      "FR-Do you require alcohol coverage (maximum 50 seat capacity)?",
    transport: "FR-Transport",
    driverLicenceLabel:
      "FR-Does every driver of the vehicles have a valid drivers' license?",
    selfTransportation:
      "FR-Are you responsible for providing transportation and/or chauffeuring services, or transporting attendees?",
    rentalVehicleOwnage:
      "FR-Do you have any short term rental vehicles (less than 30 days)?",
    yes: "FR-Yes",
    no: "FR-No",
    confirm: "FR-Confirm",
    daily: "FR-Daily",
    weekly: "FR-Weekly",
    monthly: "FR-Monthly",
  },
  pages: {
    quote: Quote,
  },
};
