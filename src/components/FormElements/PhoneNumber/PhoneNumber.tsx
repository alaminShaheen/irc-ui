import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputMask } from "@react-input/mask";

import AlertInfoOutline from "@/components/AppIcons/AlertInfoOutline";
import { cn } from "@/utils/helper";
import { IPhoneNumberProps, TPhoneNumberModel } from "./PhoneNumber.d";

const PhoneNumber = ({
  label,
  placeholderContent,
  helperText,
  containerStyle,
  inputStyle,
}: IPhoneNumberProps) => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useFormContext<TPhoneNumberModel>();

  return (
    <div className={cn("form-group", { "has-error": errors.phoneNumber })}>
      <label htmlFor="phoneNumber" className="form-label">
        {label}
      </label>
      <div className={containerStyle}>
        <InputMask
          mask="__________"
          replacement={{ _: /\d/ }}
          {...register("phoneNumber")}
          id="phoneNumber"
          placeholder={placeholderContent}
          className={`input w-full py-5 ${inputStyle}`}
          type="tel"
          aria-invalid={!!errors.phoneNumber}
          aria-describedby={
            errors.phoneNumber ? "phoneNumber-error" : undefined
          }
        />

        {helperText && (
          <p className="inline-flex gap-x-[6px] font-normal">
            <span>{<AlertInfoOutline />}</span>
            <span className="opacity-60">{helperText}</span>
          </p>
        )}
      </div>
      {errors.phoneNumber?.message && (
        <span
          className="error-warning"
          id="phoneNumber-error"
          data-testid="phoneNumber-error"
        >
          {t(errors.phoneNumber.message)}
        </span>
      )}
    </div>
  );
};

export default PhoneNumber;
