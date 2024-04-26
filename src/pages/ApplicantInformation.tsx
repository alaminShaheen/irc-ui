import { Helmet } from "react-helmet-async";
import ApplicantInformationForm from "@/components/Stepper/ApplicantInformationForm/ApplicantInformationForm";

const ApplicantInformation = () => {
  return (
    <>
      <Helmet title={"Applicant Information"} />
      <section className="mx-4 md:mx-auto md:w-[50%] lg:w-[33%]">
        <ApplicantInformationForm />
      </section>
    </>
  );
};

export default ApplicantInformation;
