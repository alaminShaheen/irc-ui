import { useCallback } from "react";

import market from "@/assets/icons/market-icon.svg";
import addEventIcon from "@/assets/icons/add-event.svg";
import EventCard from "@/components/EventCard/EventCard";
import { cn } from "@/utils/helper";
import { IPolicyCard } from "@/components/PolicyCard/PolicyCard.d";
import Icon from "@/components/ui/Icon";
import useToggle from "@/hooks/useToggle";

const PolicyCard = (props: IPolicyCard) => {
  const {} = props;
  const [showMoreSubtitle, toggleShowMoreSubtitle] = useToggle(false);

  const addEvent = useCallback(() => {
    // TODO: Add event functionality
  }, []);

  return (
    <li className="rounded-md px-4 py-6 gap-x-3 items-start bg-primary-5 w-full flex flex-col gap-y-4">
      <div className="grid grid-cols-[60px_1fr] w-full items-start gap-x-4">
        <div className="bg-primary rounded-md flex justify-center items-center px-3 py-2">
          <Icon
            src={market}
            alt="market"
            size={40}
          />
        </div>
        <div className="truncate title-section min-w-0 w-full">
          <h2 className="text-primary text-wrap font-semibold policy-title text-[18px]">
            Multiple Vendors or Inflatables Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. At, cumque?
          </h2>
          <div
            className={cn("text-wrap text-base policy-subtitle", {
              flex: !showMoreSubtitle,
            })}
          >
            <p
              className={cn("text-graphite-700", {
                "w-2/3 truncate": !showMoreSubtitle,
              })}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
              amet dicta eum expedita ipsum iusto libero odio odit velit
              veritatis.
            </p>
            <span
              className={cn("underline cursor-pointer text-primary focus-visible:outline-focus", {
                "ml-1": !showMoreSubtitle,
              })}
              onClick={toggleShowMoreSubtitle}
              tabIndex={0}
            >
              {showMoreSubtitle ? "show less" : "show more"}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr] gap-x-4 w-full">
        <div className="hidden lg:block" />
        <ul>
          {/*/!* TODO: Will be a list of event cards *!/*/}
          <EventCard />

          <li
            className="border-dashed border-gray-400 border-2 rounded mt-4 p-4 flex bg-primary-25 cursor-pointer"
            onClick={addEvent}
            role="button"
            tabIndex={0}
          >
            <span aria-hidden="true">
              <Icon src={addEventIcon} alt="add event" width={24} height={24} />
            </span>
            <span className="text-primary font-semibold ml-1">
              Add another event
            </span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default PolicyCard;
