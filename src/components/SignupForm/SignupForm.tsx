import { Link } from "react-router-dom";

import { cn } from "@/utils/helper";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import AppleLogo from "@/components/AppIcons/AppleLogo";
import GoogleLogo from "@/components/AppIcons/GoogleLogo";
import MicrosoftLogo from "@/components/AppIcons/MicrosoftLogo";
import { ButtonVariant } from "@/models/enums/ButtonVariant";

const SignupForm = () => {
  return (
    <div className="px-8 py-9">
      <div className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0">
        <h2 className="font-segoe text-3xl font-semibold text-primary">
          Sign up
        </h2>
        <p>
          Already have an account?{" "}
          <Link
            to={ROUTES.SIGNUP}
            className="text-base text-secondary underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="flex w-full gap-x-4 pt-4 lg:mt-7">
        <Button
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2.5"
          variant={ButtonVariant.VANILLA}
        >
          <AppleLogo className="mx-auto" />
        </Button>
        <Button
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2.5"
          variant={ButtonVariant.VANILLA}
        >
          <GoogleLogo className="mx-auto" />
        </Button>
        <Button
          className="flex-grow rounded-md border border-graphite-400 bg-white py-2.5"
          variant={ButtonVariant.VANILLA}
        >
          <MicrosoftLogo className="mx-auto" />
        </Button>
      </div>

      <div
        className={cn(
          "flex items-center py-4",
          "before:mr-4 before:flex-1 before:bg-primary-300 before:p-px before:content-['']",
          "after:ml-4 after:flex-1 after:bg-primary-300 after:p-px after:content-['']",
        )}
      >
        Or sign up via e-mail
      </div>
    </div>
  );
};

export default SignupForm;
