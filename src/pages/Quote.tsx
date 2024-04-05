import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

import Alert from "@/components/ui/Alert/Alert";
import Button from "@/components/ui/Button";
import policies from "@/data/policies.json";
import { Policy } from "@/models/Policy";
import PolicyCard from "@/components/PolicyCard/PolicyCard";
import InsuredForm from "@/components/InsuredForm/InsuredForm";
import { useToggle } from "@/hooks/index";
import AddEventModal from "@/components/AddEvent/components/AddEventModal";
import { LanguageCode } from "@/models/enums/LanguageCode";
import { ButtonVariant } from "@/models/enums/ButtonVariant";
import EventConfirmationCard from "@/components/EventConfirmationCard/EventConfirmationCard";

const Quote = () => {
  const [editMode, toggleEditMode] = useToggle(false);
  const [showAddEventModal, toggleAddEventModal] = useToggle(false);
  const [selectedEventName, setSelectedEventName] = useState("");

  const {
    t,
    i18n: { language: currentLanguage },
  } = useTranslation();

  // const addEvent = useCallback(() => {
  //   // TODO: Add event functionality
  // }, []);

  const onAddEventClick = useCallback(
    (eventName: string) => {
      setSelectedEventName(eventName);
      toggleAddEventModal();
    },
    [toggleAddEventModal],
  );

  const pageContent = {
    insuredFormContent: {
      nameOfInsuredLabel: t("pages.quote.insured.nameOfInsuredLabel"),
      addressOfInsuredLabel: t("pages.quote.insured.addressOfInsuredLabel"),
      telephoneNumLabel: t("pages.quote.insured.telephoneNumLabel"),
      emailAddressLabel: t("pages.quote.insured.emailAddressLabel"),
      fieldRequiredKey: "pages.quote.insured.fieldRequired",
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
      title: t("pages.addEventForm.title"),
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

  return (
    <div className="flex flex-col gap-x-6 px-4 py-6 lg:grid lg:grid-cols-5 lg:px-9 lg:py-8">
      <Helmet>
        <title>{t("pages.quote.seo.title")}</title>
      </Helmet>

      <div className="lg:col-span-3">
        <Alert alertMessage={t("pages.quote.policyNotification")} />

        <div className="mt-8">
          <div className="flex items-center gap-x-2 text-primary">
            <h1 className="text-2xl font-semibold">
              {t("pages.quote.insured.title")}
            </h1>
            {!editMode && (
              <Button
                className="cursor-pointer p-0 font-segoe font-normal underline"
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
          <h1 className="my-8 font-segoe text-2xl font-semibold text-primary">
            {t("pages.quote.yourPolicies.title")}
          </h1>

          <ul className="space-y-6">
            {(policies[currentLanguage as LanguageCode] as Policy[]).map(
              (policy) => (
                <PolicyCard
                  onAddEventClick={onAddEventClick}
                  key={policy.id}
                  policy={policy}
                  translationContent={pageContent.yourPolicies}
                />
              ),
            )}
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
