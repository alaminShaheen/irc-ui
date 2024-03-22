import { useFormContext } from "react-hook-form";

import {
  AddEventModel,
  BinaryResponse,
  InsuranceCoverageAmount,
} from "@/models/form/AddEventModel";
import RadioGroup from "@/components/ui/Radio/components/RadioGroup/RadioGroup";
import { IAdditionalQuestionsSectionProps } from "@/components/AddEvent/components/AdditionalQuestionsSection/AdditionalQuestionsSection.d";

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
  const { watch } = useFormContext<AddEventModel>();

  return (
    <>
      <p className="font-segoe my-8 text-2xl font-bold text-primary">
        {additionalQuestions}
      </p>
      <div className="flex flex-col gap-y-2">
        <p className="form-label flex gap-x-3">{insuranceCoverageLabel}</p>
        <RadioGroup
          className="flex flex-col items-start gap-y-4"
          name="insuranceCoverageAmount"
          radioProps={[
            {
              value: InsuranceCoverageAmount.ONE_MILLION,
              label: "$1 000 000",
              checked:
                watch("insuranceCoverageAmount") ===
                InsuranceCoverageAmount.ONE_MILLION,
            },
            {
              value: InsuranceCoverageAmount.TWO_MILLION,
              label: "$2 000 000",
              checked:
                watch("insuranceCoverageAmount") ===
                InsuranceCoverageAmount.TWO_MILLION,
            },
          ]}
        />
      </div>
      <p className="my-6 text-xl font-normal text-primary">
        {foodAndBeverages}
      </p>
      <div className="flex flex-col gap-y-2">
        <p className="form-label flex gap-x-3">{foodBeingSoldLabel}</p>
        <RadioGroup
          className="flex gap-x-4"
          name="foodBeverageSale"
          radioProps={[
            {
              value: BinaryResponse.YES,
              label: yes,
              checked: watch("foodBeverageSale") === BinaryResponse.YES,
            },
            {
              value: BinaryResponse.NO,
              label: no,
              checked: watch("foodBeverageSale") === BinaryResponse.NO,
            },
          ]}
        />
      </div>
      <div className="mt-6 flex flex-col gap-y-2">
        <p className="form-label flex gap-x-3">{foodByThirdPartyLabel}</p>
        <RadioGroup
          className="flex gap-x-4"
          name="thirdPartyFoodPackaging"
          radioProps={[
            {
              value: BinaryResponse.YES,
              label: yes,
              checked: watch("thirdPartyFoodPackaging") === BinaryResponse.YES,
            },
            {
              value: BinaryResponse.NO,
              label: no,
              checked: watch("thirdPartyFoodPackaging") === BinaryResponse.NO,
            },
          ]}
        />
      </div>
      <div className="mt-6 flex flex-col gap-y-2">
        <p className="form-label flex gap-x-3">{alcoholCoverageLabel}</p>
        <RadioGroup
          className="flex gap-x-4"
          name="requireAlcoholCoverage"
          radioProps={[
            {
              value: BinaryResponse.YES,
              label: yes,
              checked: watch("requireAlcoholCoverage") === BinaryResponse.YES,
            },
            {
              value: BinaryResponse.NO,
              label: no,
              checked: watch("requireAlcoholCoverage") === BinaryResponse.NO,
            },
          ]}
        />
      </div>
      <p className="my-6 text-xl font-normal text-primary">{transport}</p>
      <div className="mt-6 flex flex-col gap-y-2">
        <p className="form-label flex gap-x-3">{driverLicenceLabel}</p>
        <RadioGroup
          className="flex gap-x-4"
          name="validDriverLicensesPresent"
          radioProps={[
            {
              value: BinaryResponse.YES,
              label: yes,
              checked:
                watch("validDriverLicensesPresent") === BinaryResponse.YES,
            },
            {
              value: BinaryResponse.NO,
              label: no,
              checked:
                watch("validDriverLicensesPresent") === BinaryResponse.NO,
            },
          ]}
        />
      </div>
      <div className="mt-6 flex flex-col gap-y-2">
        <p className="form-label flex gap-x-3">{selfTransportation}</p>
        <RadioGroup
          className="flex gap-x-4"
          name="selfTransportation"
          radioProps={[
            {
              value: BinaryResponse.YES,
              label: yes,
              checked: watch("selfTransportation") === BinaryResponse.YES,
            },
            {
              value: BinaryResponse.NO,
              label: no,
              checked: watch("selfTransportation") === BinaryResponse.NO,
            },
          ]}
        />
      </div>
      <div className="mt-6 flex flex-col gap-y-2">
        <p className="form-label flex gap-x-3">{rentalVehicleOwnage}</p>
        <RadioGroup
          className="flex gap-x-4"
          name="rentalVehicleOwnage"
          radioProps={[
            {
              value: BinaryResponse.YES,
              label: yes,
              checked: watch("rentalVehicleOwnage") === BinaryResponse.YES,
            },
            {
              value: BinaryResponse.NO,
              label: no,
              checked: watch("rentalVehicleOwnage") === BinaryResponse.NO,
            },
          ]}
        />
      </div>
    </>
  );
};

export default AdditionalQuestionsSection;
