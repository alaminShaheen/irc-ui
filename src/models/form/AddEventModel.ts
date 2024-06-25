export type AddEventModel = {
  eventName: string;
  facilityInfo: {
    rentalFacilityAgreementNumber: string;
    facility: string;
    dateRanges: { startDate: Date; endDate: Date }[];
  }[];
  repeatEvent: boolean;
  repeatFrequency: EventRepeatFrequency;
};

export enum BinaryResponse {
  YES = "yes",
  NO = "no",
}

export enum InsuranceCoverageAmount {
  ONE_MILLION = "1000000",
  TWO_MILLION = "2000000",
}

export enum EventRepeatFrequency {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
}
