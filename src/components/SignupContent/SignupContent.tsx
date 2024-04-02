import { useTranslation } from "react-i18next";

import { LanguageCode } from "@/models/enums/LanguageCode";

import signupPropositionData from "@/data/signupPropositions.json";
import { TProposition } from "@/models/SignupProposition";

import SignupContentList from "./Components/SignupContentList/SignupContentList";

const SignupContent = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const currentLanguage = language as LanguageCode;
  const propositionData: TProposition[] =
    signupPropositionData[currentLanguage];

  return (
    <section className="pb-12 pl-8 pt-[137px] text-primary">
      <h1 className="max-w-[430px] font-segoe text-4xl font-semibold">
        {t("pages.signup.signupContent.title")}
      </h1>

      <ul className="mt-[83px] flex flex-col gap-y-12">
        {propositionData.map((signupProposition: TProposition) => (
          <SignupContentList
            key={`signProposition-${signupProposition.id}`}
            signupProposition={signupProposition}
          />
        ))}
      </ul>
    </section>
  );
};

export default SignupContent;
