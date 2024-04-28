import {
  Control,
  Controller,
  FieldErrors,
  Resolver,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Trans, useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";

import {
  ButtonType,
  ButtonVariant,
  IconPosition,
} from "@/models/enums/ButtonVariant";
import {
  ApplicantInformationFormModel,
  CommonApplicantInformation,
  WithAddress,
  WithManualAddress,
} from "@/models/form/ApplicantInformationFormModel";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import Search from "@/components/AppIcons/Search";
import UpArrow from "@/components/AppIcons/UpArrow";
import Checkbox from "@/components/ui/Checkbox";
import InputWithIcon from "@/components/ui/InputWithIcon";
import SelectDropdown from "@/components/ui/SelectDropdown/SelectDropdown";
import { LanguageCode } from "@/models/enums/LanguageCode";
import { useStepperContext } from "@/context/StepperContext";
import { COUNTRY_PROVINCE_LIST } from "@/constants/CountryProvinceList";
import ExternalLink from "@/components/AppIcons/ExternalLink";
import { useDebounceCallback } from "usehooks-ts";

const ApplicantInformationForm = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { setFormValues, formValues } = useStepperContext();
  const [enterManualAddress, setEnterManualAddress] = useState(
    "city" in formValues.applicantInformationForm,
  );
  const { goToPreviousStep, goToNextStep } = useStepperContext();

  const validateOrganizationName = useCallback((name: string) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(!!name);
      }, 1000);
    });
  }, []);

  const debouncedNameValidation = useDebounceCallback(
    validateOrganizationName,
    500,
  );

  const formValidationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(
        /^\w+\s[\w\s?]+$/,
        "pages.applicantInformation.form.errors.invalidName",
      )
      .required("pages.applicantInformation.form.errors.required")
      .test("verified", "Code not verified", async (value, options) => {
        const verified = await debouncedNameValidation(value as string);
        return verified
          ? true
          : options.createError({
              message: "This isn't a valid organization name.",
              path: "name",
            });
      }),
    address: yup.string().when("$enterManualAddress", (condition, schema) => {
      return condition[0]
        ? schema.optional()
        : schema.required("pages.applicantInformation.form.errors.required");
    }),
    postalCode: yup
      .string()
      .when("$enterManualAddress", (condition, schema) => {
        return condition[0]
          ? schema.required("pages.applicantInformation.form.errors.required")
          : schema.optional();
      }),
    streetAddress: yup
      .string()
      .when("$enterManualAddress", (condition, schema) => {
        return condition[0]
          ? schema.required("pages.applicantInformation.form.errors.required")
          : schema.optional();
      }),
    country: yup.string().when("$enterManualAddress", (condition, schema) => {
      return condition[0]
        ? schema.required("pages.applicantInformation.form.errors.required")
        : schema.optional();
    }),
    province: yup.string().when("$enterManualAddress", (condition, schema) => {
      return condition[0]
        ? schema.required("pages.applicantInformation.form.errors.required")
        : schema.optional();
    }),
    city: yup.string().when("$enterManualAddress", (condition, schema) => {
      return condition[0]
        ? schema.required("pages.applicantInformation.form.errors.required")
        : schema.optional();
    }),
    bestAbilityAcknowledgement: yup.boolean().required(),
    personalInformationCollectionAgreement: yup.boolean().required(),
  });

  const pageContent = {
    pageTitle: t("pages.applicantInformation.pageTitle"),
    pagePolicy: t("pages.applicantInformation.pagePolicy"),
    name: t("pages.applicantInformation.form.name"),
    address: t("pages.applicantInformation.form.address"),
    nameOrCompanyName: t("pages.applicantInformation.form.nameOrCompanyName"),
    startTyping: t("pages.applicantInformation.form.startTyping"),
    addAddressManually: t("pages.applicantInformation.form.addAddressManually"),
    addingAddressManually: t(
      "pages.applicantInformation.form.addingAddressManually",
    ),
    postalCode: t("pages.applicantInformation.form.postalCode"),
    enterPostalCode: t("pages.applicantInformation.form.enterPostalCode"),
    streetAddress: t("pages.applicantInformation.form.streetAddress"),
    enterStreetName: t("pages.applicantInformation.form.enterStreetName"),
    city: t("pages.applicantInformation.form.city"),
    enterCityName: t("pages.applicantInformation.form.enterCityName"),
    province: t("pages.applicantInformation.form.province"),
    enterProvinceName: t("pages.applicantInformation.form.enterProvinceName"),
    state: t("pages.applicantInformation.form.state"),
    enterStateName: t("pages.applicantInformation.form.enterStateName"),
    country: t("pages.applicantInformation.form.country"),
    enterCountryName: t("pages.applicantInformation.form.enterCountryName"),
    back: t("pages.applicantInformation.form.back"),
    confirm: t("pages.applicantInformation.form.confirm"),
    somethingWentWrong: t(
      "pages.applicantInformation.form.errors.somethingWentWrong",
    ),
    streetAddressWrong: t(
      "pages.applicantInformation.form.errors.streetAddressWrong",
    ),
    checkbox1Label: (
      <Trans i18nKey="common.disclaimer.checkbox1Label">
        I understand and agree to the use of
        <a
          href="#"
          className="inline-flex items-center gap-x-1 font-bold text-primary underline"
        >
          application agreement
          <ExternalLink />
        </a>
      </Trans>
    ),
    checkbox2Label: (
      <Trans i18nKey="common.disclaimer.checkbox2Label">
        I understand and agree the information submitted will be used in line
        with our
        <a
          href="#"
          className="inline-flex items-center gap-x-1 font-bold text-primary underline"
        >
          privacy policy
          <ExternalLink />
        </a>
      </Trans>
    ),
  };

  const {
    register,
    unregister,
    formState: { errors },
    watch,
    control,
    resetField,
    handleSubmit,
  } = useForm({
    defaultValues: formValues.applicantInformationForm,
    mode: "onBlur",
    resolver: yupResolver(
      formValidationSchema,
    ) as Resolver<ApplicantInformationFormModel>,
    context: { enterManualAddress },
  });
  const errorWithAddress = errors as FieldErrors<
    CommonApplicantInformation & WithAddress
  >;
  const errorWithManualAddress = errors as FieldErrors<
    CommonApplicantInformation & WithManualAddress
  >;

  const selectedCountry = watch("country");

  const formDisabled =
    Object.entries(errors).length > 0 ||
    (enterManualAddress
      ? Object.values(
          watch([
            "bestAbilityAcknowledgement",
            "personalInformationCollectionAgreement",
            "name",
            "country",
            "city",
            "province",
            "postalCode",
          ]),
        ).some((value) => !value)
      : Object.values(
          watch([
            "bestAbilityAcknowledgement",
            "personalInformationCollectionAgreement",
            "name",
            "address",
          ]),
        ).some((value) => !value));

  const onEnterManualAddress = useCallback(() => {
    resetField("address", { defaultValue: "" });
    setEnterManualAddress(true);
  }, [resetField]);

  const handleFormSubmit = useCallback(
    (data: ApplicantInformationFormModel) => {
      data.name = data.name.trim();
      if (enterManualAddress) {
        const dataWithManualAddress = data as CommonApplicantInformation &
          WithManualAddress;
        dataWithManualAddress.city = dataWithManualAddress.city.trim();
        dataWithManualAddress.streetAddress =
          dataWithManualAddress.streetAddress.trim();
        dataWithManualAddress.country = dataWithManualAddress.country.trim();
        dataWithManualAddress.province = dataWithManualAddress.province.trim();
        dataWithManualAddress.postalCode =
          dataWithManualAddress.postalCode.trim();
        data = { ...data, ...dataWithManualAddress };
      } else {
        const dataWithAddress = data as CommonApplicantInformation &
          WithAddress;
        dataWithAddress.address = dataWithAddress.address.trim();
        data = { ...data, ...dataWithAddress };
      }
      setFormValues((prev) => ({ ...prev, applicantInformationForm: data }));
      goToNextStep();
    },
    [enterManualAddress, setFormValues, goToNextStep],
  );

  useEffect(() => {
    const conditionalKeys = [
      "postalCode",
      "city",
      "country",
      "province",
      "streetAddress",
    ] as (keyof WithManualAddress)[];

    if (enterManualAddress) {
      conditionalKeys.forEach((key) => register(key));
    } else {
      conditionalKeys.forEach((key) => unregister(key));
    }
  }, [register, unregister, enterManualAddress]);

  useEffect(() => {
    if (selectedCountry) {
      const currentProvince = watch("province");
      if (
        !COUNTRY_PROVINCE_LIST[
          selectedCountry as keyof typeof COUNTRY_PROVINCE_LIST
        ].provinces.find((province) => province.en === currentProvince)
      ) {
        resetField("province");
      }
    }
  }, [selectedCountry, watch, resetField]);

  return (
    <form
      className="mr-auto flex w-4/5 flex-col gap-y-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="">
        <h2 className="font-segoe text-3xl font-bold text-primary">
          {pageContent.pageTitle}
        </h2>
        <p className="text-lg font-normal text-graphite-700">
          {pageContent.pagePolicy}
        </p>
      </div>

      <div className={cn("form-group", { "has-error": errors.name })}>
        <label htmlFor="name" className="form-label">
          {pageContent.name}
        </label>
        <input
          {...register("name")}
          id="name"
          className="input p-4"
          placeholder={pageContent.nameOrCompanyName}
          type="text"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name?.message && (
          <span className="error-warning" id="name-error">
            {t(errors.name.message)}
          </span>
        )}
      </div>

      <div
        className={cn("form-group", { "has-error": errorWithAddress.address })}
      >
        <label htmlFor="address" className="form-label">
          {pageContent.address}
        </label>
        <InputWithIcon
          icon={<Search />}
          iconPosition={IconPosition.LEFT}
          {...register("address")}
          id="address"
          disabled={enterManualAddress}
          className="input w-full p-4"
          placeholder={pageContent.startTyping}
          type="text"
          aria-invalid={!!errorWithAddress.address}
          aria-describedby={
            errorWithAddress.address ? "address-error" : undefined
          }
        />
        {errorWithAddress.address?.message && (
          <span className="error-warning" id="address-error">
            {t(errorWithAddress.address.message)}
          </span>
        )}
        {!enterManualAddress && (
          <Button
            variant={ButtonVariant.TRANSPARENT}
            onClick={onEnterManualAddress}
            className="w-fit p-0 pt-2 text-left font-bold text-primary hover:underline"
            type={ButtonType.BUTTON}
          >
            {pageContent.addAddressManually}
          </Button>
        )}
      </div>

      {enterManualAddress && (
        <>
          <h4 className="font-segoe text-xl font-semibold text-primary">
            {pageContent.addAddressManually}
          </h4>

          <div
            className={cn("form-group w-1/2", {
              "has-error": errorWithManualAddress.postalCode,
            })}
          >
            <label htmlFor="postalCode" className="form-label">
              {pageContent.postalCode}
            </label>
            <input
              {...register("postalCode")}
              id="postalCode"
              className="input p-4"
              placeholder={pageContent.enterPostalCode}
              type="text"
              aria-invalid={!!errorWithManualAddress.postalCode}
              aria-describedby={
                errorWithManualAddress.postalCode
                  ? "postalCode-error"
                  : undefined
              }
            />
            {errorWithManualAddress.postalCode?.message && (
              <span className="error-warning" id="postalCode-error">
                {t(errorWithManualAddress.postalCode.message)}
              </span>
            )}
          </div>

          <div
            className={cn("form-group", {
              "has-error": errorWithManualAddress.streetAddress,
            })}
          >
            <label htmlFor="streetAddress" className="form-label">
              {pageContent.streetAddress}
            </label>
            <input
              {...register("streetAddress")}
              id="streetAddress"
              className="input p-4"
              placeholder={pageContent.enterStreetName}
              type="text"
              aria-invalid={!!errorWithManualAddress.streetAddress}
              aria-describedby={
                errorWithManualAddress.streetAddress
                  ? "streetAddress-error"
                  : undefined
              }
            />
            {errorWithManualAddress.streetAddress?.message && (
              <span className="error-warning" id="streetAddress-error">
                {t(errorWithManualAddress.streetAddress.message)}
              </span>
            )}
          </div>

          <div
            className={cn("form-group", {
              "has-error": errorWithManualAddress.city,
            })}
          >
            <label htmlFor="city" className="form-label">
              {pageContent.city}
            </label>
            <input
              {...register("city")}
              id="city"
              className="input p-4"
              placeholder={pageContent.enterCityName}
              type="text"
              aria-invalid={!!errorWithManualAddress.city}
              aria-describedby={
                errorWithManualAddress.city ? "city-error" : undefined
              }
            />
            {errorWithManualAddress.city?.message && (
              <span className="error-warning" id="city-error">
                {t(errorWithManualAddress.city.message)}
              </span>
            )}
          </div>

          <div
            className={cn("form-group", {
              "has-error": errorWithManualAddress.country,
            })}
          >
            <label htmlFor="country" className="form-label">
              {pageContent.country}
            </label>
            <Controller
              control={
                control as Control<
                  CommonApplicantInformation & WithManualAddress
                >
              }
              name="country"
              defaultValue=""
              render={({ field: { value, name, onChange } }) => (
                <SelectDropdown
                  options={Object.entries(COUNTRY_PROVINCE_LIST).map(
                    ([key, value], index) => ({
                      id: index,
                      label: value[language as LanguageCode],
                      value: key,
                    }),
                  )}
                  placeholderText={pageContent.enterCountryName}
                  value={value}
                  name={name}
                  onChange={onChange}
                />
              )}
            />

            {errorWithManualAddress.country?.message && (
              <span className="error-warning" id="country-error">
                {t(errorWithManualAddress.country.message)}
              </span>
            )}
          </div>

          <div
            className={cn("form-group", {
              "has-error": errorWithManualAddress.province,
            })}
          >
            <label htmlFor="province" className="form-label">
              {pageContent.province}
            </label>
            <Controller
              control={
                control as Control<
                  CommonApplicantInformation & WithManualAddress
                >
              }
              disabled={!selectedCountry}
              name="province"
              defaultValue=""
              render={({ field: { value, name, onChange, disabled } }) => (
                <SelectDropdown
                  disabled={disabled}
                  options={(
                    COUNTRY_PROVINCE_LIST[
                      selectedCountry as keyof typeof COUNTRY_PROVINCE_LIST
                    ]?.provinces ?? []
                  ).map((province, index) => ({
                    id: index,
                    label: province[language as LanguageCode],
                    value: province["en"],
                  }))}
                  placeholderText={pageContent.enterProvinceName}
                  value={value!}
                  name={name}
                  onChange={onChange}
                />
              )}
            />
            {errorWithManualAddress.province?.message && (
              <span className="error-warning" id="province-error">
                {t(errorWithManualAddress.province.message)}
              </span>
            )}
          </div>
        </>
      )}

      <div className="form-radio-checkbox-group !items-start">
        <div className="flex items-center justify-center">
          <Checkbox
            {...register("bestAbilityAcknowledgement")}
            id="bestAbilityAcknowledgement"
            aria-invalid={!!errors.bestAbilityAcknowledgement}
          />
        </div>
        <label
          htmlFor="bestAbilityAcknowledgement"
          className="border-primary-300 text-black"
        >
          {pageContent.checkbox1Label}
        </label>
      </div>

      <div
        className={cn(`ml-auto h-1 border-t border-primary-300 md:hidden`)}
      />

      <div className="form-radio-checkbox-group !items-start">
        <div className="flex items-center justify-center">
          <Checkbox
            {...register("personalInformationCollectionAgreement")}
            id="personalInformationCollectionAgreement"
            aria-invalid={!!errors.personalInformationCollectionAgreement}
          />
        </div>
        <label
          htmlFor="personalInformationCollectionAgreement"
          className="border-primary-300 text-black"
        >
          {pageContent.checkbox2Label}
        </label>
      </div>

      <div className="!mt-8 flex gap-x-4 ">
        <Button
          className="flex gap-x-1 rounded-md text-xl"
          variant={ButtonVariant.SECONDARY}
          onClick={goToPreviousStep}
          type={ButtonType.BUTTON}
        >
          <UpArrow className="stroke-primary" />
          {pageContent.back}
        </Button>
        <Button
          disabled={formDisabled}
          className="rounded-md px-20 text-xl"
          variant={
            formDisabled ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
          }
          type={ButtonType.SUBMIT}
        >
          {pageContent.confirm}
        </Button>
      </div>
    </form>
  );
};

export default ApplicantInformationForm;
