import Checkbox from "@/components/ui/Checkbox";
import { useFormContext } from "react-hook-form";
import { CommonCheckboxes } from "@/models/CommonCheckboxes";
import { Trans } from "react-i18next";
import ExternalLink from "@/components/AppIcons/ExternalLink";
import { IAgreementCheckboxesProps } from "@/components/AgreementCheckboxes/AgreementCheckboxes.d";
import { cn } from "@/utils/helper";

const AgreementCheckboxes = (props: IAgreementCheckboxesProps) => {
  const { checkbox1ContainerStyle, checkbox2ContainerStyle } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext<CommonCheckboxes>();

  const pageContent = {
    checkbox1Label: (
      <Trans i18nKey="common.disclaimer.checkbox1Label">
        I understand and agree to the use of
        <a
          href="#"
          className="inline-flex items-center gap-x-1 font-bold text-primary underline"
        >
          application agreement
          <ExternalLink />
        </a>
      </Trans>
    ),
    checkbox2Label: (
      <Trans i18nKey="common.disclaimer.checkbox2Label">
        I understand and agree the information submitted will be used in line
        with our
        <a
          href="#"
          className="inline-flex items-center gap-x-1 font-bold text-primary underline"
        >
          privacy policy
          <ExternalLink />
        </a>
      </Trans>
    ),
  };

  return (
    <>
      <div
        className={cn(
          "form-radio-checkbox-group !items-start",
          checkbox1ContainerStyle,
        )}
      >
        <div className="flex items-center justify-center">
          <Checkbox
            {...register("bestAbilityAcknowledgement")}
            id="bestAbilityAcknowledgement"
            aria-invalid={!!errors.bestAbilityAcknowledgement}
          />
        </div>
        <label
          htmlFor="bestAbilityAcknowledgement"
          className="border-primary-300 text-black"
        >
          {pageContent.checkbox1Label}
        </label>
      </div>

      <div className="ml-auto h-1 border-t border-primary-300 md:hidden" />

      <div
        className={cn(
          "form-radio-checkbox-group !items-start",
          checkbox2ContainerStyle,
        )}
      >
        <div className="flex items-center justify-center">
          <Checkbox
            {...register("personalInformationCollectionAgreement")}
            id="personalInformationCollectionAgreement"
            aria-invalid={!!errors.personalInformationCollectionAgreement}
          />
        </div>
        <label
          htmlFor="personalInformationCollectionAgreement"
          className="border-primary-300 text-black"
        >
          {pageContent.checkbox2Label}
        </label>
      </div>
    </>
  );
};

export default AgreementCheckboxes;
