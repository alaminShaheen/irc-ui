import { SignupProposition } from "@/models/SignupProposition";
import { LanguageCode } from "@/models/enums/LanguageCode";

export interface ISignupContentList {
  signupProposition: SignupProposition;
  currentLanguage: LanguageCode;
}
