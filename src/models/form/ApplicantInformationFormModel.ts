// export type ApplicantInformationFormModel = {
//   name: string;
//   address: string;
//   postalCode: string;
//   streetAddress: string;
//   city: string;
//   province: string;
//   country: string;
//   bestAbilityAcknowledgement: boolean;
//   personalInformationCollectionAgreement: boolean;
// };

export type Common = {
  name: string;
  bestAbilityAcknowledgement: boolean;
  personalInformationCollectionAgreement: boolean;
};

export type WithAddress = {
  address: string;

  postalCode?: never;
  streetAddress?: never;
  city?: never;
  province?: never;
  country?: never;
};

export type WithManualAddress = {
  postalCode: string;
  streetAddress: string;
  city: string;
  province: string;
  country: string;
  address?: never;
};

export type ApplicantInformationFormModel = Common &
  (WithAddress | WithManualAddress);
