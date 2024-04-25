import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SigninForm from "@/components/SigninForm/SigninForm";

const Signin = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-rows-1">
      <Helmet title={t("pages.signin.seo.title")} />
      <section className="mx-4 md:mx-auto md:w-[50%] lg:w-[33%]">
        <SigninForm />
      </section>
    </div>
  );
};

export default Signin;
