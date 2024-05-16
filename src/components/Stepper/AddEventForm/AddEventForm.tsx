import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import AddEventModal from "@/components/AddEvent/components/AddEventModal";
import { useToggle } from "@/hooks/index";
import EventPolicy from "@/components/EventPolicy/EventPolicy";
import Button from "@/components/ui/Button";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import UpArrow from "@/components/AppIcons/UpArrow";

const AddEventForm = () => {
  const [showAddEventModal, toggleAddEventModal] = useToggle(false);
  const [selectedEventName, setSelectedEventName] = useState("");

  const { t } = useTranslation();

  const onAddEventClick = useCallback(
    (eventName: string) => {
      setSelectedEventName(eventName);
      toggleAddEventModal();
    },
    [toggleAddEventModal],
  );

  const pageContent = {
    pageTitle: t("pages.addEventForm.title"),
    pageSubTitle: t("pages.addEventForm.subTitle"),
    saveOneEvent: t("pages.addEventForm.saveOneEvent"),
    back: t("pages.addEventForm.back"),
    eventPolicies: {
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
      addEventModal: {
        addEventModalTitle: t(
          "pages.addEventForm.addEventModal.addEventModalTitle",
        ),
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
        foodAndBeverages: t(
          "pages.addEventForm.addEventModal.foodAndBeverages",
        ),
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
          fieldRequired:
            "pages.addEventForm.addEventModal.errors.fieldRequired",
          endDateInvalid:
            "pages.addEventForm.addEventModal.errors.endDateInvalid",
          endTimeInvalid:
            "pages.addEventForm.addEventModal.errors.endTimeInvalid",
          startDateInvalid:
            "pages.addEventForm.addEventModal.errors.startDateInvalid",
          startTimeInvalid:
            "pages.addEventForm.addEventModal.errors.startTimeInvalid",
        } as { [key: string]: string },
      },
    },
  };

  return (
    <form className="flex flex-col gap-y-6 lg:mb-64 lg:mr-auto lg:w-4/5">
      <div className="space-y-2">
        <h2 className="px-4 pt-6 font-segoe text-3xl font-bold text-primary lg:pt-0">
          {pageContent.pageTitle}
        </h2>
        <p className="px-4 text-lg font-normal text-graphite-700">
          {pageContent.pageSubTitle}
        </p>
      </div>
      <div>
        <EventPolicy
          onAddEventClick={onAddEventClick}
          translationContent={pageContent.eventPolicies}
        />
      </div>

      <AddEventModal
        eventName={selectedEventName}
        translationContent={pageContent.addEventForm.addEventModal}
        onConfirm={() => null}
        isOpen={showAddEventModal}
        toggle={toggleAddEventModal}
      />
      <div className="flex gap-x-4 px-4 pb-10 pt-2 lg:px-0 lg:pb-0 lg:pt-0">
        <Button
          className="button-secondary flex items-center justify-center gap-0 "
          variant={ButtonVariant.SECONDARY}
          type={ButtonType.SUBMIT}
        >
          <span>
            <UpArrow className="stroke-current" />
          </span>
          <span className="hidden lg:block">{pageContent.back}</span>
        </Button>
        <Button
          className="lg:w rounded-md text-base font-bold"
          variant={ButtonVariant.DISABLED}
          type={ButtonType.SUBMIT}
        >
          {pageContent.saveOneEvent}
        </Button>
      </div>
    </form>
  );
};

export default AddEventForm;
