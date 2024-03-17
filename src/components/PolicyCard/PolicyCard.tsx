import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import useToggle from "@/hooks/useToggle";
import EventCard from "@/components/EventCard/EventCard";
import addEventIcon from "@/assets/icons/add-event.svg";
import { IPolicyCard } from "@/components/PolicyCard/PolicyCard.d";
import { LanguageCode } from "@/models/enums/LanguageCode";

const PolicyCard = (props: IPolicyCard) => {
  const {
    policy: { iconPath, subtitle_fr, subtitle, name, name_fr },
    translationContent: {
      addAnotherEvent,
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

  const {
    t,
    i18n: { language: currentLanguage },
  } = useTranslation();
  const [showMoreSubtitle, toggleShowMoreSubtitle] = useToggle(false);

  const addEvent = useCallback(() => {
    onAddEventClick(currentLanguage === LanguageCode.ENGLISH ? name : name_fr);
  }, [currentLanguage, name, name_fr, onAddEventClick]);

  return (
    <li className="rounded-md px-4 py-6 gap-x-3 items-start bg-primary-5 w-full flex flex-col gap-y-4">
      <div className="grid grid-cols-[60px_1fr] w-full items-start gap-x-4">
        <div className="bg-primary rounded-md flex justify-center items-center px-3 py-2">
          <Icon
            src={iconPath}
            alt={t("common.iconAltText.policyLogo")}
            size={40}
          />
        </div>
        <div className="truncate title-section min-w-0 w-full">
          <h2 className="text-primary text-wrap font-semibold policy-title text-[18px]">
            {currentLanguage === LanguageCode.ENGLISH ? name : name_fr}
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
              {currentLanguage === LanguageCode.ENGLISH
                ? subtitle
                : subtitle_fr}
            </p>
            <span
              className={cn(
                "underline cursor-pointer text-primary focus-visible:outline-focus",
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
      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr] gap-x-4 w-full">
        <div className="hidden lg:block" />
        <ul>
          {/*/!* TODO: Will be a list of event cards *!/*/}
          <EventCard
            content={{
              edit,
              removePolicy,
              calendarIconAltText,
              clockIconAltText,
              doorIconAltText,
            }}
          />

          <li
            className="border-dashed border-gray-400 border-2 rounded mt-4 p-4 flex bg-primary-25 cursor-pointer"
            onClick={addEvent}
            role="button"
            tabIndex={0}
          >
            <span aria-hidden="true">
              <Icon src={addEventIcon} alt={addEventIconAltText} width={24} height={24} />
            </span>
            <span className="text-primary font-semibold ml-1">
              {addAnotherEvent}
            </span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default PolicyCard;
