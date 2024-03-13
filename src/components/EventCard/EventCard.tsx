import door from "@/assets/icons/door.svg";
import Icon from "@/components/ui/Icon";
import clock from "@/assets/icons/clock.svg";
import Button from "@/components/ui/Button/Button";
import calendar from "@/assets/icons/calendar-1.svg";
import useToggle from "@/hooks/useToggle";
import calendarTime from "@/assets/icons/calendar-time.svg";
import { ButtonVariant } from "@/models/enums/ButtonVariant";

const EventCard = () => {
  const [showMoreEventDetails, toggleShowMoreEventDetails] = useToggle(false);

  return (
    <div className="event-card border-2 border-primary rounded-md gap-y-3 lg:gap-x-3 flex flex-col lg:flex-row items-start p-4 w-full">
      <span className="w-9 h-9 sm:w-12 sm:h-10 bg-primary-50 hidden lg:flex justify-center items-center rounded-md border border-primary">
        <Icon src={calendar} alt="calendar" size={22} />
      </span>

      <div className="flex items-center justify-between lg:hidden w-full">
        <span className="w-9 h-9 sm:w-12 sm:h-12 bg-gray-300 flex justify-center items-center rounded-md border border-primary">
          <Icon src={calendar} alt="calendar" size={22} />
        </span>
        <div className="flex gap-x-6 text-base underline text-primary">
          <Button variant={ButtonVariant.TRANSPARENT}>Edit</Button>
          <Button variant={ButtonVariant.TRANSPARENT}>Remove policy</Button>
        </div>
      </div>

      <div className="event-details w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-primary text-xl">
            [Event name] - reocuring activity
          </h3>
          <div className="hidden lg:flex gap-x-3 text-base underline text-primary">
            <Button variant={ButtonVariant.TRANSPARENT}>Edit</Button>
            <Button variant={ButtonVariant.TRANSPARENT}>Remove policy</Button>
          </div>
        </div>

        <div className="mt-3 flex space-x-1 items-center">
          <span className="mr-1">
            <Icon src={calendarTime} alt="calendar" size={20} />
          </span>
          <span className="space-x-1 text-base">
            <span className="font-bold text-primary underline">
              Every Friday
            </span>
            <span className="text-sm font-thin">from</span>
            <span className="font-bold text-primary underline">10:00 AM</span>
            <span className="text-sm font-thin">to</span>
            <span className="font-bold text-primary underline">3:00 PM</span>
          </span>
        </div>

        <div className="border-t border-primary w-full my-1" />

        <div className="flex items-center">
          <span className="mr-1">
            <Icon src={clock} alt="clock" size={20} />
          </span>
          <span className="text-primary">3 hours each</span>
        </div>

        <div className="border-t border-primary w-full my-1" />

        <div className="flex items-center">
          <span className="mr-1">
            <Icon src={door} alt="door" size={20} />
          </span>
          <span className="text-primary">
            <span className="underline">[Facility name]</span>,
            <span className="underline">[Facility name]</span>,
            <span className="underline">[Facility name]</span>,
            <span className="text-primary font-bold">+3 other</span>
          </span>
        </div>

        <p
          onClick={toggleShowMoreEventDetails}
          tabIndex={0}
          className="text-primary underline font-bold mt-4 cursor-pointer text-sm lg:text-base focus-visible:outline-focus"
        >
          {showMoreEventDetails ? "Show less details" : "Show more details"}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
