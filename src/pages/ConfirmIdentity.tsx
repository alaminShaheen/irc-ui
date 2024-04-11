import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import Back from "@/components/AppIcons/Back";
import ROUTES from "@/constants/Routes";
import Button from "@/components/ui/Button";
import ConfirmIdentityForm from "@/components/ConfirmIdentityForm/ConfirmIdentityForm";
import { ButtonVariant, IconPosition } from "@/models/enums/ButtonVariant";

const ConfirmIdentity = () => {
  const { t } = useTranslation();

  const pageContent = {
    pageTitle: t("pages.confirmIdentity.pageTitle"),
    backToSignUp: t("pages.confirmIdentity.backToSignUp"),
  };

  return (
    <div className="flex items-center justify-center px-4 py-11">
      <Helmet title={t("pages.confirmIdentity.seo.title")} />
      <section className="w-[1034px]">
        <Button
          variant={ButtonVariant.TRANSPARENT}
          className="flex gap-x-2 p-0"
          icon={<Back />}
          iconPosition={IconPosition.LEFT}
        >
          <Link to={ROUTES.SIGNUP} className="text-secondary underline">
            {pageContent.backToSignUp}
          </Link>
        </Button>

        <h1 className="my-6 font-segoe text-3xl font-bold text-primary">
          {pageContent.pageTitle}
        </h1>

        <ConfirmIdentityForm />
      </section>
    </div>
  );
};

export default ConfirmIdentity;
