import { Helmet } from "react-helmet-async";
import ApplicantInformationForm from "@/components/Stepper/ApplicantInformationForm/ApplicantInformationForm";
import { useTranslation } from "react-i18next";

const ApplicantInformation = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet title={t("pages.applicantInformation.seo.title")} />
      <section className="mx-4 mb-10 mt-6 lg:my-0">
        <ApplicantInformationForm />
      </section>
    </>
  );
};

export default ApplicantInformation;
