import { SignupFormModel } from "@/models/form/SignupFormModel";

export type ConfirmIdentityFormModel = Pick<
  SignupFormModel,
  | "firstName"
  | "lastName"
  | "phoneNumber"
  | "email"
  | "personalInformationCollectionAgreement"
  | "bestAbilityAcknowledgement"
>;
