// Common language file
import Common from "./common/en.json";

// Page level language files
import Quote from "./pages/Quote/en.json";

export const en_content = {
  common: Common,
  footer: {
    poweredBy: "Powered by:",
    body: "Instant Risk Coverage is a trademark of Instant Risk Coverage Inc. Refer to your policy for the most detailed and accurate information about your coverage and terms of insurance. Your policy, which serves as your insurance contract, will always prevail if there's ever a conflict with the information found on this site.",
    privacyPolicy: "Privacy policy",
    copyright: "© {{year}} instantriskcoverage",
  },
  addEventForm: {
    title: "Add event",
    basicInfo: "Basic information",
    nameYourEventLabel: "Name your event",
    nameYourEventPlaceholder: "e.g. John Doe or Your Company Name Inc.",
    infoText: "This name will be used only for communication purposes",
    rentalFacilityLabel: "Rental / facility agreement number (s)",
    rentalFacilityPlaceholder: "Enter number here",
    facilityLabel: "Facility",
    facilityPlaceholder: "Start typing...",
    startDate: "Start Date",
    startTime: "Start Time",
    endDate: "End Date",
    endTime: "End Time",
    chooseDate: "Choose date",
    chooseTime: "Choose time",
    repeatEvent: "Repeat this event",
    repeatLabel: "Repeat",
    addTime: "Add this time",
    additionalQuestions: "Additional questions",
    insuranceCoverageLabel:
      "Please select the amount of insurance coverage required:",
    foodAndBeverages: "Food & beverages",
    foodBeingSoldLabel: "Is food or beverages being sold?",
    foodByThirdPartyLabel:
      "Is all food / non-alcoholic beverages being sold packaged by a third party?",
    alcoholCoverageLabel:
      "Do you require alcohol coverage (maximum 50 seat capacity)?",
    transport: "Transport",
    driverLicenceLabel:
      "Does every driver of the vehicles have a valid drivers' license?",
    selfTransportation:
      "Are you responsible for providing transportation and/or chauffeuring services, or transporting attendees?",
    rentalVehicleOwnage:
      "Do you have any short term rental vehicles (less than 30 days)?",
    yes: "Yes",
    no: "No",
    confirm: "Confirm",
  },
  pages: {
    quote: Quote,
  },
};
