export type AddEventModel = {
  eventName: string;
  rentalFacilityAgreementNumber: string;
  facility: string;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  repeatEvent: boolean;
  repeatFrequency: EventRepeatFrequency;
  insuranceCoverageAmount: InsuranceCoverageAmount;
  foodBeverageSale: BinaryResponse;
  thirdPartyFoodPackaging: BinaryResponse;
  requireAlcoholCoverage: BinaryResponse;
  validDriverLicensesPresent: BinaryResponse;
  selfTransportation: BinaryResponse;
  rentalVehicleOwnage: BinaryResponse;
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