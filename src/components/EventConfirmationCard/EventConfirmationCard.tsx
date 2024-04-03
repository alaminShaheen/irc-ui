import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button/Button";
import bgCard from "../../assets/images/event-checkout-bg.png";
import Checkout from "../AppIcons/Checkout";
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
    cardBgImageAltText,
    checkoutIconAltText,
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
    <div className="relative z-0 mt-8 w-full px-6 pb-11 pt-6 lg:sticky lg:top-[100px] lg:mt-0">
      <div className="absolute left-0 top-0 h-full w-full">
        <Icon src={bgCard} alt={cardBgImageAltText} className="h-full w-full" />
      </div>
      <div className="relative">
        <div className="flex justify-between font-segoe text-lg font-semibold">
          <h2 className="text-graphite-700">{numOfEventsTitle}</h2>
          <p aria-live="polite" className="text-primary">
            2
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between font-segoe text-primary">
          <h2 className="text-2xl font-bold">{totalPolicyCostTitle}</h2>
          <p aria-live="polite" className="text-4xl font-bold">
            $168.5
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-lg text-primary">
          <h2>[Event name] - reoccurring activity</h2>
          <p aria-live="polite" className="font-bold">
            $120.9
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-lg text-primary">
          <h2>Hockey Match</h2>
          <p aria-live="polite" className="font-bold">
            $35.15
          </p>
        </div>

        <div className="mt-4 border-t border-dashed border-white-700" />

        <div className="mt-4 flex items-center justify-between text-primary">
          <h2 className="text-lg">{provincialSalesTaxTitle}</h2>
          <p aria-live="polite" className="text-xl font-bold">
            $12.49
          </p>
        </div>

        <div className="mt-6 flex items-center gap-x-3">
          <div className="flex items-center justify-center">
            <Checkbox
              id="coverage-exclusions"
              checked={coverageExclusionChecked}
              onChange={toggleCoverageExclusionCheckbox}
            />
          </div>
          <label htmlFor="coverage-exclusions" className="w-full text-black">
            {agreement1}
          </label>
        </div>

        <div
          className={cn(
            `my-4 ml-auto h-1 border-t border-primary-300 w-[calc(100%-${AppConstants.CHECKBOX_SIZE}px)]`,
          )}
        />

        <div className="flex w-full flex-col items-end">
          <div className="flex w-full gap-x-3">
            <div className="min-w-[30px]" />
            <span className="font-light">{agreement2Info}</span>
          </div>
          <div className="flex w-full items-center gap-x-3">
            <div className="flex items-center justify-center">
              <Checkbox
                id="responsible"
                checked={deductibleResponsibilityChecked}
                onChange={toggleDeductibleResponsibilityCheckbox}
              />
            </div>
            <label htmlFor="responsible" className="w-full text-black">
              {" "}
              {agreement2}
            </label>
          </div>
        </div>

        <div
          className={cn(
            `my-4 ml-auto h-1 border-t border-primary-300 w-[calc(100%-${AppConstants.CHECKBOX_SIZE}px)]`,
          )}
        />

        <div className="form-radio-checkbox-group">
          <div className="flex items-center justify-center">
            <Checkbox
              id="professional-liability"
              checked={professionalLiabilityChecked}
              onChange={toggleProfessionalLiabilityCheckbox}
            />
          </div>
          <label
            htmlFor="professional-liability"
            className="border-primary-300 text-black"
          >
            {agreement3}
          </label>
        </div>

        <div className="my-8 border-t border-dashed border-white-700" />

        <Button
          className="inline-flex w-full items-center justify-center gap-x-3 rounded-md p-4 text-xl font-bold"
          icon={
            allChecked && (
              <Icon src={<Checkout />} alt={checkoutIconAltText} size={32} />
            )
          }
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
