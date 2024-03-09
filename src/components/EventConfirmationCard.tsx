import Checkbox from "@/components/ui/Checkbox.tsx";
import Button from "@/components/ui/Button.tsx";
import checkout from "@/assets/icons/checkout.svg";
import bgCard from "@/assets/images/event-checkout-bg.png"

const EventConfirmationCard = () => {
  return (

    <div
      className="mx-0 lg:mx-4 mt-8 lg:mt-0 w-full h-auto p-6 relative">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <img src={bgCard} alt="card" className="w-full h-full" />
      </div>
      <div className="relative z-10">

        <div className="flex justify-between">
          <p className="text-gray-500">Number of events:</p>
          <p className="text-primary font-bold">2</p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center">
          <p className="text-lg font-bold">Total cost of policies</p>
          <p className="font-bold text-3xl">$168.5</p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center">
          <p className="text-lg">[Event name] - reoccurring activity</p>
          <p className="font-bold text-xl">$120.9</p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center">
          <p className="text-lg">Hockey Match</p>
          <p className="font-bold text-xl">$35.15</p>
        </div>

        <div className="border-t border-dashed border-gray-400 mt-4" />

        <div className="flex justify-between text-primary mt-4 items-center">
          <p className="text-lg">Provincial Sales Tax:</p>
          <p className="font-bold text-xl">$12.49</p>
        </div>


        <div className="flex mt-6">
          <Checkbox className="mr-2" id="coverage-exclusions" />
          <label htmlFor="coverage-exclusions" className="text-sm border-b pb-3 pt-1 border-gray-300">
            I understand the coverage and exclusions of this policy
          </label>
        </div>

        <div className="flex mt-4 items-end">
          <Checkbox className="mr-2 flex-grow mb-3" id="responsible" />
          <label htmlFor="responsible" className="text-sm border-b pb-3 pt-1 border-gray-300 w-full">
              <span className="font-light block">
                  In the event of a claim against you, this policy contains a $1,500 deductible / self insured retention. You as the named insured will be responsible to pay this if a claim is filed.
                </span>
            {" "} I agree that I will be responsible for the deductible
          </label>
        </div>

        <div className="flex mt-4">
          <Checkbox className="mr-2" id="coverage-exclusions" />
          <label htmlFor="coverage-exclusions" className="text-sm pt-1 border-gray-300">
            I understand that this policy does not cover Professional Liability
          </label>
        </div>

        <div className="border-t border-dashed border-gray-400 my-8" />

        <Button
          className="w-full p-4 bg-primary text-white text-lg font-bold inline-flex justify-center items-center gap-x-3 rounded-md">
          <img src={checkout} alt="checkout" />
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default EventConfirmationCard;
