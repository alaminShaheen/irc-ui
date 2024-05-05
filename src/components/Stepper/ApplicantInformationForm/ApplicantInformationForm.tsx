import {
  Control,
  Controller,
  FieldErrors,
  FormProvider,
  Resolver,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useDebounceCallback } from "usehooks-ts";
import { useCallback, useEffect, useState } from "react";

import {
  ApplicantInformationFormModel,
  CommonApplicantInformation,
  WithAddress,
  WithManualAddress,
} from "@/models/form/ApplicantInformationFormModel";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import Search from "@/components/AppIcons/Search";
import InputWithIcon from "@/components/ui/InputWithIcon";
import SelectDropdown from "@/components/ui/SelectDropdown/SelectDropdown";
import FormError from "@/components/FormError";
import { LanguageCode } from "@/models/enums/LanguageCode";
import { useStepperContext } from "@/context/StepperContext";
import { COUNTRY_PROVINCE_LIST } from "@/constants/CountryProvinceList";
import {
  ButtonType,
  ButtonVariant,
  IconPosition,
} from "@/models/enums/ButtonVariant";
import AgreementCheckboxes from "@/components/AgreementCheckboxes/AgreementCheckboxes";

const ApplicantInformationForm = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { setFormValues, formValues, changingRouteTo, switchRoute } =
    useStepperContext();
  const [enterManualAddress, setEnterManualAddress] = useState(
    ["postalCode", "city", "country", "province", "streetAddress"].some(
      (key) => key in formValues.applicantInformationForm,
    ),
  );
  const { goToNextStep } = useStepperContext();

  const validateOrganizationName = useCallback((name: string) => {
    return new Promise<{ valid: boolean }>((resolve) => {
      setTimeout(() => {
        resolve({ valid: name.split(" ").length > 1 });
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
      .required("pages.applicantInformation.form.errors.required")
      .matches(
        /^\w+\s[\w\s?]+$/,
        "pages.applicantInformation.form.errors.invalidName",
      ),
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
  };

  const methods = useForm({
    defaultValues: formValues.applicantInformationForm,
    mode: "onBlur",
    resolver: yupResolver(
      formValidationSchema,
    ) as Resolver<ApplicantInformationFormModel>,
    context: { enterManualAddress },
  });

  const {
    register,
    unregister,
    setValue,
    formState: { errors },
    watch,
    control,
    setError,
    resetField,
    handleSubmit,
  } = methods;

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
            "streetAddress",
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
    setEnterManualAddress(true);
    const conditionalKeys = [
      "postalCode",
      "city",
      "country",
      "province",
      "streetAddress",
    ] as (keyof WithManualAddress)[];

    conditionalKeys.forEach((key) => {
      register(key);
      setValue(key, "");
    });
    setValue("address", "");
    unregister("address");
  }, [register, unregister, setValue]);

  const trimData = useCallback(
    (data: ApplicantInformationFormModel) => {
      data.name = data.name.trim();
      if (enterManualAddress) {
        const dataWithManualAddress = data as CommonApplicantInformation &
          WithManualAddress;
        dataWithManualAddress.city = dataWithManualAddress.city.trim();
        dataWithManualAddress.streetAddress =
          dataWithManualAddress.streetAddress.trim();
        dataWithManualAddress.country = dataWithManualAddress.country.trim();
        dataWithManualAddress.province = dataWithManualAddress.province?.trim();
        dataWithManualAddress.postalCode =
          dataWithManualAddress.postalCode.trim();
        data = { ...data, ...dataWithManualAddress };
      } else {
        const dataWithAddress = data as CommonApplicantInformation &
          WithAddress;
        dataWithAddress.address = dataWithAddress.address.trim();
        data = { ...data, ...dataWithAddress };
      }
      return data;
    },
    [enterManualAddress],
  );

  const handleFormSubmit = useCallback(
    (data: ApplicantInformationFormModel) => {
      setFormValues((prev) => ({
        ...prev,
        applicantInformationForm: trimData(data),
      }));
      goToNextStep();
    },
    [setFormValues, goToNextStep, trimData],
  );

  useEffect(() => {
    if (selectedCountry) {
      const currentProvince = watch("province");
      if (
        !COUNTRY_PROVINCE_LIST[
          selectedCountry as keyof typeof COUNTRY_PROVINCE_LIST
        ].provinces.find((province) => province.en === currentProvince)
      ) {
        resetField("province", { defaultValue: "" });
      }
    }
  }, [selectedCountry, watch, resetField]);

  useEffect(() => {
    if (changingRouteTo) {
      const trimmedData = trimData(watch());
      setFormValues((prev) => ({
        ...prev,
        applicantInformationForm: Object.fromEntries(
          Object.entries(trimmedData).filter(
            ([key]) => !errors[key as keyof ApplicantInformationFormModel],
          ),
        ) as ApplicantInformationFormModel,
      }));
      switchRoute();
    }
  }, [changingRouteTo, watch, errors, switchRoute, trimData, setFormValues]);

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-y-6 lg:mb-64 lg:mr-auto lg:w-4/5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="space-y-2">
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
            {...register("name", {
              onChange: async (event) => {
                if (event.target.value) {
                  const response = await debouncedNameValidation(
                    event.target.value,
                  );
                  if (response?.valid) {
                    setError("name", {
                      message:
                        "pages.applicantInformation.form.errors.invalidName",
                    });
                  }
                }
              },
            })}
            id="name"
            className="input p-4"
            placeholder={pageContent.nameOrCompanyName}
            type="text"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name?.message && (
            <FormError id="name-error" errorMessage={t(errors.name.message)} />
          )}
        </div>

        <div
          className={cn("form-group", {
            "has-error": errorWithAddress.address,
          })}
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
            <FormError
              id="address-error"
              errorMessage={t(errorWithAddress.address.message)}
            />
          )}
          {!enterManualAddress && (
            <Button
              variant={ButtonVariant.TRANSPARENT}
              onClick={onEnterManualAddress}
              className="w-fit p-0 pt-2 text-left font-bold text-primary underline"
              type={ButtonType.BUTTON}
            >
              {pageContent.addAddressManually}
            </Button>
          )}
        </div>

        {enterManualAddress && (
          <>
            <h4 className="font-segoe text-xl font-medium text-primary">
              {pageContent.addingAddressManually}
            </h4>

            <div
              className={cn("form-group lg:w-1/2", {
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
                <FormError
                  id="postalCode-error"
                  errorMessage={t(errorWithManualAddress.postalCode.message)}
                />
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
                <FormError
                  id="streetAddress-error"
                  errorMessage={t(errorWithManualAddress.streetAddress.message)}
                />
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
                <FormError
                  id="city-error"
                  errorMessage={t(errorWithManualAddress.city.message)}
                />
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
                <FormError
                  id="country-error"
                  errorMessage={t(errorWithManualAddress.country.message)}
                />
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
                <FormError
                  id="province-error"
                  errorMessage={t(errorWithManualAddress.province.message)}
                />
              )}
            </div>
          </>
        )}

        <AgreementCheckboxes />

        <Button
          disabled={formDisabled}
          className="lg:w !mt-8 w-full rounded-md text-xl font-medium"
          variant={
            formDisabled ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
          }
          type={ButtonType.SUBMIT}
        >
          {pageContent.confirm}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ApplicantInformationForm;
