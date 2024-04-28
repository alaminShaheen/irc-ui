export type CommonApplicantInformation = {
  name: string;
  bestAbilityAcknowledgement: boolean;
  personalInformationCollectionAgreement: boolean;
};

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
