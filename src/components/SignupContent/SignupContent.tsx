import { useTranslation } from "react-i18next";

import { LanguageCode } from "@/models/enums/LanguageCode";

import signuppropositions from "@/data/signup.json";
import { SignupProposition } from "@/models/SignupProposition";

import SignupContentList from "../SignupContentList/SignupContentList";

const SignupContent = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const currentLanguage = language as LanguageCode;

  return (
    <section className="pb-12 pl-8 pt-[137px] text-primary">
      <h1 className="w-[430px] font-segoe text-4xl font-semibold">
        {t("pages.signup.signupContent.title")}
      </h1>

      <ul className="mt-[83px] flex flex-col gap-y-12">
        {(signuppropositions[currentLanguage] as SignupProposition[]).map(
          (signupProposition) => (
            <SignupContentList
              key={signupProposition.id}
              signupProposition={signupProposition}
              currentLanguage={currentLanguage}
            />
          ),
        )}
      </ul>
    </section>
  );
};

export default SignupContent;
