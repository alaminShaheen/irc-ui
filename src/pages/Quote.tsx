import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Alert from "@/components/ui/Alert/Alert";
import Button from "@/components/ui/Button";
import PolicyCard from "@/components/PolicyCard/PolicyCard";
import InsuredForm from "@/components/InsuredForm/InsuredForm";
import { useToggle } from "@/hooks/index";
import { ButtonVariant } from "@/models/enums/ButtonVariant";
import EventConfirmationCard from "@/components/EventConfirmationCard/EventConfirmationCard";

const Quote = () => {
  const [editMode, toggleEditMode] = useToggle(false);
  const { t } = useTranslation();

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
            {new Array(3).fill(3).map((_, index) => (
              <PolicyCard
                key={index}
                title={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aspernatur."
                }
                subtitle={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad aspernatur consequuntur debitis distinctio ducimus eos esse excepturi impedit, minima odit officiis provident, quae rem reprehenderit repudiandae rerum ullam voluptatem?"
                }
                content={pageContent.yourPolicies}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-2">
        <EventConfirmationCard content={pageContent.eventConfirmationContent} />
      </div>
    </div>
  );
};

export default Quote;
