import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import SignInForm from "@/components/SignInForm";

const SignIn = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      <Helmet title={t("pages.signin.seo.title")} />

      <section className="w-full">
        <SignInForm />
      </section>
    </div>
  );
};

export default SignIn;
