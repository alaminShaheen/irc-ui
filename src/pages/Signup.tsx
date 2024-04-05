import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SignupForm from "@/components/SignupForm/SignupForm";
import SignupContent from "@/components/SignupContent/SignupContent";

const Signup = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-rows-1 md:grid-cols-2">
      <Helmet>
        <title>{t("pages.signup.seo.title")}</title>
      </Helmet>

      <section className="hidden md:block">
        {/* Left section */}
        <SignupContent />
      </section>
      <section className="">
        {/* Right section */}
        <SignupForm />
      </section>
    </div>
  );
};

export default Signup;
