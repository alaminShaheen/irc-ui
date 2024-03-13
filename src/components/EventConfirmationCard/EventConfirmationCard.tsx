import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button/Button";
import bgCard from "@/assets/images/event-checkout-bg.png";
import checkout from "@/assets/icons/checkout.svg";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import useToggle from "@/hooks/useToggle";
import AppConstants from "@/constants/AppConstants";

import { ButtonVariant } from "@/models/enums/ButtonVariant";

const EventConfirmationCard = () => {
  const [coverageExclusionChecked, toggleCoverageExclusionCheckbox] = useToggle(false);
  const [deductibleResponsibilityChecked, toggleDeductibleResponsibilityCheckbox] = useToggle(false);
  const [professionalLiabilityChecked, toggleProfessionalLiabilityCheckbox] = useToggle(false);
  const allChecked = coverageExclusionChecked && deductibleResponsibilityChecked && professionalLiabilityChecked;

  return (
    <div className="mx-0 lg:mx-4 mt-8 lg:mt-0 w-full h-auto px-6 py-6 pb-11 relative lg:sticky lg:top-2">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <Icon src={bgCard} alt="card" className="w-full h-full" />
      </div>
      <div className="relative z-10">
        <div className="flex justify-between text-lg font-semibold">
          <h2 className="text-graphite-700">Number of events:</h2>
          <p aria-live="polite" className="text-primary">
            2
          </p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center">
          <h2 className="text-2xl font-bold">Total cost of policies</h2>
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
          <h2 className="text-lg">Provincial Sales Tax:</h2>
          <p aria-live="polite" className="font-bold text-xl">
            $12.49
          </p>
        </div>

        <div className="flex mt-6 items-center">
          <div className="flex items-center justify-center">
            <Checkbox className="mr-2" id="coverage-exclusions"
                      checked={coverageExclusionChecked}
                      onChange={toggleCoverageExclusionCheckbox} />
          </div>
          <label htmlFor="coverage-exclusions" className="text-black w-full">
            I understand the coverage and exclusions of this policy
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
            <span className="font-light">
              In the event of a claim against you, this policy contains a $1,500
              deductible / self insured retention. You as the named insured will
              be responsible to pay this if a claim is filed.
            </span>
          </div>
          <div className="flex items-center w-full">
            <div className="flex items-center justify-center">
              <Checkbox className="mr-2" id="responsible"
                        checked={deductibleResponsibilityChecked}
                        onChange={toggleDeductibleResponsibilityCheckbox} />
            </div>
            <label htmlFor="responsible" className="text-black w-full">
              {" "}
              I agree that I will be responsible for the deductible
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
            <Checkbox className="mr-2" id="coverage-exclusions"
                      checked={professionalLiabilityChecked}
                      onChange={toggleProfessionalLiabilityCheckbox} />
          </div>
          <label
            htmlFor="coverage-exclusions"
            className="border-primary-300 text-black"
          >
            I understand that this policy does not cover Professional Liability
          </label>
        </div>

        <div className="border-t border-dashed border-white-700 my-8" />

        <Button
          className="w-full p-4 text-xl font-bold inline-flex justify-center items-center gap-x-3 rounded-md"
          icon={allChecked && <Icon src={checkout} alt="checkout" />}
          variant={allChecked ? ButtonVariant.PRIMARY : ButtonVariant.DISABLED}
          disabled={!allChecked}>
          {allChecked ? "Checkout" : "Confirm above"}
        </Button>
      </div>
    </div>
  );
};

export default EventConfirmationCard;
