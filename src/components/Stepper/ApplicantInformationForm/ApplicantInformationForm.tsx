import {
  Control,
  Controller,
  FieldErrors,
  FormProvider,
  Resolver,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import DOMPurify from "dompurify";
import { Popover } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useDebounceCallback } from "usehooks-ts";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ApplicantInformationFormModel,
  CommonApplicantInformation,
  WithAddress,
  WithManualAddress,
} from "@/models/form/ApplicantInformationFormModel";
import { cn } from "@/utils/helper";
import Button from "@/components/ui/Button";
import FormError from "@/components/FormError";
import useGetCountry from "@/hooks/queries/useGetCountry";
import SelectDropdown from "@/components/ui/SelectDropdown/SelectDropdown";
import AgreementCheckboxes from "@/components/AgreementCheckboxes/AgreementCheckboxes";
import { useStepperContext } from "@/context/StepperContext";
import { ButtonType, ButtonVariant } from "@/models/enums/ButtonVariant";
import { toast } from "react-toastify";

const ApplicantInformationForm = () => {
  const { t, i18n } = useTranslation();

  const { setFormValues, formValues, changingRouteTo, switchRoute } =
    useStepperContext();

  const [googleAddress, setGoogleAddress] = useState<WithManualAddress>(() => {
    const formValueWithAddress =
      formValues.applicantInformationForm as CommonApplicantInformation &
        WithManualAddress;
    return {
      country: formValueWithAddress.country ?? "",
      streetAddress: formValueWithAddress.streetAddress ?? "",
      postalCode: formValueWithAddress.postalCode ?? "",
      city: formValueWithAddress.city ?? "",
      province: formValueWithAddress.province ?? "",
    };
  });

  const places = useMapsLibrary("places");

  const [enterManualAddress, setEnterManualAddress] = useState(
    formValues.applicantInformationForm.enterManualAddress,
  );
  const {
    data: countryList,
    isLoading: fetchingCountryList,
    isSuccess: countryFetchSuccessful,
    error: countryListError,
    isError: countryFetchUnsuccessful,
  } = useGetCountry({
    enabled: enterManualAddress,
  });

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
        ? schema.optional()
        : // .required("pages.applicantInformation.form.errors.required")
          // .length(
          //   4,
          //   "pages.applicantInformation.form.errors.provinceCharacterLength",
          // )
          schema.optional();
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
    setValue,
    formState: { errors },
    watch,
    setError,
    handleSubmit,
    control,
  } = methods;

  const { ref, ...rest } = register("address");
  const addressFieldRef = useRef<HTMLInputElement | null>(null);

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onPlaceSelected = useCallback(() => {
    if (placeAutocomplete) {
      const addressComponents = placeAutocomplete.getPlace().address_components;
      const manualAddress = {
        streetAddress: "",
        postalCode: "",
        city: "",
        country: "",
        province: "",
      };

      addressComponents?.forEach((addressComponent) => {
        const componentType = addressComponent.types[0];

        switch (componentType) {
          case "street_number": {
            manualAddress.streetAddress = `${addressComponent.long_name} ${manualAddress.streetAddress}`;
            break;
          }

          case "route": {
            manualAddress.streetAddress += addressComponent.short_name;
            break;
          }

          case "postal_code": {
            manualAddress.postalCode = addressComponent.long_name;
            break;
          }

          case "locality":
            manualAddress.city = addressComponent.long_name;
            break;

          case "administrative_area_level_1": {
            manualAddress.province = addressComponent.long_name;
            break;
          }

          case "country":
            manualAddress.country = addressComponent.long_name;
            break;
        }
      });
      setGoogleAddress({ ...manualAddress });

      setFormValues((prev) => ({
        ...prev,
        applicantInformationForm: {
          ...prev.applicantInformationForm,
          ...manualAddress,
          enterManualAddress,
        },
      }));

      if (enterManualAddress) {
        Object.keys(manualAddress).forEach((key) => {
          setValue(
            key as keyof WithManualAddress,
            manualAddress?.[key as keyof WithManualAddress] || "",
          );
        });
      }
    }
  }, [enterManualAddress, placeAutocomplete, setFormValues, setValue]);

  const errorWithAddress = errors as FieldErrors<
    CommonApplicantInformation & WithAddress
  >;
  const errorWithManualAddress = errors as FieldErrors<
    CommonApplicantInformation & WithManualAddress
  >;

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
  }, []);

  const sanitizeFormData = useCallback(
    (data: ApplicantInformationFormModel) => {
      data.name = DOMPurify.sanitize(data.name.trim());
      if (enterManualAddress) {
        const dataWithManualAddress = data as CommonApplicantInformation &
          WithManualAddress;
        dataWithManualAddress.city = DOMPurify.sanitize(
          dataWithManualAddress.city.trim(),
        );
        dataWithManualAddress.streetAddress = DOMPurify.sanitize(
          dataWithManualAddress.streetAddress.trim(),
        );
        dataWithManualAddress.country = DOMPurify.sanitize(
          dataWithManualAddress.country.trim(),
        );
        dataWithManualAddress.province = DOMPurify.sanitize(
          dataWithManualAddress.province?.trim(),
        );
        dataWithManualAddress.postalCode = DOMPurify.sanitize(
          dataWithManualAddress.postalCode.trim(),
        );
        data = { ...data, ...dataWithManualAddress };
      } else {
        const dataWithAddress = data as CommonApplicantInformation &
          WithAddress;
        dataWithAddress.address = DOMPurify.sanitize(
          dataWithAddress.address.trim(),
        );
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
        applicantInformationForm: {
          ...sanitizeFormData(data),
          enterManualAddress,
        },
      }));
      goToNextStep();
    },
    [setFormValues, goToNextStep, sanitizeFormData, enterManualAddress],
  );

  useEffect(() => {
    if (changingRouteTo) {
      const sanitizedData = sanitizeFormData(watch());
      setFormValues((prev) => {
        return {
          ...prev,
          applicantInformationForm: {
            ...(Object.fromEntries(
              Object.entries(sanitizedData).map(([key, value]) => {
                const typedKey = key as keyof ApplicantInformationFormModel;
                return [
                  key,
                  errors[typedKey]
                    ? prev.applicantInformationForm[typedKey]
                    : value,
                ];
              }),
            ) as ApplicantInformationFormModel),
            enterManualAddress,
          },
        };
      });
      switchRoute();
    }
  }, [
    changingRouteTo,
    errors,
    setFormValues,
    switchRoute,
    sanitizeFormData,
    watch,
    enterManualAddress,
  ]);

  useEffect(() => {
    if (countryFetchSuccessful) {
      const conditionalKeys = [
        "postalCode",
        "city",
        "country",
        "province",
        "streetAddress",
      ] as (keyof WithManualAddress)[];

      conditionalKeys.forEach((key) => {
        if (key === "country" && countryList) {
          setValue(
            key,
            googleAddress[key]
              ? countryList?.find((country) =>
                  country.en.includes(googleAddress[key]),
                )?.[i18n.language as "en" | "fr"] ?? ""
              : "",
          );
        } else {
          setValue(key, googleAddress?.[key] ?? "");
        }
      });
    }
  }, [
    countryFetchSuccessful,
    countryList,
    googleAddress,
    i18n.language,
    register,
    setValue,
  ]);

  useEffect(() => {
    if (countryFetchUnsuccessful) {
      toast(countryListError.message || "An unexpected error occurred");
    }
  }, [countryFetchUnsuccessful, countryListError]);

  useEffect(() => {
    if (!places || !addressFieldRef.current) return;

    const options = {
      fields: ["address_components", "formatted_address"],
    };

    setPlaceAutocomplete(
      new places.Autocomplete(addressFieldRef.current, options),
    );
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", onPlaceSelected);
  }, [onPlaceSelected, placeAutocomplete]);

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

        <Popover className="relative">
          <div
            className={cn("form-group relative", {
              "has-error": errorWithAddress.address,
            })}
          >
            <label htmlFor="address" className="form-label">
              {pageContent.address}
            </label>

            <input
              {...rest}
              ref={(e) => {
                ref(e);
                addressFieldRef.current = e;
              }}
              id="address"
              className="input p-4"
              placeholder={pageContent.enterStreetName}
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
        </Popover>

        {enterManualAddress && countryList && (
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
                disabled={fetchingCountryList}
                control={
                  control as Control<
                    CommonApplicantInformation & WithManualAddress
                  >
                }
                name="country"
                defaultValue=""
                render={({ field: { value, name, onChange } }) => (
                  <SelectDropdown
                    options={(countryList ?? []).map((country, index) => ({
                      id: index,
                      label: country[i18n.language as "en" | "fr"],
                      value: country.en,
                    }))}
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
              <input
                {...register("province")}
                id="province"
                className="input p-4"
                placeholder={pageContent.enterProvinceName}
                type="text"
                aria-invalid={!!errorWithManualAddress.province}
                aria-describedby={
                  errorWithManualAddress.province ? "province-error" : undefined
                }
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
