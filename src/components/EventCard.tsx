import calendar from "@/assets/icons/calendar-1.svg";
import calendarTime from "@/assets/icons/calendar-time.svg";
import clock from "@/assets/icons/clock.svg";
import door from "@/assets/icons/door.svg";
import Button from "@/components/ui/Button.tsx";
import { useCallback, useState } from "react";

const EventCard = () => {
  const [showMoreEventDetails, setShowMoreEventDetails] = useState(false);

  const toggleEventDetails = useCallback(() => {
    setShowMoreEventDetails(prev => !prev);

  }, []);


  return (
    <div className="event-card border-2 border-primary rounded-md gap-x-3 flex items-start p-3 w-full">
      <span className="w-12 h-10 bg-gray-300 flex justify-center items-center rounded-md">
        <img src={calendar} alt="calendar" width={22} height={22} />
      </span>

      <div className="event-details w-full">
        <div className="flex justify-between items-start">
          <p className="font-bold text-primary pt-4">[Event name] - reocuring activity</p>
          <div className="flex gap-x-3 text-sm underline">
            <Button>Edit</Button>
            <Button>Remove policy</Button>
          </div>
        </div>
        <div className="mt-3 flex space-x-1 items-center">
          <span className="mr-1">
            <img src={calendarTime} alt="calendar" width={20} height={20} />
          </span>
          <span className="font-bold text-primary underline">Every Friday</span>
          <span className="text-sm font-thin">from</span>
          <span className="font-bold text-primary underline">10:00 AM</span>
          <span className="text-sm font-thin">to</span>
          <span className="font-bold text-primary underline">3:00 PM</span>
        </div>

        <div className="border-t border-primary w-full my-1" />

        <div className="flex items-center">
          <span className="mr-2">
            <img src={clock} alt="clock" width={20} height={20} />
          </span>
          <span className="text-primary">3 hours each</span>
        </div>

        <div className="border-t border-primary w-full my-1" />

        <div className="flex items-center">
          <span className="mr-2">
            <img src={door} alt="door" width={20} height={20} />
          </span>
          <span className="text-primary">
            <span className="underline">[Facility name]</span>,
            <span className="underline">[Facility name]</span>,
            <span className="underline">[Facility name]</span>,
            <span className="text-primary font-bold">+3 other</span>
          </span>
        </div>

        <p onClick={toggleEventDetails} className="text-primary underline font-bold mt-3 cursor-pointer">
          {showMoreEventDetails ? "Show less details" : "Show more details"}
        </p>

      </div>
    </div>
  );
};

export default EventCard;
