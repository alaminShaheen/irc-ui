import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import AddEventForm from "@/components/Stepper/AddEventForm/AddEventForm";

const AddEvent = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet title={t("pages.applicantInformation.seo.title")} />
      <section className="mx-4 mb-10 mt-6 flex justify-center lg:my-0">
        <AddEventForm />
      </section>
    </>
  );
};

export default AddEvent;
