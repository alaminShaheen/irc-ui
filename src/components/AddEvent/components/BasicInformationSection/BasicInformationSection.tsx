import { FaRegTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useFieldArray, useFormContext } from "react-hook-form";

import Icon from "@/components/ui/Icon";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import FormError from "@/components/FormError";
import EventDates from "@/components/AddEvent/components/EventDates";
import AddEventIcon from "@/components/AppIcons/AddEvent";
import { AddEventModel } from "@/models/form/AddEventModel";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";

const BasicInformationSection = () => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext<AddEventModel>();
  const { fields, append, remove } = useFieldArray<AddEventModel>({
    control,
    name: `facilityInfo`,
  });
  const { t } = useTranslation();

  const pageContent = {
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
    datesOfEvents: t("pages.addEventForm.addEventModal.datesOfEvents"),
    eventDuration: t("pages.addEventForm.addEventModal.eventDuration"),
    eventDurations: t("pages.addEventForm.addEventModal.eventDurations"),
    chooseDuration: t("pages.addEventForm.addEventModal.chooseDuration"),
    repeatEvent: t("pages.addEventForm.addEventModal.repeatEvent"),
    addDuration: t("pages.addEventForm.addEventModal.addDuration"),
    addFacility: t("pages.addEventForm.addEventModal.addFacility"),
    deleteFacility: t("pages.addEventForm.addEventModal.deleteFacility"),
    deleteDuration: t("pages.addEventForm.addEventModal.deleteDuration"),
    addEventIconAltText: t("common.iconAltText.addEvent"),
    errorKeys: {
      fieldRequired: "pages.addEventForm.addEventModal.errors.fieldRequired",
      endDateInvalid: "pages.addEventForm.addEventModal.errors.endDateInvalid",
      endTimeInvalid: "pages.addEventForm.addEventModal.errors.endTimeInvalid",
      startDateInvalid:
        "pages.addEventForm.addEventModal.errors.startDateInvalid",
      startTimeInvalid:
        "pages.addEventForm.addEventModal.errors.startTimeInvalid",
    } as { [key: string]: string },
  };

  const addFacilityInfo = useCallback(() => {
    append({
      facility: "",
      rentalFacilityAgreementNumber: "",
      dateRanges: [{ endDate: new Date(), startDate: new Date() }],
    });
  }, [append]);

  const removeFacility = useCallback(
    (index: number) => {
      if (fields.length > 1) {
        remove(index);
      }
    },
    [fields.length, remove],
  );

  useEffect(() => {
    setValue("repeatEvent", false);
  }, [setValue]);

  return (
    <>
      <h2 className="font-segoe text-2xl font-bold text-primary">
        {pageContent.basicInfo}
      </h2>
      <div className={cn("form-group mt-6", { "has-error": errors.eventName })}>
        <label htmlFor="eventName" className="form-label">
          {pageContent.nameYourEventLabel}
        </label>
        <input
          {...register("eventName")}
          id="eventName"
          className="input p-4"
          placeholder={pageContent.nameYourEventPlaceholder}
          type="text"
          aria-describedby={
            errors.eventName?.message ? "message-error" : undefined
          }
        />
        <span className="mt-2 flex items-center gap-x-1">
          <IoInformationCircleOutline
            size={20}
            className="stroke-graphite-700"
          />{" "}
          <span className="text-graphite-700">{pageContent.infoText}</span>
        </span>
        {errors.eventName?.message && (
          <FormError
            id="message-error"
            errorMessage={t(errors.eventName.message)}
          />
        )}
      </div>
      <h2 className="font-segoe text-2xl font-bold text-primary">
        {pageContent.datesOfEvents}
      </h2>
      {fields.map((field, index) => {
        return (
          <div
            className="rounded-md border-2 border-dashed border-primary-200 bg-primary-25 p-4"
            key={field.id}
          >
            <span className="w-full">
              <Button
                className={cn(
                  "ml-auto flex w-full cursor-pointer items-center justify-center gap-x-1 !border-none p-0 text-xl lg:w-auto",
                  {
                    "opacity-65": fields.length <= 1,
                  },
                )}
                variant={ButtonVariant.SECONDARY}
                buttonType={ButtonType.BUTTON}
                title={pageContent.deleteFacility}
                disabled={fields.length <= 1}
                onClick={() => removeFacility(index)}
                icon={
                  <Icon
                    src={<FaRegTrashAlt />}
                    alt={pageContent.deleteFacility}
                    size={24}
                  />
                }
              >
                {pageContent.deleteFacility}
              </Button>
            </span>
            <div className="grid grid-cols-2 gap-x-10">
              <div
                className={cn("form-group", {
                  "has-error":
                    errors.facilityInfo?.[index]?.rentalFacilityAgreementNumber,
                })}
              >
                <label
                  htmlFor="rentalFacilityAgreementNumber"
                  className="form-label"
                >
                  {pageContent.rentalFacilityLabel}
                </label>
                <input
                  {...register(
                    `facilityInfo.${index}.rentalFacilityAgreementNumber`,
                  )}
                  id="rentalFacilityAgreementNumber"
                  className="input p-4"
                  placeholder={pageContent.rentalFacilityPlaceholder}
                  type="text"
                  aria-describedby={
                    errors.facilityInfo?.[index]?.rentalFacilityAgreementNumber
                      ?.message
                      ? "facilityAgreementNumber-error"
                      : undefined
                  }
                />
                {errors.facilityInfo?.[index]?.rentalFacilityAgreementNumber
                  ?.message && (
                  <FormError
                    id="facilityAgreementNumber-error"
                    errorMessage={t(
                      errors.facilityInfo[index]?.rentalFacilityAgreementNumber
                        ?.message || "",
                    )}
                  />
                )}
              </div>

              <div
                className={cn("form-group", {
                  "has-error": errors.facilityInfo?.[index]?.facility,
                })}
              >
                <label htmlFor="facility" className="form-label">
                  {pageContent.facilityLabel}
                </label>
                <input
                  {...register(`facilityInfo.${index}.facility`)}
                  id="facility"
                  className="input p-4"
                  placeholder={pageContent.facilityPlaceholder}
                  type="text"
                  aria-describedby={
                    errors.facilityInfo?.[index]?.facility?.message
                      ? "facility-error"
                      : undefined
                  }
                />
                {errors.facilityInfo?.[index]?.facility?.message && (
                  <FormError
                    id="facility-error"
                    errorMessage={t(
                      errors.facilityInfo?.[index]?.facility?.message ?? "",
                    )}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 h-1 w-full border-t border-graphite-200" />
            <EventDates facilityIndex={index} />
          </div>
        );
      })}
      <Button
        className="flex w-full cursor-pointer justify-center gap-x-2 rounded border-none bg-primary-25 p-0 text-xl lg:w-auto"
        variant={ButtonVariant.SECONDARY}
        buttonType={ButtonType.BUTTON}
        onClick={addFacilityInfo}
        icon={
          <Icon
            src={<AddEventIcon />}
            alt={pageContent.addEventIconAltText}
            size={24}
          />
        }
      >
        {pageContent.addFacility}
      </Button>
    </>
  );
};

export default BasicInformationSection;
