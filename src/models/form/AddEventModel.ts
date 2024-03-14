import { EventRepeatFrequency } from "@/models/enums/EventRepeatFrequency";

export type AddEventModel = {
  eventName: string;
  rentalFacilityAgreementNumber: string;
  facility: string;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  repeatEvent: boolean;
  repeatFrequency?: EventRepeatFrequency;
  insuranceCoverageAmount: number;
  foodBeverageSale: boolean;
  thirdPartyFoodPackaging: boolean;
  requireAlcoholCoverage: boolean;
  validDriverLicensesPresent: boolean;
  selfTransportation: boolean;
  rentalVehicleOwnage: boolean;
}