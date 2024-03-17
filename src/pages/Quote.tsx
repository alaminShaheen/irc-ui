import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Alert from "@/components/ui/Alert/Alert";
import Button from "@/components/ui/Button";
import policies from "@/data/policies.json";
import { Policy } from "@/models/Policy";
import PolicyCard from "@/components/PolicyCard/PolicyCard";
import InsuredForm from "@/components/InsuredForm/InsuredForm";
import { useToggle } from "@/hooks/index";
import AddEventModal from "@/components/AddEventModal";
import { ButtonVariant } from "@/models/enums/ButtonVariant";
import EventConfirmationCard from "@/components/EventConfirmationCard/EventConfirmationCard";

const Quote = () => {
  const [editMode, toggleEditMode] = useToggle(false);
  const [showAddEventModal, toggleAddEventModal] = useToggle(false);
  const [selectedEventName, setSelectedEventName] = useState("");
  const { t } = useTranslation();

  const addEvent = useCallback(() => {
    // TODO: Add event functionality
  }, []);

  const onAddEventClick = useCallback((eventName: string) => {
      setSelectedEventName(eventName);
      toggleAddEventModal();
    },
    [toggleAddEventModal],
  );

  useEffect(() => {
    document.title = t("pages.quote.pageTitle");
  }, [t]);

  const pageContent = {
    insuredFormContent: {
      nameOfInsuredLabel: t("pages.quote.insured.nameOfInsuredLabel"),
      addressOfInsuredLabel: t("pages.quote.insured.addressOfInsuredLabel"),
      telephoneNumLabel: t("pages.quote.insured.telephoneNumLabel"),
      emailAddressLabel: t("pages.quote.insured.emailAddressLabel"),
    },
    yourPolicies: {
      addAnotherEvent: t("pages.quote.yourPolicies.addAnotherEvent"),
      showMore: t("common.showMore"),
      showLess: t("common.showLess"),
      edit: t("common.edit"),
      removePolicy: t("pages.quote.yourPolicies.removePolicy"),
      calendarIconAltText: t("common.iconAltText.calendar"),
      clockIconAltText: t("common.iconAltText.clock"),
      doorIconAltText: t("common.iconAltText.door"),
      addEventIconAltText: t("common.iconAltText.addEvent"),
    },
    eventConfirmationContent: {
      numOfEventsTitle: t("pages.quote.eventConfirmation.numOfEventsTitle"),
      totalPolicyCostTitle: t(
        "pages.quote.eventConfirmation.totalPolicyCostTitle",
      ),
      provincialSalesTaxTitle: t(
        "pages.quote.eventConfirmation.provincialSalesTaxTitle",
      ),
      agreement1: t("pages.quote.eventConfirmation.agreement1"),
      agreement2Info: t("pages.quote.eventConfirmation.agreement2Info"),
      agreement2: t("pages.quote.eventConfirmation.agreement2"),
      agreement3: t("pages.quote.eventConfirmation.agreement3"),
      confirmAboveButtonText: t(
        "pages.quote.eventConfirmation.confirmAboveButtonText",
      ),
      checkoutButtonText: t("pages.quote.eventConfirmation.checkoutButtonText"),
      cardBgImageAltText: t("common.iconAltText.card"),
      checkoutIconAltText: t("common.iconAltText.checkout"),
    },
    addEventForm: {
      title: t("addEventForm.title"),
      basicInfo: t("addEventForm.basicInfo"),
      nameYourEventLabel: t("addEventForm.nameYourEventLabel"),
      nameYourEventPlaceholder: t("addEventForm.nameYourEventPlaceholder"),
      infoText: t("addEventForm.infoText"),
      rentalFacilityLabel: t("addEventForm.rentalFacilityLabel"),
      rentalFacilityPlaceholder: t("addEventForm.rentalFacilityPlaceholder"),
      facilityLabel: t("addEventForm.facilityLabel"),
      facilityPlaceholder: t("addEventForm.facilityPlaceholder"),
      repeatLabel: t("addEventForm.repeatLabel"),
      startDate: t("addEventForm.startDate"),
      startTime: t("addEventForm.startTime"),
      endDate: t("addEventForm.endDate"),
      endTime: t("addEventForm.endTime"),
      chooseDate: t("addEventForm.chooseDate"),
      chooseTime: t("addEventForm.chooseTime"),
      repeatEvent: t("addEventForm.repeatEvent"),
      addTime: t("addEventForm.addTime"),
      additionalQuestions: t("addEventForm.additionalQuestions"),
      insuranceCoverageLabel: t("addEventForm.insuranceCoverageLabel"),
      foodAndBeverages: t("addEventForm.foodAndBeverages"),
      foodBeingSoldLabel: t("addEventForm.foodBeingSoldLabel"),
      foodByThirdPartyLabel: t("addEventForm.foodByThirdPartyLabel"),
      alcoholCoverageLabel: t("addEventForm.alcoholCoverageLabel"),
      transport: t("addEventForm.transport"),
      driverLicenceLabel: t("addEventForm.driverLicenceLabel"),
      selfTransportation: t("addEventForm.selfTransportation"),
      rentalVehicleOwnage: t("addEventForm.rentalVehicleOwnage"),
      yes: t("addEventForm.yes"),
      no: t("addEventForm.no"),
      confirm: t("addEventForm.confirm"),
      daily: t("addEventForm.daily"),
      weekly: t("addEventForm.weekly"),
      monthly: t("addEventForm.monthly"),
      addEventIconAltText: t("common.iconAltText.addEvent"),
    },
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-5 gap-x-6">
      <div className="lg:col-span-3">
        <Alert alertMessage={t("pages.quote.policyNotification")} />

        <div className="mt-6">
          <div className="flex text-primary items-center">
            <h1 className="text-2xl font-bold mr-2">
              {t("pages.quote.insured.title")}
            </h1>
            {!editMode && (
              <Button
                className="underline cursor-pointer px-0"
                variant={ButtonVariant.TRANSPARENT}
                onClick={toggleEditMode}
              >
                {t("common.edit")}
              </Button>
            )}
          </div>

          <InsuredForm
            editModeEnabled={editMode}
            onCancel={toggleEditMode}
            onSave={toggleEditMode}
            content={pageContent.insuredFormContent}
          />

          {/*Your policies*/}
          <h1 className="text-primary text-2xl font-bold my-8">
            {t("pages.quote.yourPolicies.title")}
          </h1>

          <ul className="space-y-6">
            {(policies as Policy[]).map((policy) => (
              <PolicyCard
                onAddEventClick={onAddEventClick}
                key={policy.id}
                policy={policy}
                translationContent={pageContent.yourPolicies}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-2">
        <EventConfirmationCard content={pageContent.eventConfirmationContent} />
      </div>

      <AddEventModal
        eventName={selectedEventName}
        translationContent={pageContent.addEventForm}
        onConfirm={() => null}
        isOpen={showAddEventModal}
        toggle={toggleAddEventModal}
      />
    </div>
  );
};

export default Quote;
