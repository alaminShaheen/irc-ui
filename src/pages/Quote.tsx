import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

import Alert from "@/components/ui/Alert/Alert";
import Button from "@/components/ui/Button";
import EventPolicy from "@/components/EventPolicy/EventPolicy";
import InsuredForm from "@/components/InsuredForm/InsuredForm";
import { useToggle } from "@/hooks/index";
import { ButtonVariant } from "@/models/enums/ButtonVariant";
import EventConfirmationCard from "@/components/EventConfirmationCard/EventConfirmationCard";

const Quote = () => {
  const [editMode, toggleEditMode] = useToggle(false);
  const { t } = useTranslation();

  const pageContent = {
    insuredFormContent: {
      nameOfInsuredLabel: t("pages.quote.insured.nameOfInsuredLabel"),
      addressOfInsuredLabel: t("pages.quote.insured.addressOfInsuredLabel"),
      telephoneNumLabel: t("pages.quote.insured.telephoneNumLabel"),
      emailAddressLabel: t("pages.quote.insured.emailAddressLabel"),
      fieldRequiredKey: "pages.quote.insured.fieldRequired",
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
  };

  return (
    <div className="flex flex-col gap-x-6 px-4 py-6 lg:grid lg:grid-cols-5 lg:px-9 lg:py-8">
      <Helmet title={t("pages.quote.seo.title")} />

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
          <EventPolicy />
        </div>
      </div>
      <div className="col-span-2">
        <EventConfirmationCard content={pageContent.eventConfirmationContent} />
      </div>
    </div>
  );
};

export default Quote;
