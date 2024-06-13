import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import policies from "@/data/policies.json";
import { Event } from "@/models/Event";
import { Policy } from "@/models/Policy";
import PolicyCard from "@/components/PolicyCard/PolicyCard";
import EventModal from "@/components/AddEvent/components/AddEventModal";
import { useToggle } from "@/hooks/index";
import { PolicyEvents } from "@/models/PolicyEvents";
import { getEventList } from "@/services/getEventList";
import { LanguageCode } from "@/models/enums/LanguageCode";

const EventPolicy = () => {
  const {
    i18n: { language: currentLanguage },
    t,
  } = useTranslation();
  const [selectedPolicy, setSelectedPolicy] = useState<Policy>();
  const [showEventModal, toggleEventModal] = useToggle(false);
  const [policyWithEvents, setPolicyWithEvents] = useState<PolicyEvents>(() =>
    (policies[currentLanguage as LanguageCode] as Policy[]).reduce(
      (currentValue, policy) => {
        currentValue[policy.id] = [];
        return currentValue;
      },
      {} as PolicyEvents,
    ),
  );
  const [eventToBeEdited, setEventToBeEdited] = useState<Event>();

  const policyList = policies[currentLanguage as LanguageCode] as Policy[];

  const onAddEventClick = useCallback(
    (policy: Policy) => {
      setSelectedPolicy(policy);
      toggleEventModal();
    },
    [toggleEventModal],
  );

  const closeEventModal = useCallback(() => {
    setSelectedPolicy(undefined);
    setEventToBeEdited(undefined);
    toggleEventModal();
  }, [toggleEventModal]);

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

  const onSubmit = useCallback(
    (event: Event) => {
      if (selectedPolicy) {
        setPolicyWithEvents((prev) => {
          return {
            ...prev,
            [selectedPolicy.id]: [event, ...prev[selectedPolicy.id]],
          };
        });
      }
    },
    [selectedPolicy],
  );

  const onEditEvent = useCallback(
    (event: Event, policy: Policy) => {
      setSelectedPolicy(policy);
      setEventToBeEdited(event);
      toggleEventModal();
    },
    [toggleEventModal],
  );

  const onDeleteEvent = useCallback((eventIndex: number, policy: Policy) => {
    setPolicyWithEvents((prev) => ({
      ...prev,
      [policy.id]: prev[policy.id].filter((_, index) => index !== eventIndex),
    }));
    // TODO: Change to modal confirmation
    alert("Item deleted successfully");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEventList();
        const policyIds = Object.keys(result);
        setPolicyWithEvents((prev) => {
          return policyIds.reduce(
            (currentPolicyWithEvents, policyId) => {
              currentPolicyWithEvents[policyId] = [
                ...currentPolicyWithEvents[policyId],
                ...result[policyId],
              ];
              return currentPolicyWithEvents;
            },
            { ...prev },
          );
        });
      } catch (error) {
        console.error("Failed to fetch Coverage data:", error);
      }
    };

    void fetchData();
  }, []);

  return (
    <div>
      <ul className="space-y-6">
        {policyList?.map((policy: Policy) => {
          return (
            <PolicyCard
              onDeleteEvent={onDeleteEvent}
              onEditEvent={onEditEvent}
              key={policy.id}
              events={policyWithEvents[policy.id]}
              onAddEvent={onAddEventClick}
              policy={policy}
              translationContent={pageContent.yourPolicies}
            />
          );
        })}
      </ul>

      {selectedPolicy && (
        <EventModal
          event={eventToBeEdited}
          policy={selectedPolicy}
          translationContent={pageContent.addEventForm}
          onConfirm={onSubmit}
          isOpen={
            showEventModal && !!selectedPolicy && eventToBeEdited
              ? !!eventToBeEdited
              : !eventToBeEdited
          }
          toggle={closeEventModal}
        />
      )}
    </div>
  );
};

export default EventPolicy;
