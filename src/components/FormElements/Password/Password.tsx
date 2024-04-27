import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import useToggle from "@/hooks/useToggle";
import InputWithIcon from "@/components/ui/InputWithIcon";
import { cn } from "@/utils/helper";
import { IPasswordProps, TPasswordModel } from "./Password.d";
import { IconPosition } from "@/models/enums/ButtonVariant";

const Password = ({
  label,
  placeholderContent,
  inputStyle,
  showPasswordContent = "SHOW",
  hidePasswordContent = "HIDE",
}: IPasswordProps) => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useFormContext<TPasswordModel>();

  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <div className={cn("form-group", { "has-error": errors.password })}>
      <label htmlFor="password" className="form-label">
        {label}
      </label>
      <InputWithIcon
        icon={
          <span
            className="cursor-pointer select-none font-bold text-primary-700"
            onClick={toggleShowPassword}
          >
            {showPassword ? hidePasswordContent : showPasswordContent}
          </span>
        }
        iconPosition={IconPosition.RIGHT}
        {...register("password")}
        id="password"
        className={`input w-full py-5 ${inputStyle}`}
        placeholder={placeholderContent}
        type={showPassword ? "text" : "password"}
        aria-invalid={!!errors.password}
        aria-describedby={errors.password ? "password-error" : undefined}
      />
      {errors.password?.message && (
        <span
          className="error-warning"
          id="password-error"
          aria-live="assertive"
          data-testid="password-error"
        >
          {t(errors.password.message)}
        </span>
      )}
    </div>
  );
};

export default Password;
