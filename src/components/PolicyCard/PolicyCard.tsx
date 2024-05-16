import { useCallback, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import useToggle from "@/hooks/useToggle";
import EventCard from "@/components/EventCard/EventCard";
import AddEventIcon from "@/components/AppIcons/AddEvent";
import { IPolicyCard } from "@/components/PolicyCard/PolicyCard.d";
import AddEventFilledIcon from "@/components/AppIcons/AddEventFilled";
import { ButtonVariant, IconPosition } from "@/models/enums/ButtonVariant";
import EventPagination from "@/components/EventPagination/EventPagination";
import AppConstants from "@/constants/AppConstants";

const PolicyCard = (props: IPolicyCard) => {
  const {
    listOfEvents = [],
    policy: { iconPath, subtitle, name },
    translationContent: {
      clickToAddEvent,
      showMore,
      showLess,
      edit,
      removePolicy,
      calendarIconAltText,
      clockIconAltText,
      doorIconAltText,
      addEventIconAltText,
    },
    onAddEventClick,
  } = props;

  const { t } = useTranslation();
  const [showMoreSubtitle, toggleShowMoreSubtitle] = useToggle(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPage = Math.ceil(
    listOfEvents.length / AppConstants.EVENTS_PER_PAGE,
  );

  const displayEvents = listOfEvents.slice(
    currentPage * AppConstants.EVENTS_PER_PAGE,
    (currentPage + 1) * AppConstants.EVENTS_PER_PAGE,
  );

  const eventsContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.focus();
    }
  }, [currentPage]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const addEvent = useCallback(() => {
    onAddEventClick(name);
  }, [name, onAddEventClick]);

  return (
    <li className="flex w-full flex-col items-start gap-x-3 gap-y-4 rounded-md bg-primary-5 px-4 py-6">
      <div className="grid w-full grid-cols-[60px_1fr] items-start gap-x-4">
        <div className="flex items-center justify-center rounded-md bg-primary px-3 py-2">
          <Icon
            src={iconPath}
            alt={t("common.iconAltText.policyLogo")}
            size={40}
          />
        </div>
        <div className="title-section w-full min-w-0 truncate">
          <h2 className="policy-title text-wrap font-segoe text-lg font-semibold text-primary">
            {name}
          </h2>
          <div
            className={cn("policy-subtitle text-wrap text-base", {
              flex: !showMoreSubtitle,
            })}
          >
            <p
              className={cn("text-graphite-700", {
                "w-2/3 truncate": !showMoreSubtitle,
              })}
              role="contentinfo"
            >
              {subtitle}
            </p>
            <span
              className={cn(
                "cursor-pointer text-primary underline focus-visible:outline-focus",
                { "ml-1": !showMoreSubtitle },
              )}
              onClick={toggleShowMoreSubtitle}
              tabIndex={0}
            >
              {showMoreSubtitle ? showLess : showMore}
            </span>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-x-4 lg:grid-cols-[60px_1fr]">
        <div className="hidden lg:block" />

        {/* ADD EVENT*/}
        <ul
          ref={eventsContainerRef}
          tabIndex={-1}
          className="flex flex-col gap-4 outline-none"
        >
          <li
            className="group flex cursor-pointer rounded border-2 border-dashed border-gray-400 bg-primary-25 hover:border-primary"
            onClick={addEvent}
            tabIndex={0}
          >
            <Button
              className="flex items-center gap-x-1 p-4 font-medium text-primary group-hover:font-bold group-hover:underline"
              variant={ButtonVariant.VANILLA}
              iconPosition={IconPosition.LEFT}
              icon={
                <>
                  <Icon
                    aria-hidden="true"
                    src={<AddEventFilledIcon />}
                    alt={addEventIconAltText}
                    size={24}
                    className="hidden group-hover:inline"
                  />
                  <Icon
                    aria-hidden="true"
                    src={<AddEventIcon />}
                    className="group-hover:hidden"
                    alt={addEventIconAltText}
                    size={24}
                  />
                </>
              }
            >
              {clickToAddEvent}
            </Button>
          </li>

          {/* EVENT CARD*/}
          {displayEvents?.map((_, idx: number) => {
            return (
              <li key={`policyEvent-${idx}`}>
                <EventCard
                  content={{
                    edit,
                    showMore,
                    showLess,
                    removePolicy,
                    calendarIconAltText,
                    clockIconAltText,
                    doorIconAltText,
                  }}
                />
              </li>
            );
          })}

          {/* PAGINATION */}
          {listOfEvents.length > 2 && (
            <EventPagination
              currentPage={currentPage}
              pageCount={totalPage}
              onPageChange={handlePageClick}
            />
          )}
        </ul>
      </div>
    </li>
  );
};

export default PolicyCard;
