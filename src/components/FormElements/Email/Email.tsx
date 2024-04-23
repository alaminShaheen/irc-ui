import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import AlertInfoOutline from "@/components/AppIcons/AlertInfoOutline";
import { cn } from "@/utils/helper";
import { IEmailProps, TEmailModel } from "./Email.d";

const Email = ({
  label,
  placeholderContent,
  helperText,
  containerStyle,
  inputStyle,
}: IEmailProps) => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useFormContext<TEmailModel>();

  return (
    <div className={cn("form-group", { "has-error": errors.email })}>
      <label htmlFor="email" className="form-label">
        {label}
      </label>

      <div className={containerStyle}>
        <input
          {...register("email")}
          id="email"
          className={`input w-full py-5 ${inputStyle}`}
          type="email"
          placeholder={placeholderContent}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />

        {helperText && (
          <p className="inline-flex gap-x-[6px] font-normal">
            <span>{<AlertInfoOutline />}</span>
            <span className="opacity-60">{helperText}</span>
          </p>
        )}
      </div>

      {errors.email?.message && (
        <span
          className="error-warning"
          id="email-error"
          aria-live="assertive"
          data-testid="email-error"
        >
          {t(errors.email.message)}
        </span>
      )}
    </div>
  );
};

export default Email;
