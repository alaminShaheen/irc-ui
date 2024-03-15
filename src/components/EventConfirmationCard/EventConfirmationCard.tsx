import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button/Button";
import bgCard from "@/assets/images/event-checkout-bg.png";
import checkout from "@/assets/icons/checkout.svg";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import useToggle from "@/hooks/useToggle";
import AppConstants from "@/constants/AppConstants";
import { ButtonVariant, IconPosition } from "@/models/enums/ButtonVariant";
import { IEventConfirmationCardProps } from "@/components/EventConfirmationCard/EventConfirmationCard.d";

const EventConfirmationCard = ({ content }: IEventConfirmationCardProps) => {
  const {
    numOfEventsTitle,
    totalPolicyCostTitle,
    provincialSalesTaxTitle,
    agreement1,
    agreement2Info,
    agreement2,
    agreement3,
    confirmAboveButtonText,
    checkoutButtonText,
  } = content;

  const [coverageExclusionChecked, toggleCoverageExclusionCheckbox] =
    useToggle(false);
  const [
    deductibleResponsibilityChecked,
    toggleDeductibleResponsibilityCheckbox,
  ] = useToggle(false);
  const [professionalLiabilityChecked, toggleProfessionalLiabilityCheckbox] =
    useToggle(false);
  const allChecked =
    coverageExclusionChecked &&
    deductibleResponsibilityChecked &&
    professionalLiabilityChecked;

  return (
    <div className="mt-8 lg:mt-0 w-full px-6 pt-6 pb-11 relative lg:sticky lg:top-[100px] z-0">
      <div className="absolute top-0 left-0 w-full h-full">
        <Icon src={bgCard} alt="card" className="w-full h-full" />
      </div>
      <div className="relative">
        <div className="flex justify-between text-lg font-semibold">
          <h2 className="text-graphite-700">{numOfEventsTitle}</h2>
          <p aria-live="polite" className="text-primary">
            2
          </p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center">
          <h2 className="text-2xl font-bold">{totalPolicyCostTitle}</h2>
          <p aria-live="polite" className="font-bold text-4xl">
            $168.5
          </p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center text-lg">
          <h2>[Event name] - reoccurring activity</h2>
          <p aria-live="polite" className="font-bold">
            $120.9
          </p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center text-lg">
          <h2>Hockey Match</h2>
          <p aria-live="polite" className="font-bold">
            $35.15
          </p>
        </div>

        <div className="border-t border-dashed border-white-700 mt-4" />

        <div className="flex justify-between text-primary mt-4 items-center">
          <h2 className="text-lg">{provincialSalesTaxTitle}</h2>
          <p aria-live="polite" className="font-bold text-xl">
            $12.49
          </p>
        </div>

        <div className="flex mt-6 items-center">
          <div className="flex items-center justify-center">
            <Checkbox
              className="mr-2"
              id="coverage-exclusions"
              checked={coverageExclusionChecked}
              onChange={toggleCoverageExclusionCheckbox}
            />
          </div>
          <label htmlFor="coverage-exclusions" className="text-black w-full">
            {agreement1}
          </label>
        </div>

        <div
          className={cn(
            `h-1 border-t border-primary-300 ml-auto my-4 w-[calc(100%-${AppConstants.CHECKBOX_SIZE}px)]`,
          )}
        />

        <div className="flex flex-col items-end w-full">
          <div className="flex w-full">
            <div className="min-w-[30px] mr-2" />
            <span className="font-light">{agreement2Info}</span>
          </div>
          <div className="flex items-center w-full">
            <div className="flex items-center justify-center">
              <Checkbox
                className="mr-2"
                id="responsible"
                checked={deductibleResponsibilityChecked}
                onChange={toggleDeductibleResponsibilityCheckbox}
              />
            </div>
            <label htmlFor="responsible" className="text-black w-full">
              {" "}
              {agreement2}
            </label>
          </div>
        </div>

        <div
          className={cn(
            `h-1 border-t border-primary-300 ml-auto my-4 w-[calc(100%-${AppConstants.CHECKBOX_SIZE}px)]`,
          )}
        />

        <div className="flex items-center">
          <div className="flex items-center justify-center">
            <Checkbox
              className="mr-2"
              id="coverage-exclusions"
              checked={professionalLiabilityChecked}
              onChange={toggleProfessionalLiabilityCheckbox}
            />
          </div>
          <label
            htmlFor="coverage-exclusions"
            className="border-primary-300 text-black"
          >
            {agreement3}
          </label>
        </div>

        <div className="border-t border-dashed border-white-700 my-8" />

        <Button
          className="w-full p-4 text-xl font-bold inline-flex justify-center items-center gap-x-3 rounded-md"
          icon={allChecked && <Icon src={checkout} alt="checkout" size={32} />}
          variant={allChecked ? ButtonVariant.PRIMARY : ButtonVariant.DISABLED}
          disabled={!allChecked}
          iconPosition={IconPosition.RIGHT}
        >
          {allChecked ? checkoutButtonText : confirmAboveButtonText}
        </Button>
      </div>
    </div>
  );
};

export default EventConfirmationCard;
