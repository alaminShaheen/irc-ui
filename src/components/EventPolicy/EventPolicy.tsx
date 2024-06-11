import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import policies from "@/data/policies.json";
import { Policy } from "@/models/Policy";
import PolicyCard from "@/components/PolicyCard/PolicyCard";
import { useToggle } from "@/hooks/index";
import AddEventModal from "@/components/AddEvent/components/AddEventModal";
import { getEventList } from "@/services/getEventList";
import { LanguageCode } from "@/models/enums/LanguageCode";
import { ICoverageInfo } from "@/components/EventPolicy/EventPolicy.d";

const EventPolicy = () => {
  const [coverageInfo, setCoverageInfo] = useState<ICoverageInfo>({});
  const [selectedPolicy, setSelectedPolicy] = useState<Policy>();
  const [showAddEventModal, toggleAddEventModal] = useToggle(false);
  const {
    i18n: { language: currentLanguage },
    t,
  } = useTranslation();

  const policyList = policies[currentLanguage as LanguageCode] as Policy[];

  const onAddEventClick = useCallback(
    (event: Policy) => {
      setSelectedPolicy(event);
      toggleAddEventModal();
    },
    [toggleAddEventModal],
  );

  const pageContent = {
    yourPolicies: {
      clickToAddEvent: t("pages.quote.yourPolicies.clickToAddEvent"),
      showMore: t("common.showMore"),
      showLess: t("common.showLess"),
      edit: t("common.edit"),
      removePolicy: t("pages.quote.yourPolicies.removePolicy"),
      calendarIconAltText: t("common.iconAltText.calendar"),
      clockIconAltText: t("common.iconAltText.clock"),
      doorIconAltText: t("common.iconAltText.door"),
      addEventIconAltText: t("common.iconAltText.addEvent"),
    },
    addEventForm: {
      title: t("pages.addEventForm.pageTitle"),
      basicInfo: t("pages.addEventForm.basicInfo"),
      nameYourEventLabel: t("pages.addEventForm.nameYourEventLabel"),
      nameYourEventPlaceholder: t(
        "pages.addEventForm.nameYourEventPlaceholder",
      ),
      infoText: t("pages.addEventForm.infoText"),
      rentalFacilityLabel: t("pages.addEventForm.rentalFacilityLabel"),
      rentalFacilityPlaceholder: t(
        "pages.addEventForm.rentalFacilityPlaceholder",
      ),
      facilityLabel: t("pages.addEventForm.facilityLabel"),
      facilityPlaceholder: t("pages.addEventForm.facilityPlaceholder"),
      repeatLabel: t("pages.addEventForm.repeatLabel"),
      startDate: t("pages.addEventForm.startDate"),
      startTime: t("pages.addEventForm.startTime"),
      endDate: t("pages.addEventForm.endDate"),
      endTime: t("pages.addEventForm.endTime"),
      chooseDate: t("pages.addEventForm.chooseDate"),
      chooseTime: t("pages.addEventForm.chooseTime"),
      repeatEvent: t("pages.addEventForm.repeatEvent"),
      addTime: t("pages.addEventForm.addTime"),
      additionalQuestions: t("pages.addEventForm.additionalQuestions"),
      insuranceCoverageLabel: t("pages.addEventForm.insuranceCoverageLabel"),
      foodAndBeverages: t("pages.addEventForm.foodAndBeverages"),
      foodBeingSoldLabel: t("pages.addEventForm.foodBeingSoldLabel"),
      foodByThirdPartyLabel: t("pages.addEventForm.foodByThirdPartyLabel"),
      alcoholCoverageLabel: t("pages.addEventForm.alcoholCoverageLabel"),
      transport: t("pages.addEventForm.transport"),
      driverLicenceLabel: t("pages.addEventForm.driverLicenceLabel"),
      selfTransportation: t("pages.addEventForm.selfTransportation"),
      rentalVehicleOwnage: t("pages.addEventForm.rentalVehicleOwnage"),
      yes: t("pages.addEventForm.yes"),
      no: t("pages.addEventForm.no"),
      confirm: t("pages.addEventForm.confirm"),
      daily: t("pages.addEventForm.daily"),
      weekly: t("pages.addEventForm.weekly"),
      monthly: t("pages.addEventForm.monthly"),
      addEventIconAltText: t("common.iconAltText.addEvent"),
      errorKeys: {
        fieldRequired: "pages.addEventForm.errors.fieldRequired",
        endDateInvalid: "pages.addEventForm.errors.endDateInvalid",
        endTimeInvalid: "pages.addEventForm.errors.endTimeInvalid",
        startDateInvalid: "pages.addEventForm.errors.startDateInvalid",
        startTimeInvalid: "pages.addEventForm.errors.startTimeInvalid",
      } as { [key: string]: string },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coverageInfoList: ICoverageInfo = await getEventList();
        setCoverageInfo(coverageInfoList);
      } catch (error) {
        console.error("Failed to fetch Coverage data:", error);
        setCoverageInfo({});
      }
    };

    void fetchData();
  }, []);

  return (
    <div>
      <ul className="space-y-6">
        {policyList?.map((policy: Policy) => {
          const listOfEvents = coverageInfo[policy.id]?.listOfEvents || [];
          return (
            <PolicyCard
              key={policy.id}
              listOfEvents={listOfEvents}
              onAddEventClick={onAddEventClick}
              policy={policy}
              translationContent={pageContent.yourPolicies}
            />
          );
        })}
      </ul>

      {selectedPolicy && (
        <AddEventModal
          policy={selectedPolicy}
          translationContent={pageContent.addEventForm}
          onConfirm={() => null}
          isOpen={showAddEventModal}
          toggle={toggleAddEventModal}
        />
      )}
    </div>
  );
};

export default EventPolicy;
