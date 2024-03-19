import door from "@/assets/icons/door.svg";
import Icon from "@/components/ui/Icon";
import clock from "@/assets/icons/clock.svg";
import Button from "@/components/ui/Button/Button";
import calendar from "@/assets/icons/calendar-1.svg";
import useToggle from "@/hooks/useToggle";
import calendarTime from "@/assets/icons/calendar-time.svg";
import { ButtonVariant } from "@/models/enums/ButtonVariant";
import { IEventCardProps } from "@/components/EventCard/EventCard.d";

const EventCard = ({ content }: IEventCardProps) => {
  const {
    edit,
    removePolicy,
    calendarIconAltText,
    clockIconAltText,
    doorIconAltText,
  } = content;
  const [showMoreEventDetails, toggleShowMoreEventDetails] = useToggle(false);

  return (
    <div className="event-card flex w-full flex-col items-start gap-y-3 rounded-md border-2 border-primary p-4 lg:flex-row lg:gap-x-3">
      <span className="hidden h-9 w-9 items-center justify-center rounded-md border border-primary bg-primary-50 sm:h-10 sm:w-12 lg:flex">
        <Icon src={calendar} alt={calendarIconAltText} size={22} />
      </span>

      <div className="flex w-full items-center justify-between lg:hidden">
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-primary bg-gray-300 sm:h-12 sm:w-12">
          <Icon src={calendar} alt={calendarIconAltText} size={22} />
        </span>
        <div className="flex gap-x-6 text-base text-primary underline">
          <Button className="p-0" variant={ButtonVariant.TRANSPARENT}>
            {edit}
          </Button>
          <Button className="p-0" variant={ButtonVariant.TRANSPARENT}>
            {removePolicy}
          </Button>
        </div>
      </div>

      <div className="event-details w-full">
        <div className="hidden justify-end gap-x-3 text-base text-primary underline lg:flex">
          <Button className="p-0" variant={ButtonVariant.TRANSPARENT}>
            {edit}
          </Button>
          <Button className="p-0" variant={ButtonVariant.TRANSPARENT}>
            {removePolicy}
          </Button>
        </div>

        <h3 className="text-xl text-primary">
          [Event name] - reocuring activity
        </h3>

        <div className="mt-3 flex items-center space-x-1">
          <span className="mr-1">
            <Icon src={calendarTime} alt={calendarIconAltText} size={20} />
          </span>
          <span className="space-x-1 text-base">
            <span className="font-bold text-primary">Every Friday</span>
            <span className="text-sm font-normal">from</span>
            <span className="font-bold text-primary">10:00 AM</span>
            <span className="text-sm font-normal">to</span>
            <span className="font-bold text-primary">3:00 PM</span>
          </span>
        </div>

        <div className="my-1 w-full border-t border-primary" />

        <div className="flex items-center">
          <span className="mr-1">
            <Icon src={clock} alt={clockIconAltText} size={20} />
          </span>
          <span className="text-primary">3 hours each</span>
        </div>

        <div className="my-1 w-full border-t border-primary" />

        <div className="flex items-center">
          <span className="mr-1">
            <Icon src={door} alt={doorIconAltText} size={24} />
          </span>
          <span className="text-primary">
            <span>[Facility name]</span>,<span>[Facility name]</span>,
            <span>[Facility name]</span>,
            <span className="font-bold text-primary">+3 other</span>
          </span>
        </div>

        <p
          onClick={toggleShowMoreEventDetails}
          tabIndex={0}
          className="mt-4 cursor-pointer text-sm font-bold text-primary underline focus-visible:outline-focus lg:text-base"
        >
          {showMoreEventDetails ? "Show less details" : "Show more details"}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
