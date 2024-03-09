import Checkbox from "@/components/ui/Checkbox.tsx";
import Button from "@/components/ui/Button.tsx";
import checkout from "@/assets/icons/checkout.svg";

const EventConfirmationCard = () => {
  return (

    <div
      className="mx-0 lg:mx-4 mt-8 lg:mt-0 w-full h-full bg-[url('src/assets/images/event-checkout-bg.png')] bg-contain bg-no-repeat p-4">
      <div>
        <img src="" alt="" />
      </div>
      <div className="flex justify-between">
        <p className="text-gray-500">Number of events:</p>
        <p className="text-primary font-bold">2</p>
      </div>

      <div className="flex justify-between text-primary my-4 items-center">
        <p className="text-lg font-bold">Total cost of policies</p>
        <p className="font-bold text-3xl">$168.5</p>
      </div>

      <div className="flex justify-between text-primary my-4 items-center">
        <p className="text-lg">[Event name] - reoccurring activity</p>
        <p className="font-bold text-xl">$120.9</p>
      </div>

      <div className="flex justify-between text-primary my-4 items-center">
        <p className="text-lg">Hockey Match</p>
        <p className="font-bold text-xl">$35.15</p>
      </div>

      <div className="border-t border-dashed border-gray-400" />

      <div className="flex justify-between text-primary my-4 items-center">
        <p className="text-lg">Provincial Sales Tax:</p>
        <p className="font-bold text-xl">$12.49</p>
      </div>


      <div className="flex ">
        <Checkbox className="mr-2" id="coverage-exclusions" />
        <label htmlFor="coverage-exclusions" className="text-sm border-b pb-3 pt-1 border-gray-300">
          I understand the coverage and exclusions of this policy
        </label>
      </div>

      <div className="flex my-4 items-end">
        <Checkbox className="mr-3 flex-grow mb-3" id="responsible" />
        <label htmlFor="responsible" className="text-sm border-b pb-3 pt-1 border-gray-300 w-full">
            <span className="font-light block">
                In the event of a claim against you, this policy contains a $1,500 deductible / self insured retention. You as the named insured will be responsible to pay this if a claim is filed.
              </span>
          {" "} I agree that I will be responsible for the deductible
        </label>
      </div>

      <div className="flex ">
        <Checkbox className="mr-2" id="coverage-exclusions" />
        <label htmlFor="coverage-exclusions" className="text-sm pt-1 border-gray-300">
          I understand that this policy does not cover Professional Liability
        </label>
      </div>

      <div className="border-t border-dashed border-gray-400 mt-12 mb-6" />

      <Button
        className="w-full p-4 bg-primary text-white text-lg font-bold inline-flex justify-center items-center gap-x-3 rounded-md">
        <img src={checkout} alt="checkout" />
        Checkout
      </Button>
    </div>
  );
};

export default EventConfirmationCard;
