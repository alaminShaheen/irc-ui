import { Helmet } from "react-helmet-async";
import ApplicantInformationForm from "@/components/Stepper/ApplicantInformationForm/ApplicantInformationForm";

const ApplicantInformation = () => {
  return (
    <>
      <Helmet title={"Applicant Information"} />
      <section className="mx-4">
        <ApplicantInformationForm />
      </section>
    </>
  );
};

export default ApplicantInformation;
