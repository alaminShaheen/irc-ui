import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Button from "@/components/ui/Button/Button";
import checkout from "@/assets/icons/checkout.svg";
import bgCard from "@/assets/images/event-checkout-bg.png";
import { twMerge } from "tailwind-merge";
import AppConstants from "@/constants/AppConstants";

const EventConfirmationCard = () => {
  return (

    <div className="mx-0 lg:mx-4 mt-8 lg:mt-0 w-full h-auto px-6 py-6 pb-11 relative">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <img src={bgCard} alt="card" className="w-full h-full" />
      </div>
      <div className="relative z-10">

        <div className="flex justify-between text-lg font-semibold">
          <p className="text-graphite-700">Number of events:</p>
          <p className="text-primary">2</p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center">
          <p className="text-2xl font-bold">Total cost of policies</p>
          <p className="font-bold text-4xl">$168.5</p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center text-lg">
          <p>[Event name] - reoccurring activity</p>
          <p className="font-bold">$120.9</p>
        </div>

        <div className="flex justify-between text-primary mt-4 items-center text-lg">
          <p>Hockey Match</p>
          <p className="font-bold">$35.15</p>
        </div>

        <div className="border-t border-dashed border-white-700 mt-4" />

        <div className="flex justify-between text-primary mt-4 items-center">
          <p className="text-lg">Provincial Sales Tax:</p>
          <p className="font-bold text-xl">$12.49</p>
        </div>


        <div className="flex mt-6 items-center">
          <div className="flex items-center justify-center">
            <Checkbox className="mr-2" id="coverage-exclusions" />
          </div>
          <label htmlFor="coverage-exclusions" className="text-black w-full">
            I understand the coverage and exclusions of this policy
          </label>
        </div>

        <div
          className={twMerge(
            "h-1 border-t border-primary-300 ml-auto my-4",
            `w-[calc(100%-${AppConstants.CHECKBOX_SIZE}px)]`)}
        />

        <div className="flex flex-col items-end w-full">
          <div className="flex w-full">
            <div className="min-w-[30px] mr-2"/>
            <span className="font-light">
              In the event of a claim against you, this policy contains a $1,500 deductible / self insured retention.
              You as the named insured will be responsible to pay this if a claim is filed.
            </span>
          </div>
          <div className="flex items-center w-full">
            <div className="flex items-center justify-center">
              <Checkbox className="mr-2" id="responsible" />
            </div>
            <label htmlFor="responsible" className="text-black w-full">
              {" "} I agree that I will be responsible for the deductible
            </label>
          </div>
        </div>

        <div
          className={twMerge(
            "h-1 border-t border-primary-300 ml-auto my-4",
            `w-[calc(100%-${AppConstants.CHECKBOX_SIZE}px)]`)}
        />

        <div className="flex items-center">
          <div className="flex items-center justify-center">
            <Checkbox className="mr-2" id="coverage-exclusions" />
          </div>
          <label htmlFor="coverage-exclusions" className="border-primary-300 text-black">
            I understand that this policy does not cover Professional Liability
          </label>
        </div>

        <div className="border-t border-dashed border-white-700 my-8" />

        <Button
          className="w-full p-4 bg-primary text-white text-xl font-bold inline-flex justify-center items-center gap-x-3 rounded-md">
          <img src={checkout} alt="checkout" />
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default EventConfirmationCard;
