import { useFormContext } from "react-hook-form";

import {
  AddEventModel,
  BinaryResponse,
  InsuranceCoverageAmount,
} from "@/models/form/AddEventModel";
import RadioButton from "@/components/ui/RadioButton";
import { IAdditionalQuestionsSectionProps } from "@/components/AdditionalQuestionsSection/AdditionalQuestionsSection.d";

const AdditionalQuestionsSection = (
  props: IAdditionalQuestionsSectionProps,
) => {
  const {
    translationContents: {
      additionalQuestions,
      insuranceCoverageLabel,
      foodAndBeverages,
      foodBeingSoldLabel,
      foodByThirdPartyLabel,
      alcoholCoverageLabel,
      transport,
      driverLicenceLabel,
      selfTransportation,
      rentalVehicleOwnage,
      yes,
      no,
    },
  } = props;
  const { register, watch } = useFormContext<AddEventModel>();

  return (
    <>
      <p className="text-primary font-bold text-2xl my-8">
        {additionalQuestions}
      </p>
      <div className="flex flex-col gap-y-2">
        <p className="form-label flex gap-x-3">{insuranceCoverageLabel}</p>
        <div className="flex flex-col gap-y-4 items-start">
          <RadioButton
            selected={
              watch("insuranceCoverageAmount") ===
              InsuranceCoverageAmount.ONE_MILLION
            }
            label="$1 000 000"
            {...register("insuranceCoverageAmount")}
            value={InsuranceCoverageAmount.ONE_MILLION}
          />
          <RadioButton
            selected={
              watch("insuranceCoverageAmount") ===
              InsuranceCoverageAmount.TWO_MILLION
            }
            label="$2 000 000"
            {...register("insuranceCoverageAmount")}
            value={InsuranceCoverageAmount.TWO_MILLION}
          />
        </div>
      </div>
      <p className="text-primary font-normal text-xl my-6">
        {foodAndBeverages}
      </p>
      <div className="flex flex-col gap-y-2">
        <p className="form-label flex gap-x-3">{foodBeingSoldLabel}</p>
        <div className="flex gap-x-4">
          <RadioButton
            selected={watch("foodBeverageSale") === BinaryResponse.YES}
            label={yes}
            {...register("foodBeverageSale")}
            value={BinaryResponse.YES}
          />
          <RadioButton
            selected={watch("foodBeverageSale") === BinaryResponse.NO}
            label={no}
            {...register("foodBeverageSale")}
            value={BinaryResponse.NO}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-6">
        <p className="form-label flex gap-x-3">{foodByThirdPartyLabel}</p>
        <div className="flex gap-x-4">
          <RadioButton
            selected={watch("thirdPartyFoodPackaging") === BinaryResponse.YES}
            label={yes}
            {...register("thirdPartyFoodPackaging")}
            value={BinaryResponse.YES}
          />
          <RadioButton
            selected={watch("thirdPartyFoodPackaging") === BinaryResponse.NO}
            label={no}
            {...register("thirdPartyFoodPackaging")}
            value={BinaryResponse.NO}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-6">
        <p className="form-label flex gap-x-3">{alcoholCoverageLabel}</p>
        <div className="flex gap-x-4">
          <RadioButton
            selected={watch("requireAlcoholCoverage") === BinaryResponse.YES}
            label={yes}
            {...register("requireAlcoholCoverage")}
            value={BinaryResponse.YES}
          />
          <RadioButton
            selected={watch("requireAlcoholCoverage") === BinaryResponse.NO}
            label={no}
            {...register("requireAlcoholCoverage")}
            value={BinaryResponse.NO}
          />
        </div>
      </div>
      <p className="text-primary font-normal text-xl my-6">{transport}</p>
      <div className="flex flex-col gap-y-2 mt-6">
        <p className="form-label flex gap-x-3">{driverLicenceLabel}</p>
        <div className="flex gap-x-4">
          <RadioButton
            selected={
              watch("validDriverLicensesPresent") === BinaryResponse.YES
            }
            label={yes}
            {...register("validDriverLicensesPresent")}
            value={BinaryResponse.YES}
          />
          <RadioButton
            selected={watch("validDriverLicensesPresent") === BinaryResponse.NO}
            label={no}
            {...register("validDriverLicensesPresent")}
            value={BinaryResponse.NO}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-6">
        <p className="form-label flex gap-x-3">{selfTransportation}</p>
        <div className="flex gap-x-4">
          <RadioButton
            selected={watch("selfTransportation") === BinaryResponse.YES}
            label={yes}
            {...register("selfTransportation")}
            value={BinaryResponse.YES}
          />
          <RadioButton
            selected={watch("selfTransportation") === BinaryResponse.NO}
            label={no}
            {...register("selfTransportation")}
            value={BinaryResponse.NO}
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-6">
        <p className="form-label flex gap-x-3">{rentalVehicleOwnage}</p>
        <div className="flex gap-x-4">
          <RadioButton
            selected={watch("rentalVehicleOwnage") === BinaryResponse.YES}
            label={yes}
            {...register("rentalVehicleOwnage")}
            value={BinaryResponse.YES}
          />
          <RadioButton
            selected={watch("rentalVehicleOwnage") === BinaryResponse.NO}
            label={no}
            {...register("rentalVehicleOwnage")}
            value={BinaryResponse.NO}
          />
        </div>
      </div>
    </>
  );
};

export default AdditionalQuestionsSection;
