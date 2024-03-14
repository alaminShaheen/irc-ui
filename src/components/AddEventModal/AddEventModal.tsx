import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

import {
  ButtonType,
  ButtonVariant,
  IconPosition,
} from "@/models/enums/ButtonVariant";
import { useForm } from "react-hook-form";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import useIsTab from "@/hooks/useIsTab";
import Checkbox from "@/components/ui/Checkbox";
import eventClock from "@/assets/icons/event-clock.svg";
import useIsMobile from "@/hooks/useIsMobile";
import addEventIcon from "@/assets/icons/add-event.svg";
import { ModalSize } from "@/components/ui/Modal/Modal.d";
import InputWithIcon from "@/components/ui/InputWithIcon";
import eventCalendar from "@/assets/icons/event-calendar.svg";
import RadioButtonGroup from "@/components/ui/RadioButtonGroup";
import { AddEventModel } from "@/models/form/AddEventModel";
import graphiteAlertInfo from "@/assets/icons/graphite-alert-info.svg";
import { IAddEventModalProps } from "@/components/AddEventModal/AddEventModal.d";
import { EventRepeatFrequency } from "@/models/enums/EventRepeatFrequency";

const AddEventModal = (props: IAddEventModalProps) => {
  const { isOpen, toggle, onConfirm } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddEventModel>({
    defaultValues: {
      eventName: "",
      rentalFacilityAgreementNumber: "",
      facility: "",
      repeatEvent: false,
      insuranceCoverageAmount: 1000000,
      thirdPartyFoodPackaging: true,
      requireAlcoholCoverage: true,
      validDriverLicensesPresent: true,
      selfTransportation: true,
      rentalVehicleOwnage: true,
    },
  });
  const isMobile = useIsMobile();
  const isTab = useIsTab();

  const onSubmit = useCallback(
    (data: AddEventModel) => {
      console.log(data);
      onConfirm();
    },
    [onConfirm],
  );

  return (
    <Modal
      title="Add event"
      isOpen={isOpen}
      size={isMobile || isTab ? ModalSize.SMALL : ModalSize.LARGE}
      toggle={toggle}
      subtitle="Multiple Vendors or inflatables"
    >
      <div className="flex justify-center">
        <form className="w-full lg:w-[552px]" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-primary font-bold text-2xl">Basic Information</h2>
          <div className="flex flex-col gap-y-1 mt-6">
            <label htmlFor="eventName" className="form-label">
              Name your event
            </label>
            <input
              {...register("eventName", { required: "Name is required" })}
              id="eventName"
              className={twMerge(
                "input p-4",
                errors.eventName?.message && "has-error",
              )}
              type="text"
            />
            {errors.eventName?.message && (
              <span className="text-sm text-red-500 my-2">
                {errors.eventName.message}
              </span>
            )}
          </div>

          <div className="mt-2 flex">
            <div>
              <Icon
                src={graphiteAlertInfo}
                size={24}
                className="text-primary"
              />
            </div>
            <span className="ml-2 text-graphite-700">
              This name will be used only for communication purposes
            </span>
          </div>

          <div className="border-dashed border-2 mt-6 border-primary-200 bg-primary-25 rounded-md p-4">
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="rentalFacilityAgreementNumber"
                className="form-label"
              >
                Rental / facility agreement number (s)
              </label>
              <input
                {...register("rentalFacilityAgreementNumber", {
                  required: "Rental/facility agreement number(s) required.",
                })}
                id="rentalFacilityAgreementNumber"
                className={twMerge(
                  "input p-4",
                  errors.rentalFacilityAgreementNumber?.message && "has-error",
                )}
                placeholder="Enter number here"
                type="text"
              />
              {errors.rentalFacilityAgreementNumber?.message && (
                <span className="text-sm text-red-500 my-2">
                  {errors.rentalFacilityAgreementNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-1 mt-4">
              <label htmlFor="facility" className="form-label">
                Facility
              </label>
              <input
                {...register("facility", {
                  required: "Facility is required.",
                })}
                id="facility"
                className={twMerge(
                  "input p-4",
                  errors.facility?.message && "has-error",
                )}
                placeholder="Start typing..."
                type="text"
              />
              {errors.facility?.message && (
                <span className="text-sm text-red-500 my-2">
                  {errors.facility.message}
                </span>
              )}
            </div>

            <div className="my-4 h-1 w-full border-t border-graphite-200" />

            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-4">
              <div className="flex flex-col gap-y-1">
                <label htmlFor="startDate" className="form-label">
                  Start date
                </label>
                <InputWithIcon
                  icon={<Icon src={eventCalendar} size={28} />}
                  iconPosition={IconPosition.LEFT}
                  {...register("startDate", {
                    required: "Start date is required.",
                  })}
                  id="startDate"
                  className={twMerge(
                    "input p-4",
                    errors.startDate?.message && "has-error",
                  )}
                  placeholder="Choose date"
                  type="date"
                />
                {errors.startDate?.message && (
                  <span className="text-sm text-red-500 my-2">
                    {errors.startDate.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <label htmlFor="startTime" className="form-label">
                  Start Time
                </label>
                <InputWithIcon
                  icon={<Icon src={eventClock} size={28} />}
                  iconPosition={IconPosition.LEFT}
                  {...register("startTime", {
                    required: "Start time is required.",
                  })}
                  id="startTime"
                  className={twMerge(
                    "input p-4",
                    errors.startTime?.message && "has-error",
                  )}
                  placeholder="Choose time"
                  type="time"
                />
                {errors.startTime?.message && (
                  <span className="text-sm text-red-500 my-2">
                    {errors.startTime.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <label htmlFor="facility" className="form-label">
                  End date
                </label>
                <InputWithIcon
                  icon={<Icon src={eventCalendar} size={28} />}
                  iconPosition={IconPosition.LEFT}
                  {...register("endDate", {
                    required: "End date is required.",
                  })}
                  id="endDate"
                  className={twMerge(
                    "input p-4",
                    errors.endDate?.message && "has-error",
                  )}
                  placeholder="Choose date"
                  type="date"
                />
                {errors.endDate?.message && (
                  <span className="text-sm text-red-500 my-2">
                    {errors.endDate.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <label htmlFor="endTime" className="form-label">
                  End Time
                </label>
                <InputWithIcon
                  icon={<Icon src={eventClock} size={28} />}
                  iconPosition={IconPosition.LEFT}
                  {...register("endTime", {
                    required: "End time is required.",
                  })}
                  id="endTime"
                  className={twMerge(
                    "input p-4",
                    errors.endTime?.message && "has-error",
                  )}
                  placeholder="Choose time"
                  type="time"
                />
                {errors.endTime?.message && (
                  <span className="text-sm text-red-500 my-2">
                    {errors.endTime.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center mt-4 gap-x-3">
              <Checkbox {...register("repeatEvent")} id="endTime" />
              <label htmlFor="repeatEvent" className="form-label">
                Repeat event
              </label>
            </div>

            <div className="mt-4 flex flex-col gap-y-2">
              <p className="form-label flex gap-x-3">Repeat:</p>
              <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 lg-gap-y-0 items-start lg:items-baseline">
                <RadioButtonGroup
                  {...register("repeatFrequency")}
                  radioButtons={[
                    {
                      value: EventRepeatFrequency.DAILY,
                      id: EventRepeatFrequency.DAILY,
                      label: EventRepeatFrequency.DAILY,
                    },
                    {
                      value: EventRepeatFrequency.WEEKLY,
                      id: EventRepeatFrequency.WEEKLY,
                      label: EventRepeatFrequency.WEEKLY,
                    },
                    {
                      value: EventRepeatFrequency.MONTHLY,
                      id: EventRepeatFrequency.MONTHLY,
                      label: EventRepeatFrequency.MONTHLY,
                    },
                  ]}
                />
              </div>
            </div>

            <Button
              className="border-gray-400 border-2 gap-x-2 rounded mt-8 py-4 px-6 text-xl flex justify-center bg-primary-25 cursor-pointer w-full lg:w-auto"
              variant={ButtonVariant.SECONDARY}
              icon={<Icon src={addEventIcon} alt="add event" size={24} />}
            >
              Add this time
            </Button>
          </div>

          <p className="text-primary font-bold text-2xl my-8">
            Additional questions
          </p>

          <div className="flex flex-col gap-y-2">
            <p className="form-label flex gap-x-3">
              Please select the amount of insurance coverage required:
            </p>
            <div className="flex flex-col gap-y-4 items-start">
              <RadioButtonGroup
                {...register("insuranceCoverageAmount")}
                radioButtons={[
                  { value: 1000000, id: "1000000", label: "$1 000 000" },
                  { value: 2000000, id: "2000000", label: "$2 000 000" },
                ]}
              />
            </div>
          </div>

          <p className="text-primary font-normal text-xl my-6">
            Food & beverages
          </p>

          <div className="flex flex-col gap-y-2">
            <p className="form-label flex gap-x-3">
              Is food or beverages being sold?
            </p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("foodBeverageSale")}
                radioButtons={[
                  { value: true, id: "foodBeverageSale-yes", label: "Yes" },
                  { value: false, id: "foodBeverageSale-no", label: "No" },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">
              Is all food / non-alcoholic beverages being sold packaged by a
              third party?
            </p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("thirdPartyFoodPackaging")}
                radioButtons={[
                  {
                    value: true,
                    id: "thirdPartyFoodPackaging-yes",
                    label: "Yes",
                  },
                  {
                    value: false,
                    id: "thirdPartyFoodPackaging-no",
                    label: "No",
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">
              Do you require alcohol coverage (maximum 50 seat capacity)?
            </p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("requireAlcoholCoverage")}
                radioButtons={[
                  {
                    value: true,
                    id: "requireAlcoholCoverage-yes",
                    label: "Yes",
                  },
                  {
                    value: false,
                    id: "requireAlcoholCoverage-no",
                    label: "No",
                  },
                ]}
              />
            </div>
          </div>

          <p className="text-primary font-normal text-xl my-6">Transport</p>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">
              Does every driver of the vehicles have a valid drivers' license?
            </p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("validDriverLicensesPresent")}
                radioButtons={[
                  {
                    value: true,
                    id: "validDriverLicensesPresent-yes",
                    label: "Yes",
                  },
                  {
                    value: false,
                    id: "validDriverLicensesPresent-no",
                    label: "No",
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">
              Are you responsible for providing transportation and/or
              chauffeuring services, or transporting attendees?
            </p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("selfTransportation")}
                radioButtons={[
                  {
                    value: true,
                    id: "selfTransportation-yes",
                    label: "Yes",
                  },
                  {
                    value: false,
                    id: "selfTransportation-no",
                    label: "No",
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-6">
            <p className="form-label flex gap-x-3">
              Do you have any short term rental vehicles (less than 30 days)?
            </p>
            <div className="flex gap-x-4">
              <RadioButtonGroup
                {...register("rentalVehicleOwnage")}
                radioButtons={[
                  {
                    value: true,
                    id: "rentalVehicleOwnage-yes",
                    label: "Yes",
                  },
                  {
                    value: false,
                    id: "rentalVehicleOwnage-no",
                    label: "No",
                  },
                ]}
              />
            </div>
          </div>

          <Button
            variant={ButtonVariant.PRIMARY}
            className="mt-8 rounded-md px-16"
            type={ButtonType.SUBMIT}
          >
            Confirm
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddEventModal;
