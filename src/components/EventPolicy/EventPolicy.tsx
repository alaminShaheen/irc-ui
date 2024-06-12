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
      basicInfo: t("pages.addEventForm.addEventModal.basicInfo"),
      nameYourEventLabel: t(
        "pages.addEventForm.addEventModal.nameYourEventLabel",
      ),
      nameYourEventPlaceholder: t(
        "pages.addEventForm.addEventModal.nameYourEventPlaceholder",
      ),
      infoText: t("pages.addEventForm.addEventModal.infoText"),
      rentalFacilityLabel: t(
        "pages.addEventForm.addEventModal.rentalFacilityLabel",
      ),
      rentalFacilityPlaceholder: t(
        "pages.addEventForm.addEventModal.rentalFacilityPlaceholder",
      ),
      facilityLabel: t("pages.addEventForm.addEventModal.facilityLabel"),
      facilityPlaceholder: t(
        "pages.addEventForm.addEventModal.facilityPlaceholder",
      ),
      repeatLabel: t("pages.addEventForm.addEventModal.repeatLabel"),
      startDate: t("pages.addEventForm.addEventModal.startDate"),
      startTime: t("pages.addEventForm.addEventModal.startTime"),
      endDate: t("pages.addEventForm.addEventModal.endDate"),
      endTime: t("pages.addEventForm.addEventModal.endTime"),
      chooseDate: t("pages.addEventForm.addEventModal.chooseDate"),
      chooseTime: t("pages.addEventForm.addEventModal.chooseTime"),
      repeatEvent: t("pages.addEventForm.addEventModal.repeatEvent"),
      addTime: t("pages.addEventForm.addEventModal.addTime"),
      additionalQuestions: t(
        "pages.addEventForm.addEventModal.additionalQuestions",
      ),
      insuranceCoverageLabel: t(
        "pages.addEventForm.addEventModal.insuranceCoverageLabel",
      ),
      foodAndBeverages: t("pages.addEventForm.addEventModal.foodAndBeverages"),
      foodBeingSoldLabel: t(
        "pages.addEventForm.addEventModal.foodBeingSoldLabel",
      ),
      foodByThirdPartyLabel: t(
        "pages.addEventForm.addEventModal.foodByThirdPartyLabel",
      ),
      alcoholCoverageLabel: t(
        "pages.addEventForm.addEventModal.alcoholCoverageLabel",
      ),
      transport: t("pages.addEventForm.addEventModal.transport"),
      driverLicenceLabel: t(
        "pages.addEventForm.addEventModal.driverLicenceLabel",
      ),
      selfTransportation: t(
        "pages.addEventForm.addEventModal.selfTransportation",
      ),
      rentalVehicleOwnage: t(
        "pages.addEventForm.addEventModal.rentalVehicleOwnage",
      ),
      yes: t("pages.addEventForm.addEventModal.yes"),
      no: t("pages.addEventForm.addEventModal.no"),
      confirm: t("pages.addEventForm.addEventModal.confirm"),
      daily: t("pages.addEventForm.addEventModal.daily"),
      weekly: t("pages.addEventForm.addEventModal.weekly"),
      monthly: t("pages.addEventForm.addEventModal.monthly"),
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
