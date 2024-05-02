import { CommonCheckboxes } from "@/models/CommonCheckboxes";

export type CommonApplicantInformation = {
  name: string;
} & CommonCheckboxes;

export type WithAddress = {
  address: string;
};

export type WithManualAddress = {
  postalCode: string;
  streetAddress: string;
  city: string;
  province: string;
  country: string;
};

export type ApplicantInformationFormModel = CommonApplicantInformation &
  (WithAddress | WithManualAddress);
